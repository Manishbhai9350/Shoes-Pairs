declare module "*.glsl" {
  const value: string;
  export default value;
}

declare module "*.vert" {
  const value: string;
  export default value;
}

declare module "*.frag" {
  const value: string;
  export default value;
}

import { StripeMaterial } from "./components/stripes";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      stripeMaterial: ReactThreeFiber.Object3DNode<
        typeof StripeMaterial,
        typeof StripeMaterial
      >;
    }
  }
}