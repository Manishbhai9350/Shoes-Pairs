import { CONFIG } from "../config";
import Shoe from "./Shoe";
import ShoesData from "../../../data/shoes";
import { useEffect, useState } from "react";
import type { ShoeBrand, Shoes } from "../../../data/types";
import { useTexture } from "@react-three/drei";
import { useControls } from "leva";
import type { LayerType } from "./types";

const Shoes = () => {
  const [ActiveBrand, setActiveBrand] = useState<ShoeBrand>("Nike");
  const [ActiveNike, setActiveNike] = useState<"all" | "dunk" | "new-balance">(
    "all",
  );
  const [FilteredShoes, setFilteredShoes] = useState<Shoes>(ShoesData);
  const [Layers, setLayers] = useState<LayerType[]>([]);

  const { curvature } = useControls({
    curvature: {
      min: 0,
      max: 1,
      value: 0.2,
    },
  });

  useEffect(() => {
    const Nikes = ShoesData.filter((S) => S.brand == "Nike");
    const NewBalance = ShoesData.filter((S) => S.brand == "New Balance");

    const Under150 = ShoesData.filter(
      (S) => Number(S.price?.replace("$", "")) < 150,
    );

    setLayers([
      {
        items: Nikes,
        animate: "in",
        active: true,
        type: "Nike",
      },
      {
        items: NewBalance,
        animate: "none",
        active: false,
        type: "New Balance",
      },
      {
        items: Under150,
        animate: "none",
        active: false,
        type: "mixed",
      },
    ]);

    return () => {};
  }, []);

  useEffect(() => {
    console.log(Layers);

    return () => {};
  }, [Layers]);

  return <group></group>;
};

useTexture.preload(ShoesData.map((S) => S.image_url));

export default Shoes;
