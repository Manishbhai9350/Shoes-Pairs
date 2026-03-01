import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { LayerProps, LayerType, TargetType } from "./types";
import { CONFIG } from "../config";
import { useThree } from "@react-three/fiber";

const Layer = ({ layer, activeBrand, activeNike }: LayerProps) => {
  const [Targets, setTargets] = useState<TargetType[]>([]);

  const { width, height } = useThree((v) => v.viewport);

  useEffect(() => {
    layer.items.forEach((item, index) => {
      const cellW = width * CONFIG.widthPercentage;
      const cellH = height * CONFIG.widthPercentage;

      const gapW = width * CONFIG.gapPercentage;
      const gapH = height * CONFIG.gapPercentage;

      const totalCols = CONFIG.columns;
      const totalRows = Math.ceil(layer.items.length / CONFIG.columns);

      const gridWidth = totalCols * cellW + (totalCols - 1) * gapW;
      const gridHeight = totalRows * cellH + (totalRows - 1) * gapH;

      const x = index % totalCols;
      const y = Math.floor(index / totalCols);

      setTargets((T) => [
        ...T,
        {
          position: {
            x: -gridWidth / 2 + x * (cellW + gapW) + cellW / 2,
            y: -gridHeight / 2 + y * (cellH + gapH) + cellH / 2,
            z: 0,
          },
          opacity: 1,
        },
      ]);
    });

    return () => {
      setTargets([]);
    };
  }, [layer.items.length, width, height]);

  useEffect(() => {
    console.log(Targets);
    return () => {};
  }, [Targets]);

  return <group></group>;
};

export default Layer;
