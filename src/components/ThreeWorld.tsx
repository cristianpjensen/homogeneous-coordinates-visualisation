import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";

import { ImagePlane } from "./three/ImagePlane";
import { cornersInit, useStore } from "../store";

export const ThreeWorld = () => {
  const corners = useStore((state) => state.corners);

  const proj = corners.map((corner) => {
    // Homogeneous to Euclidean coordinates
    const x = corner.x / corner.z;
    const y = corner.y / corner.z;

    return new THREE.Vector3(x, y, 0);
  });

  const lines = corners.map((corner, i) => {
    return [corner, proj[i]];
  });

  return (
    <Canvas
      dpr={window.devicePixelRatio}
      style={{
        height: window.innerHeight,
        width: window.innerWidth,
        backgroundColor: "black",
      }}
      camera={{
        isPerspectiveCamera: true,
        position: [0, -6, 6],
        near: 0.1,
        far: 1000,
        fov: 90,
        up: [0, 0, 1],
      }}
    >
      <ambientLight />
      <gridHelper
        args={[100, 100, "white", "rgb(40, 40, 40)"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <OrbitControls />
      <ImagePlane corners={cornersInit} opacity={0.1} />
      <ImagePlane corners={corners} opacity={0.5} />
      <ImagePlane corners={[proj[0], proj[1], proj[2], proj[3]]} opacity={1} />

      {lines.map((line, i) => {
        return <Line key={i} points={line} color="white" />;
      })}
    </Canvas>
  );
};
