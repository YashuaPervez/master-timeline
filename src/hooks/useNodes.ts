import React, { useState } from "react";
import { UseLayerReturn } from "../components/NewTimeline/Layer/useLayer";

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
type AddNewNode = (e: React.MouseEvent) => void;

type UseNodeArgs = {
  initialNodes: Node[];
  zoom: number;
  leftPosition: number;
  controlLayer: UseLayerReturn;
};

export type UseNodeReturn = {
  nodes: Node[];
  moveNodeStart: MoveNodeStart;
  addNewNode: AddNewNode;
};

let registeredEvent: React.MouseEvent | null = null;
let registeredId: string = "";
let registeredPositon: number = 0;

const useNodes = ({
  initialNodes,
  zoom,
  leftPosition,
  controlLayer,
}: UseNodeArgs): UseNodeReturn => {
  const { renderedLayers } = controlLayer;
  const [nodes, setNodes] = useState<Node[]>(initialNodes);

  const moveNodeHandler = (e: MouseEvent) => {
    if (!registeredEvent) {
      return;
    }

    const movedPx = e.clientX - registeredEvent.clientX;

    console.log("aaaa movedPx >>", movedPx);

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

  const addNewNode: AddNewNode = (e) => {
    const scrollbarContainer = document.getElementById(
      "scroll-container"
    ) as HTMLDivElement;
    const { x: scX, y: scY } = scrollbarContainer.getBoundingClientRect();

    const positionInScrollContainer = {
      x: e.clientX - scX,
      y: e.clientY - scY,
    };

    const timeClicked = positionInScrollContainer.x / (zoom * 100);
    const layerIndex = Math.floor(positionInScrollContainer.y / 21);

    let position: number = 0;
    if (zoom < 3.6) {
      position = Math.round(timeClicked);
    } else if (zoom >= 3.6) {
      position = Math.round(timeClicked * 10) / 10;
    }

    setNodes((prev) => {
      const newNode = {
        id: `${new Date().getTime()}`,
        layer: renderedLayers[layerIndex],
        position,
      };

      return [...prev, newNode];
    });
  };

  return {
    nodes,
    moveNodeStart,
    addNewNode,
  };
};

export default useNodes;
