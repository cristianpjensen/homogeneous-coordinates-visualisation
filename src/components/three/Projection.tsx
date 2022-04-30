import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { cornersInit } from "../../store";

interface ProjectionProps {
  matrix: THREE.Matrix3;
}

const SIZE = 400;

export const Projection = ({ matrix }: ProjectionProps) => {
  const planeCorners = cornersInit.map((c) => {
    return new THREE.Vector3(c.x, c.y, 0);
  });

  const ref = useRef<THREE.Mesh>(null);
  const [F, setF] = useState<ImageData>();

  const planeGeometry = new THREE.PlaneBufferGeometry().setFromPoints(
    planeCorners
  );

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;

    const ctxF = canvas.getContext("2d");
    const img = document.getElementById("image") as HTMLImageElement;

    if (ctxF) {
      ctxF.drawImage(img, 0, 0, canvas.width, canvas.height);
      setF(ctxF.getImageData(0, 0, canvas.width, canvas.height));
    }
  }, []);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;

    const ctx = canvas.getContext("2d");
    const G = ctx?.createImageData(canvas.width, canvas.height);

    if (F && ctx && G) {
      const M = matrix.clone().invert();

      for (let x = 0; x < F.width; x++) {
        for (let y = 0; y < F.height; y++) {
          const p = new THREE.Vector3(x, y, 1);
          p.applyMatrix3(M);

          const Fx = Math.floor(p.x / p.z);
          const Fy = Math.floor(p.y / p.z);

          if (Fx >= 0 && Fx < G.width && Fy >= 0 && Fy < G.height) {
            const i = (Fx * F.width + Fy) * 4;
            const j = (x * G.width + y) * 4;

            G.data[j + 0] = F.data[i + 0] * 0.35;
            G.data[j + 1] = F.data[i + 1] * 0.35;
            G.data[j + 2] = F.data[i + 2] * 0.35;
            G.data[j + 3] = F.data[i + 3];
          }
        }
      }

      ctx.putImageData(G, 0, 0);

      if (ref.current) {
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });

        ref.current.material = material;
      }
    }
  }, [matrix, F]);

  return (
    <mesh
      ref={ref}
      geometry={planeGeometry}
      scale={20 / SIZE}
      material={ref.current?.material}
    />
  );
};
