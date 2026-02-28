import Shoe from "./Shoe";
import type { LayerType } from "./types";

const Layer = ({ layer }: { layer: LayerType }) => {
  return (
    <group>
      {layer.items.map((Item, i) => {
        return (
          <Shoe key={i} {...Item} index={i} totalItems={layer.items.length} />
        );
      })}
    </group>
  );
};

export default Layer;
