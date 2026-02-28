import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import stripeVertex from "../../../shaders/stripes/vertex.glsl";
import stripeFragment from "../../../shaders/stripes/fragment.glsl";
import { useEffect, useRef } from "react";
import { useControls } from "leva";

export const StripeMaterial = shaderMaterial(
  {
    uTime: { value: 0 },
    scale: { value: 4 },
    aspect: { value: 1 },
  },
  stripeVertex,
  stripeFragment,
);

extend({ StripeMaterial });

const Stripes = () => {
  const { width, height, aspect } = useThree((v) => v.viewport);

  const stripeRef = useRef();

  const scale = 4;

  // const { scale } = useControls({
  //   scale: {
  //     value: 4,
  //     min: 0.1,
  //     max: 10,
  //     step: 0.01,
  //   },
  // });

  useEffect(() => {
    if (!stripeRef.current) return;
    stripeRef.current.uniforms.scale.value = scale;
    stripeRef.current.uniforms.aspect.value = aspect;

    return () => {};
  }, [scale, aspect]);

  useFrame(({ clock }) => {
    if (!stripeRef.current) return;

    stripeRef.current.uniforms.uTime.value = clock.getElapsedTime();

    return () => {};
  }, []);

  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <stripeMaterial ref={stripeRef} color={"red"} />
    </mesh>
  );
};

export default Stripes;
