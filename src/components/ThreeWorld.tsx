import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";

import { ImagePlane } from "./three/ImagePlane";
import { useStore } from "../store";
import { Projection } from "./three/Projection";

export const ThreeWorld = () => {
  const { corners, matrix, showHomogeneous } = useStore((state) => state);

  const c = corners.map((corner) =>
    new THREE.Vector3(
      corner.x * (20 / 400),
      corner.y * (20 / 400),
      corner.z
    ).multiplyScalar(-1 / 0.004329713479095229)
  );

  const proj = c.map((corner) => {
    // Homogeneous to Euclidean coordinates
    const x = corner.x / corner.z;
    const y = corner.y / corner.z;

    return new THREE.Vector3(x, y, 0);
  });

  const lines = c.map((corner, i) => {
    return [corner, proj[i]];
  });

  const projectionOutline = [proj[0], proj[2], proj[3], proj[1], proj[0]];

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
      <Projection matrix={matrix} />
      <ImagePlane
        corners={[c[0], c[1], c[2], c[3]]}
        opacity={showHomogeneous ? 0.4 : 0}
      />
      {lines.map((line, i) => {
        return (
          <Line
            key={i}
            points={line}
            color="white"
            opacity={showHomogeneous ? 0.4 : 0}
            transparent
            dashed
          />
        );
      })}
      <Line points={projectionOutline} color="white" />
    </Canvas>
  );
};
