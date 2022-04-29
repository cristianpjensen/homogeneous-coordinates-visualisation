import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

import img from "../assets/colortrui.png";

type Coord = [number, number];
const COLORS = ["red", "green", "blue", "yellow"];

export const Controls = () => {
  const [points, setPoints] = useState<[Coord, Coord, Coord, Coord]>([
    [1, 1],
    [0, 1],
    [1, 0],
    [0, 0],
  ]);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const onLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setWidth(e.currentTarget.width);
    setHeight(e.currentTarget.height);
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        <img src={img} onLoad={onLoad} style={{ width: 200 }} alt="colortrui" />

        <div style={{ position: "absolute", top: -8, left: -8 }}>
          {points.map((p, index) => (
            <Point
              key={index}
              setPoints={setPoints}
              index={index}
              width={width}
              height={height}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface PointProps {
  setPoints: React.Dispatch<React.SetStateAction<[Coord, Coord, Coord, Coord]>>;
  index: number;
  width: number;
  height: number;
}

const Point = ({ setPoints, index, width, height }: PointProps) => {
  const setPoint = (x: number, y: number) => {
    setPoints((points) => {
      const p = [...points];
      p[index] = [x, y];

      return [p[0], p[1], p[2], p[3]];
    });
  };

  const onStop = (_: unknown, { x, y }: { x: number; y: number }) => {
    if (index === 0 || index === 2) {
      x += width;
    }

    if (index === 0 || index === 1) {
      y += height;
    }

    console.log(x, y);
    setPoint(x / width, y / height);
  };

  return (
    <Draggable
      positionOffset={{
        x: index === 1 || index === 3 ? 0 : width,
        y: index === 2 || index === 3 ? 0 : height,
      }}
      bounds={{
        left: index === 1 || index === 3 ? 0 : -width,
        right: index === 1 || index === 3 ? width : 0,
        top: index === 2 || index === 3 ? 0 : -height,
        bottom: index === 2 || index === 3 ? height : 0,
      }}
      onStop={onStop}
    >
      <div
        style={{
          width: 16,
          height: 16,
          backgroundColor: COLORS[index],
          borderRadius: "50%",
          opacity: 0.6,
          position: "absolute",
        }}
      />
    </Draggable>
  );
};
