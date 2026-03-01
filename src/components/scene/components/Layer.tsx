import { useEffect, useRef } from "react";
import Shoe from "./Shoe";
import type { LayerType } from "./types";
import type { Mesh } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { CONFIG } from "../config";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LayerProps {
  layer: LayerType;
  activeBrand: string;
  activeNike: string;
}

interface TargetsType {
  position: {
    x: number;
    y: number;
    z: number;
  };
  opacity: number;
}

const Layer = ({ layer, activeBrand, activeNike }: LayerProps) => {
  const meshRefs = useRef<Mesh[]>([]);
  const targets = useRef<TargetsType[]>([]);

  const { width, height } = useThree((v) => v.viewport);

  const registerRef = (mesh: Mesh | null) => {
    if (mesh) meshRefs.current.push(mesh);
  };

  useEffect(() => {
    targets.current = layer.items.map((_, index) => {
      const cellW = width * CONFIG.widthPercentage;
      const cellH = height * CONFIG.widthPercentage;

      const gapW = width * CONFIG.gapPercentage;
      const gapH = height * CONFIG.gapPercentage;

      const totalCols = CONFIG.columns;
      const totalRows = Math.ceil(layer.items.length / CONFIG.columns);

      const gridWidth = totalCols * cellW + (totalCols - 1) * gapW;
      const gridHeight = totalRows * cellH + (totalRows - 1) * gapH;

      const x = index % totalCols;
      const y = Math.floor(index / totalCols);

      return {
        position: {
          x: -gridWidth / 2 + x * (cellW + gapW) + cellW / 2,
          y: -gridHeight / 2 + y * (cellH + gapH) + cellH / 2,
          z: 0,
        },
        opacity: 1,
      };
    });

    console.log(meshRefs.current.length);
    if (meshRefs.current.length == 0) return;

    const Positions = meshRefs.current.map((M) => M.position);
    gsap.set(Positions, {
      x: (i) => targets.current[i].position.x,
      y: (i) => targets.current[i].position.y,
      z: 5,
    });
  }, []);

  useGSAP(() => {
    if (layer.type == activeBrand) {
      layer.animate = "in";
      
      const Positions = meshRefs.current.map((M) => M.position);
      gsap.fromTo(
        Positions,
        {
          z: 5,
        },
        {
          z: 0,
        },
      );
    }

    return () => {};
  }, [activeBrand]);

  // useFrame((_, delta) => {
  //   const speed = 4;
  //   const t = 1 - Math.exp(-speed * delta);

  //   meshRefs.current.forEach((mesh, i) => {
  //     const target = targets.current[i];
  //     if (!mesh || !target) return;

  //     mesh.position.x += (target.position.x - mesh.position.x) * t;
  //     mesh.position.y += (target.position.y - mesh.position.y) * t;
  //     mesh.position.z += (target.position.z - mesh.position.z) * t;
  //   });
  // });

  return (
    <group>
      {layer.items.map((item, i) => (
        <Shoe key={i} {...item} register={registerRef} />
      ))}
    </group>
  );
};

export default Layer;
