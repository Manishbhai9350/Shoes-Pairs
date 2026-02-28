import type { ShoeBrand, ShoeType } from "../../../data/types";



export interface LayerType {
    items: ShoeType[],
    animate: "in" | "out" | "none",
    active: boolean,
    type: ShoeBrand | "mixed"
}