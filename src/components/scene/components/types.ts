import type { ShoeBrand, ShoeType } from "../../../data/types";

export interface LayerProps {
  layer: LayerType;
  activeBrand: string;
  activeNike: string;
}

export interface TargetType {
  position: {
    x: number;
    y: number;
    z: number;
  };
  opacity: number;
}

export interface LayerType {
  items: ShoeType[];
  animate: "in" | "out" | "none";
  active: boolean;
  type: ShoeBrand | "mixed";
}
