import React, { useRef } from "react";
import type { TargetType } from "./types";
import type { Mesh } from "three";

interface ShoeProps {
  target: TargetType;
}

const Shoe = ({ target }: ShoeProps) => {

  const meshRef = useRef<Mesh>(null);



  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color={"yellow"} />
    </mesh>
  );
};

export default Shoe;
