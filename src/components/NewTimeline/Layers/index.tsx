// Styled
import { LayersStyled } from "./styled";

//
import Layer, { LayerObj } from "./Layer";
import { NodeObj } from "../Node";
import { UseNodeReturn } from "../../../hooks/useNodes";
import { UseOnionReturn } from "../OnionLab/useOnion";

type LayersProps = {
  layers: LayerObj[];
  renderedLayers: string[];
  nodes: NodeObj[];
  leftPosition: number;
  zoom: number;
  timelineBarMouseDown: React.MouseEventHandler<Element>;
  controlNodes: UseNodeReturn;
  controlOnions: UseOnionReturn;
};

const Layers: React.FC<LayersProps> = ({
  nodes,
  layers,
  leftPosition,
  zoom,
  timelineBarMouseDown,
  controlNodes,
  renderedLayers,
  controlOnions,
}) => {
  return (
    <LayersStyled
      className="layer-set"
      onMouseDown={timelineBarMouseDown}
      style={{ height: renderedLayers.length * 21 }}
    >
      {layers.map((layer) => (
        <Layer
          layer={layer}
          nodes={nodes}
          leftPosition={leftPosition}
          zoom={zoom}
          controlNodes={controlNodes}
          renderedLayers={renderedLayers}
          controlOnions={controlOnions}
        />
      ))}
    </LayersStyled>
  );
};

export default Layers;
