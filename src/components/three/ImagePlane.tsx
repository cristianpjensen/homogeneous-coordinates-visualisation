import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import img from "../../assets/colortrui.png";

interface ImagePlaneProps {
  // Corners of the image in three-dimensional space. The corners are in the
  // order of top-left, top-right, bottom-left, bottom-right.
  corners: [THREE.Vector3, THREE.Vector3, THREE.Vector3, THREE.Vector3];
}

export const ImagePlane = ({ corners }: ImagePlaneProps) => {
  const texture = useLoader(THREE.TextureLoader, img);

  const ref = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.geometry.setFromPoints(corners);
    }
  }, [corners]);

  return (
    <Suspense fallback={null}>
      <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[3, 3]} />
        <meshBasicMaterial
          attach="material"
          side={THREE.DoubleSide}
          map={texture}
        />
      </mesh>
    </Suspense>
  );
};
