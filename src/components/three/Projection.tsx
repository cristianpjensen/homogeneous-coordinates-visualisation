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

      // Go over all pixels in the resulting image (G) and find out which pixel
      // should be there. This is a function of the matrix M, the image (F), and
      // the position of the pixel in the image (x, y):
      //   G(x,y) = F(h2e(M^-1 [x,y,1]^T))
      for (let x = 0; x < F.width; x++) {
        for (let y = 0; y < F.height; y++) {
          const p = new THREE.Vector3(x, y, 1);
          p.applyMatrix3(M);

          const Fx = Math.floor(p.x / p.z + 0.5);
          const Fy = Math.floor(p.y / p.z + 0.5);

          if (Fx >= 0 && Fx < G.width && Fy >= 0 && Fy < G.height) {
            // Bicubic interpolation
            // https://en.wikipedia.org/wiki/Bicubic_interpolation

            // Not that much faster and it is almost the same quality as the
            // nearest neighbour implementation, so just use nearest neighbour.
            // The resolution of the image is more important.

            // const i = Math.floor(Fx);
            // const j = Math.floor(Fy);

            // const a = Fx - i;
            // const b = Fy - j;

            // const A1 = (1 - a) * (1 - b);
            // const A2 = a * (1 - b);
            // const A3 = (1 - a) * b;
            // const A4 = a * b;

            // const I1 = (i * F.width + j) * 4;
            // const I2 = (i * F.width + j + 1) * 4;
            // const I3 = ((i + 1) * F.width + j) * 4;
            // const I4 = ((i + 1) * F.width + j + 1) * 4;

            // const r =
            //   A1 * F.data[I1 + 0] +
            //   A2 * F.data[I2 + 0] +
            //   A3 * F.data[I3 + 0] +
            //   A4 * F.data[I4 + 0];

            // const g =
            //   A1 * F.data[I1 + 1] +
            //   A2 * F.data[I2 + 1] +
            //   A3 * F.data[I3 + 1] +
            //   A4 * F.data[I4 + 1];

            // const b_ =
            //   A1 * F.data[I1 + 2] +
            //   A2 * F.data[I2 + 2] +
            //   A3 * F.data[I3 + 2] +
            //   A4 * F.data[I4 + 2];

            // const index = (y + x * G.width) * 4;

            // G.data[index + 0] = r * 0.35;
            // G.data[index + 1] = g * 0.35;
            // G.data[index + 2] = b_ * 0.35;
            // G.data[index + 3] = 255;

            const i = (Fx * F.width + Fy) * 4;
            const j = (x * G.width + y) * 4;

            G.data[j + 0] = F.data[i + 0] * 0.35;
            G.data[j + 1] = F.data[i + 1] * 0.35;
            G.data[j + 2] = F.data[i + 2] * 0.35;
            G.data[j + 3] = F.data[i + 3] * 0.35;
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
