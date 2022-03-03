// Styled
import { LayersStyled } from "./styled";

//
import Layer, { LayerObj } from "./Layer";
import { NodeObj } from "../Node";
import { UseNodeReturn } from "../../../hooks/useNodes";

type LayersProps = {
  layers: LayerObj[];
  renderedLayers: string[];
  nodes: NodeObj[];
  leftPosition: number;
  zoom: number;
  timelineBarMouseDown: React.MouseEventHandler<Element>;
  controlNodes: UseNodeReturn;
};

const Layers: React.FC<LayersProps> = ({
  nodes,
  layers,
  leftPosition,
  zoom,
  timelineBarMouseDown,
  controlNodes,
  renderedLayers,
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
        />
      ))}
    </LayersStyled>
  );
};

export default Layers;
