import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ImagePlane } from "./three/ImagePlane";

export const ThreeWorld = () => (
  <Canvas
    dpr={window.devicePixelRatio}
    style={{
      height: window.innerHeight,
      width: window.innerWidth,
      backgroundColor: "black",
    }}
    camera={{
      isPerspectiveCamera: true,
      position: [0, 6, -6],
      near: 0.1,
      far: 1000,
      fov: 90,
    }}
  >
    <ambientLight />
    <gridHelper args={[100, 100, "white", "rgb(40, 40, 40)"]} />
    <OrbitControls />
    <ImagePlane
      corners={[
        new THREE.Vector3(5, 5, 0),
        new THREE.Vector3(0, 5, 0),
        new THREE.Vector3(5, 0, 0),
        new THREE.Vector3(0, 0, 0),
      ]}
    />
  </Canvas>
);
