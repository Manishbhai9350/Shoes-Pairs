import { Mesh, SRGBColorSpace } from "three";
import type { ShoeType } from "../../../data/types";
import { useFrame, useThree } from "@react-three/fiber";
import { CONFIG } from "../config";
import { useTexture } from "@react-three/drei";
import { memo, useEffect, useRef, useState } from "react";

interface ShoeProps extends ShoeType {
  register: (mesh: Mesh | null) => void;
}

const Shoe = ({ image_url, register }: ShoeProps) => {
  const [aspect, setAspect] = useState(1);
  const { width } = useThree((v) => v.viewport);

  const texture = useTexture(image_url);

  // useEffect(() => {
  //   texture.colorSpace = SRGBColorSpace;
  //   const img = texture.image as { width: number; height: number };
  //   if (img?.width && img?.height) {
  //     setAspect(img.height / img.width);
  //   }
  // }, [texture]);

  const planeWidth = width * CONFIG.widthPercentage;
  const planeHeight = planeWidth * aspect;

  return (
    <mesh ref={register}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial color={'red'} /* map={texture} */ />
    </mesh>
  );
};
export default memo(Shoe);
