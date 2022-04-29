import create from "zustand";
import * as THREE from "three";

type Corners = [THREE.Vector3, THREE.Vector3, THREE.Vector3, THREE.Vector3];

export const cornersInit: Corners = [
  new THREE.Vector3(5, 5, 1),
  new THREE.Vector3(0, 5, 1),
  new THREE.Vector3(5, 0, 1),
  new THREE.Vector3(0, 0, 1),
];

interface Store {
  corners: Corners;
  applyMatrix: (matrix: THREE.Matrix3) => void;
}

export const useStore = create<Store>((set, get) => ({
  corners: cornersInit,
  applyMatrix: (matrix) => {
    const c = cornersInit.map((corner) => {
      const corner_ = corner.clone();
      return corner_.applyMatrix3(matrix);
    });

    set({ corners: [c[0], c[1], c[2], c[3]] });
  },
}));
