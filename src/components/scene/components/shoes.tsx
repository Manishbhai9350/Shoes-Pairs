import { CONFIG } from "../config";
import Shoe from "./Shoe";
import ShoesData from "../../../data/shoes";
import { useEffect, useState } from "react";
import type { ShoeBrand, Shoes } from "../../../data/types";
import { useTexture } from "@react-three/drei";
import { useControls } from "leva";

const Shoes = () => {
  const [CurrentType, setCurrentType] = useState<ShoeBrand | "all">("Nike");
  const [FilteredShoes, setFilteredShoes] = useState<Shoes>(ShoesData);

  useEffect(() => {
    if (CurrentType == "all") {
      setFilteredShoes(ShoesData);
    } else {
      setFilteredShoes(ShoesData.filter((S) => S.brand == CurrentType));
    }

    return () => {};
  }, [CurrentType]);

  const { curvature } = useControls({
    curvature: {
      min:0,
      max:1,
      value:.2
    }
  })

  return (
    <group>
      {FilteredShoes.map((S,i) => (
        <Shoe key={S.product_url} curvature={curvature} totalItems={FilteredShoes.length} {...S} index={i} />
      ))}
    </group>
  );
};

useTexture.preload(ShoesData.map(S => S.image_url))

export default Shoes;
