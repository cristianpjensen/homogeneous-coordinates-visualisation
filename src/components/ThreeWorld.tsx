import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export const ThreeWorld = () => (
  <Canvas
    dpr={window.devicePixelRatio}
    style={{ height: window.innerHeight, width: window.innerWidth, backgroundColor: "black" }}
    camera={{
      isPerspectiveCamera: true,
      position: [5, 5, 5],
      near: 0.1,
      far: 1000,
      fov: 75,
    }}
  >
    <ambientLight />
    <gridHelper args={[100, 100, "white", "rgb(40, 40, 40)"]} />
    <OrbitControls />
  </Canvas>
);
