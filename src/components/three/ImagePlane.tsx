import { Suspense } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

import img from "../../assets/colortrui.png";
import { useStore } from "../../store";

interface ImagePlaneProps {
  // Corners of the image in three-dimensional space. The corners are in the
  // order of top-left, top-right, bottom-left, bottom-right.
  corners: [THREE.Vector3, THREE.Vector3, THREE.Vector3, THREE.Vector3];
  opacity: number;
}

export const ImagePlane = ({ corners, opacity }: ImagePlaneProps) => {
  const applyMatrix = useStore((state) => state.applyMatrix);

  const planeGeometry = new THREE.PlaneBufferGeometry().setFromPoints(corners);
  const texture = useLoader(THREE.TextureLoader, img);

  const onClick = () => {
    const matrix = new THREE.Matrix3();

    // prettier-ignore
    // Random projective matrix.
    matrix.set(
      1, 1, 1,
      -1, 1, 2,
      1, 1, 1
    );

    applyMatrix(matrix);
  };

  return (
    <Suspense fallback={null}>
      <mesh geometry={planeGeometry} onClick={onClick}>
        <meshBasicMaterial
          attach="material"
          map={texture}
          side={THREE.DoubleSide}
          opacity={opacity}
          transparent
        />
      </mesh>
    </Suspense>
  );
};
