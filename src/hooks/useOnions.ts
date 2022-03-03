import React, { useRef } from "react";
import { UseLayerReturn } from "../components/NewTimeline/Layer/useLayer";

type UseOnionArgs = {
  controlLayer: UseLayerReturn;
  leftPosition: number;
  zoom: number;
};

const useUnions = ({ controlLayer, leftPosition, zoom }: UseOnionArgs) => {
  const createOnionStartRef = useRef<{
    layerIndex: number;
    time: number;
    screenX: number;
  } | null>(null);

  const moveMouseHandler = (e: MouseEvent) => {
    if (!createOnionStartRef.current) return;
    const xMoved = e.clientX - createOnionStartRef.current.screenX;
  };

  const createOnionStart: React.MouseEventHandler = (e) => {
    const scrollContainer = document.getElementById(
      "scroll-container"
    ) as HTMLDivElement;
    const { x: scX, y: scY } = scrollContainer.getBoundingClientRect();

    const positionInScrollContainer = {
      x: e.clientX - scX,
      y: e.clientY - scY,
    };

    const layerIndex = Math.floor(positionInScrollContainer.y / 21);
    const time = (positionInScrollContainer.x - leftPosition) / (zoom * 100);

    createOnionStartRef.current = {
      layerIndex,
      time,
      screenX: e.clientX,
    };

    function removeMoveHandler() {
      document.removeEventListener("mousemove", moveMouseHandler);
      document.removeEventListener("mouseup", removeMoveHandler);
    }

    document.addEventListener("mousemove", moveMouseHandler);
    document.addEventListener("mouseup", removeMoveHandler);
  };

  return {
    createOnionStart,
  };
};

export default useUnions;
