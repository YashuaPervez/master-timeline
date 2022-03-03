// Styled
import { UseNodeReturn } from "../../../hooks/useNodes";
import { NodeStyled } from "./styled";

export type NodeObj = {
  id: string;
  position: number;
  layer: string;
  onTrigger?: () => void;
};

type NodeProps = {
  node: NodeObj;
  leftPosition: number;
  zoom: number;
  controlNodes: UseNodeReturn;
};

const Node: React.FC<NodeProps> = ({
  node,
  zoom,
  leftPosition,
  controlNodes,
}) => {
  const transformX = node.position * zoom * 100 + leftPosition;

  return (
    <NodeStyled
      style={{
        transform: `translateX(calc(${transformX + 10}px - 50%))`,
      }}
      className="node"
      onMouseDown={(e) => controlNodes.moveNodeStart(e, node.id, node.position)}
    ></NodeStyled>
  );
};

export default Node;
