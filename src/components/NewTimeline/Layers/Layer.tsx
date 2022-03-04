// Styled
import { LayerStyled } from "./styled";

//
import Node, { NodeObj } from "../Node";
import { UseNodeReturn } from "../../../hooks/useNodes";

export type LayerObj = {
  id: string;
  label: string;
  open?: boolean;
  children?: LayerObj[];
  controls?: string[];
};

type LayerProps = {
  layer: LayerObj;
  renderedLayers: string[];
  nodes: NodeObj[];
  leftPosition: number;
  zoom: number;
  controlNodes: UseNodeReturn;
};

const Layer: React.FC<LayerProps> = ({
  layer,
  nodes,
  leftPosition,
  zoom,
  controlNodes,
  renderedLayers,
}) => {
  const hasChildren = layer.children && layer.children.length;
  const renderChildren = hasChildren && layer.open;

  const myNodes = nodes.filter((node) => node.layer === layer.id);
  const myIndex = renderedLayers.indexOf(layer.id);

  const addNodeHandler: React.MouseEventHandler = (e) => {
    const { x: layerX } = e.currentTarget.getBoundingClientRect();
    const xClicked = e.clientX - layerX;
    const time = (xClicked - leftPosition - 10) / (zoom * 100);

    controlNodes.addNewNode(time, layer.id);
  };

  return (
    <>
      <LayerStyled
        className="layer"
        onDoubleClick={addNodeHandler}
        style={{
          top: myIndex * 21,
        }}
      >
        {myNodes.map((node) => (
          <Node
            node={node}
            leftPosition={leftPosition}
            zoom={zoom}
            controlNodes={controlNodes}
          />
        ))}
      </LayerStyled>
      {renderChildren &&
        layer.children?.map((child) => (
          <Layer
            layer={child}
            nodes={nodes}
            leftPosition={leftPosition}
            zoom={zoom}
            controlNodes={controlNodes}
            renderedLayers={renderedLayers}
          />
        ))}
    </>
  );
};

export default Layer;
