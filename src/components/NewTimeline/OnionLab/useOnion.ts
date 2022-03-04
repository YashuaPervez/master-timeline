import { useRef, useState } from "react";

//
import { UseLayerReturn } from "../Layer/useLayer";
import { OnionObj } from "../Onion/";

type UseOnionArgs = {
  zoom: number;
  leftPosition: number;
  controlLayer: UseLayerReturn;
  initialOnions: OnionObj[];
};

// Function Types
type DropOnionRoot = React.MouseEventHandler;

export type UseOnionReturn = {
  dropOnionRoot: DropOnionRoot;
  create: {
    time: number;
    layerIndex: number;
    duration: number;
  };
};

const useOnion = ({
  zoom,
  leftPosition,
  controlLayer,
}: UseOnionArgs): UseOnionReturn => {
  const dropOnionRootEventRef = useRef<{
    time: number;
    layerIndex: number;
    screenX: number;
  } | null>(null);
  const addOnionEventRef = useRef<{ duration: number } | null>(null);

  const [createTime, setCreateTime] = useState<number>(0);
  const [createLayerIndex, setCreateLayerIndex] = useState<number>(0);
  const [createDuration, setCreateDuration] = useState<number>(0);

  const moveMoveHandler = (e: MouseEvent) => {
    if (!dropOnionRootEventRef.current) return;

    const XMoved = e.clientX - dropOnionRootEventRef.current.screenX;
    const duration = XMoved / (zoom * 100);
    addOnionEventRef.current = {
      duration,
    };

    setCreateDuration(duration);
  };

  const dropOnionRoot: DropOnionRoot = (e) => {
    const { x: labX, y: labY } = e.currentTarget.getBoundingClientRect();

    const positionInLab = {
      x: e.clientX - labX,
      y: e.clientY - labY,
    };

    const layerIndex = Math.floor(positionInLab.y / 21);
    const time = (positionInLab.x - leftPosition) / (zoom * 100);

    dropOnionRootEventRef.current = {
      layerIndex,
      time,
      screenX: e.clientX,
    };

    setCreateTime(time);
    setCreateLayerIndex(layerIndex);

    const placeOnion = () => {
      document.removeEventListener("mousemove", moveMoveHandler);
      document.removeEventListener("mouseup", placeOnion);

      if (!dropOnionRootEventRef.current || !addOnionEventRef.current) return;

      const newOnion = {
        time: dropOnionRootEventRef.current.time,
        layer: controlLayer.renderedLayers[layerIndex],
        duration: Math.round(addOnionEventRef.current.duration * 10) / 10,
      };

      setCreateDuration(0);
      setCreateLayerIndex(0);
      setCreateTime(0);
    };

    document.addEventListener("mousemove", moveMoveHandler);
    document.addEventListener("mouseup", placeOnion);
  };

  return {
    dropOnionRoot,
    create: {
      time: createTime,
      layerIndex: createLayerIndex,
      duration: createDuration,
    },
  };
};

export default useOnion;
