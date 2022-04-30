import React, { useState } from "react";
import Draggable from "react-draggable";
import LineTo from "react-lineto";

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
        <img
          src={img}
          onLoad={onLoad}
          style={{ width: 200, pointerEvents: "none", userSelect: "none" }}
          onDragStart={() => false}
          draggable={false}
          alt="colortrui"
        />

        <div style={{ position: "absolute", top: -8, left: -8 }}>
          <Point
            className="A"
            setPoints={setPoints}
            index={0}
            width={width}
            height={height}
          />
          <Point
            className="B"
            setPoints={setPoints}
            index={1}
            width={width}
            height={height}
          />
          <Point
            className="C"
            setPoints={setPoints}
            index={2}
            width={width}
            height={height}
          />
          <Point
            className="D"
            setPoints={setPoints}
            index={3}
            width={width}
            height={height}
          />

          <LineTo from="D" to="C" borderColor="white" zIndex={0} />
          <LineTo from="C" to="A" borderColor="white" zIndex={0} />
          <LineTo from="A" to="B" borderColor="white" zIndex={0} />
          <LineTo from="B" to="D" borderColor="white" zIndex={0} />
        </div>
      </div>
    </div>
  );
};

interface PointProps {
  className: string;
  setPoints: React.Dispatch<React.SetStateAction<[Coord, Coord, Coord, Coord]>>;
  index: number;
  width: number;
  height: number;
}

const Point = ({ className, setPoints, index, width, height }: PointProps) => {
  const setPoint = (x: number, y: number) => {
    setPoints((points) => {
      const p = [...points];
      p[index] = [x, y];

      return [p[0], p[1], p[2], p[3]];
    });
  };

  const onDrag = (_: unknown, { x, y }: { x: number; y: number }) => {
    if (index === 0 || index === 2) {
      x += width;
    }

    if (index === 0 || index === 1) {
      y += height;
    }

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
      onDrag={onDrag}
      onStop={onDrag}
    >
      <div
        className={className}
        style={{
          width: 16,
          height: 16,
          backgroundColor: COLORS[index],
          borderRadius: "50%",
          opacity: 0.6,
          position: "absolute",
          zIndex: 1,
        }}
      />
    </Draggable>
  );
};
