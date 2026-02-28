import { Canvas } from "@react-three/fiber";
import Stripes from "./components/stripes";
import ShoesComponent from "./components/shoes";
import { Suspense } from "react";

const Scene = () => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Stripes />
        <ShoesComponent />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
