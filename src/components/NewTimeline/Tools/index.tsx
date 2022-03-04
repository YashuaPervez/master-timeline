// Styled
import { ToolsStyled, ToolButton } from "./styled";

//
import { UseToolsReturn } from "../Tools/useTools";
import { Onion, Scissor } from "../../icon";

type ToolsProps = {
  controlTools: UseToolsReturn;
};

const Tools: React.FC<ToolsProps> = ({ controlTools }) => {
  const { activeTool, setToolToActive } = controlTools;

  return (
    <ToolsStyled>
      <ToolButton
        isActive={activeTool === "onion"}
        onClick={() => setToolToActive("onion")}
      >
        <Onion color="#000" size={16} />
      </ToolButton>
      <ToolButton
        isActive={activeTool === "scissor"}
        onClick={() => setToolToActive("scissor")}
      >
        <Scissor color="#000" size={16} />
      </ToolButton>
    </ToolsStyled>
  );
};

export default Tools;
