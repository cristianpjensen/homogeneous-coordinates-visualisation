import create from "zustand";
import * as THREE from "three";
import { Matrix, SingularValueDecomposition } from "ml-matrix";

type Corners = [THREE.Vector3, THREE.Vector3, THREE.Vector3, THREE.Vector3];

const SIZE = 400;

export const cornersInit: Corners = [
  new THREE.Vector3(0, 0, 1),
  new THREE.Vector3(0, SIZE, 1),
  new THREE.Vector3(SIZE, 0, 1),
  new THREE.Vector3(SIZE, SIZE, 1),
];

interface Store {
  corners: Corners;
  matrix: THREE.Matrix3;
  applyMatrix: (matrix: THREE.Matrix3) => void;
  applyProjectiveMatrix: (
    x1: THREE.Vector2,
    x2: THREE.Vector2,
    x3: THREE.Vector2,
    x4: THREE.Vector2
  ) => void;
  showHomogeneous: boolean;
  flipShowHomogeneous: () => void;
}

export const useStore = create<Store>((set, get) => ({
  corners: cornersInit,
  matrix: new THREE.Matrix3(),
  applyMatrix: (matrix) => {
    const c = cornersInit.map((corner) => {
      const corner_ = corner.clone();
      return corner_.applyMatrix3(matrix);
    });

    set({ corners: [c[0], c[1], c[2], c[3]] });
  },
  applyProjectiveMatrix: (x1, x2, x3, x4) => {
    x1.multiplyScalar(SIZE);
    x2.multiplyScalar(SIZE);
    x3.multiplyScalar(SIZE);
    x4.multiplyScalar(SIZE);

    const [xa1, xa2, xa3, xa4] = cornersInit;

    const M = new Matrix([
      [x1.x, x1.y, 1, 0, 0, 0, -xa1.x * x1.x, -xa1.x * x1.y, -xa1.x],
      [0, 0, 0, x1.x, x1.y, 1, -xa1.y * x1.x, -xa1.y * x1.y, -xa1.y],
      [x2.x, x2.y, 1, 0, 0, 0, -xa2.x * x2.x, -xa2.x * x2.y, -xa2.x],
      [0, 0, 0, x2.x, x2.y, 1, -xa2.y * x2.x, -xa2.y * x2.y, -xa2.y],
      [x3.x, x3.y, 1, 0, 0, 0, -xa3.x * x3.x, -xa3.x * x3.y, -xa3.x],
      [0, 0, 0, x3.x, x3.y, 1, -xa3.y * x3.x, -xa3.y * x3.y, -xa3.y],
      [x4.x, x4.y, 1, 0, 0, 0, -xa4.x * x4.x, -xa4.x * x4.y, -xa4.x],
      [0, 0, 0, x4.x, x4.y, 1, -xa4.y * x4.x, -xa4.y * x4.y, -xa4.y],
    ]);

    const svd = new SingularValueDecomposition(M);
    const p = svd.rightSingularVectors.getColumn(8);

    const P = new THREE.Matrix3();
    P.set(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8]);
    P.multiplyScalar(5 / 2.887);

    const c = cornersInit.map((corner) => {
      const corner_ = corner.clone();
      return corner_.applyMatrix3(P);
    });

    set({ corners: [c[0], c[1], c[2], c[3]], matrix: P });
  },
  showHomogeneous: true,
  flipShowHomogeneous: () => {
    const showHomogeneous = get().showHomogeneous;
    set({ showHomogeneous: !showHomogeneous });
  },
}));
