import { CONFIG } from "../config";
import Shoe from "./Shoe";
import ShoesData from "../../../data/shoes";
import { useEffect, useState } from "react";
import type { ShoeBrand, Shoes } from "../../../data/types";
import { useTexture } from "@react-three/drei";
import { useControls } from "leva";
import type { LayerType } from "./types";
import Layer from "./Layer";

const Shoes = () => {
  const [ActiveBrand, setActiveBrand] = useState<ShoeBrand | "mixed">("Nike");
  const [ActiveNike, setActiveNike] = useState<"all" | "dunk" | "new-balance">(
    "all",
  );
  const [FilteredShoes, setFilteredShoes] = useState<Shoes>(ShoesData);
  const [Layers, setLayers] = useState<LayerType[]>([]);

  useEffect(() => {
    const Nikes = ShoesData.filter((S) =>
      S.brand.toLowerCase().includes("nike"),
    );
    const NewBalance = ShoesData.filter((S) =>
      S.brand.toLowerCase().trim().includes("new balance"),
    );

    const Under150 = ShoesData.filter(
      (S) => Number(S.price?.replace("$", "")) < 150,
    );

    console.group(Nikes.length, NewBalance.length);

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

  return (
    <group>
      {Layers.map((L) => (
        <Layer
          key={L.type}
          activeBrand={ActiveBrand}
          activeNike={ActiveNike}
          layer={L}
        />
      ))}
    </group>
  );
};

// useTexture.preload(ShoesData.map((S) => S.image_url));

export default Shoes;
