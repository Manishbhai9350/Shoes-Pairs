import { Canvas } from "@react-three/fiber";
import Stripes from "./components/stripes";
import Shoes from "./components/shoes";

const Scene = () => {
  return (
    <Canvas>
      <Stripes />
      <Shoes />
    </Canvas>
  );
};

export default Scene;
