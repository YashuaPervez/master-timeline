import React, { useState } from "react";

export type Node = {
  id: string;
  position: number;
  layer: string;
};

// Function Types
export type MoveNodeStart = (
  e: React.MouseEvent,
  id: string,
  position: number
) => void;

type UseNodeArgs = {
  initialNodes: Node[];
  zoom: number;
};

export type UseNodeReturn = {
  nodes: Node[];
  moveNodeStart: MoveNodeStart;
};

let registeredEvent: React.MouseEvent | null = null;
let registeredId: string = "";
let registeredPositon: number = 0;

const useNodes = ({ initialNodes, zoom }: UseNodeArgs): UseNodeReturn => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);

  const moveNodeHandler = (e: MouseEvent) => {
    if (!registeredEvent) {
      return;
    }

    const movedPx = e.clientX - registeredEvent.clientX;
    const movedSeconds = movedPx / (zoom * 100);

    if (zoom < 3.6) {
      const newPosition = Math.round(registeredPositon + movedSeconds);

      setNodes((prev) =>
        prev.map((node) =>
          node.id === registeredId ? { ...node, position: newPosition } : node
        )
      );
    }

    if (zoom >= 3.6) {
      const newPosition =
        Math.round((registeredPositon + movedSeconds) * 10) / 10;

      setNodes((prev) =>
        prev.map((node) =>
          node.id === registeredId ? { ...node, position: newPosition } : node
        )
      );
    }
  };

  const moveNodeStart: MoveNodeStart = (e, id, position) => {
    registeredEvent = e;
    registeredId = id;
    registeredPositon = position;

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", moveNodeHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    document.addEventListener("mousemove", moveNodeHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  return {
    nodes,
    moveNodeStart,
  };
};

export default useNodes;
