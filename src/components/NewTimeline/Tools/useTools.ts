import { useState } from "react";

const toolNames = ["onion", "scissor"];

// Function Types
type SetToolToActive = (toolName: string | null) => void;

export type UseToolsReturn = {
  activeTool: string | null;
  setToolToActive: SetToolToActive;
};

const useTools = (): UseToolsReturn => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const setToolToActive = (toolName: string | null) => {
    const toolExists = toolNames.includes(toolName || "");

    if (toolName === activeTool) {
      setActiveTool(null);
      return;
    }

    if (toolExists) {
      setActiveTool(toolName);
    } else {
      setActiveTool(null);
    }
  };

  return {
    activeTool,
    setToolToActive,
  };
};

export default useTools;
