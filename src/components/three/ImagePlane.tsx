import { Suspense } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

import img from "../../assets/flyeronground.png";

interface ImagePlaneProps {
  // Corners of the image in three-dimensional space. The corners are in the
  // order of top-left, top-right, bottom-left, bottom-right.
  corners: [THREE.Vector3, THREE.Vector3, THREE.Vector3, THREE.Vector3];
  opacity: number;
}

export const ImagePlane = ({ corners, opacity }: ImagePlaneProps) => {
  const planeGeometry = new THREE.PlaneBufferGeometry().setFromPoints(corners);
  const texture = useLoader(THREE.TextureLoader, img);

  return (
    <Suspense fallback={null}>
      <mesh geometry={planeGeometry}>
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
