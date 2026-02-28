import { Mesh, SRGBColorSpace } from "three";
import type { ShoeType } from "../../../data/types";
import { useFrame, useThree } from "@react-three/fiber";
import { CONFIG } from "../config";
import { useTexture } from "@react-three/drei";
import { memo, useEffect, useRef, useState } from "react";

const Shoe = ({
  index,
  image_url,
  totalItems,
  curvature,
}: ShoeType & { index: number; totalItems: number; curvature: number }) => {
  const [aspect, setAspect] = useState(1);
  const { width, height } = useThree((v) => v.viewport);

  const meshRef = useRef<Mesh>(null!);
  const Data = useRef({
    targetPosition: {
      x: 0,
      y: 0,
      z: 0,
    },
  });

  const cellW = width * CONFIG.widthPercentage;
  const cellH = height * CONFIG.widthPercentage;

  const gapW = width * CONFIG.gapPercentage;
  const gapH = height * CONFIG.gapPercentage;

  const totalCols = CONFIG.columns;
  const totalRows = Math.ceil(totalItems / CONFIG.columns); // pass total count as prop

  const gridWidth = totalCols * cellW + (totalCols - 1) * gapW;
  const gridHeight = totalRows * cellH + (totalRows - 1) * gapH;

  const x = index % CONFIG.columns;
  const y = Math.floor(index / CONFIG.columns);

  const position: [number, number, number] = [
    // -gridWidth / 2 + x * (cellW + gapW) + cellW / 2,
    // -gridHeight / 2 + y * (cellH + gapH) + cellH / 2,

    0, 0, 0,
  ];

  Data.current.targetPosition = {
    x: -gridWidth / 2 + x * (cellW + gapW) + cellW / 2,
    y: -gridHeight / 2 + y * (cellH + gapH) + cellH / 2,
    z: position[2],
  };

  const texture = useTexture(image_url);

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace;

    const img = texture.image as { width: number; height: number };

    if (img && img?.width && img?.height) {
      setAspect(img.height / img.width); // height relative to width
    }
  }, [texture]);

  useEffect(() => {
    const cols = Math.max(1, totalCols);
    const rows = Math.max(1, totalRows);

    const nx = cols === 1 ? 0 : (x / (cols - 1)) * 2 - 1;
    const ny = rows === 1 ? 0 : (y / (rows - 1)) * 2 - 1;

    const dist = Math.sqrt(nx * nx + ny * ny);
    const safeCurvature = Math.min(Math.max(curvature, 0), 5);
    const depth = Math.sin(dist * Math.PI * 0.5) * safeCurvature * 2;

    Data.current.targetPosition.x =
      -gridWidth / 2 + x * (cellW + gapW) + cellW / 2;

    Data.current.targetPosition.y =
      -gridHeight / 2 + y * (cellH + gapH) + cellH / 2;

    Data.current.targetPosition.z = -depth;
  }, [
    x,
    y,
    curvature,
    gridWidth,
    gridHeight,
    cellW,
    gapW,
    cellH,
    gapH,
    totalCols,
    totalRows,
  ]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const target = Data.current.targetPosition;

    const speed = 4;
    const t = 1 - Math.exp(-speed * delta);

    mesh.position.x += (target.x - mesh.position.x) * t;
    mesh.position.y += (target.y - mesh.position.y) * t;
    mesh.position.z += (target.z - mesh.position.z) * t;
  });

  const planeWidth = width * CONFIG.widthPercentage;
  const planeHeight = planeWidth * aspect;

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial transparent map={texture} />
    </mesh>
  );
};
export default memo(Shoe);
