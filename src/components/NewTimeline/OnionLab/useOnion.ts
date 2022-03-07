import { useRef, useState } from "react";

//
import { UseLayerReturn } from "../Layer/useLayer";
import { OnionObj } from "../Onion/";
import { UseToolsReturn } from "../Tools/useTools";

type UseOnionArgs = {
  zoom: number;
  leftPosition: number;
  controlLayer: UseLayerReturn;
  initialOnions: OnionObj[];
  controlTools: UseToolsReturn;
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
  onions: OnionObj[];
};

const useOnion = ({
  zoom,
  leftPosition,
  controlLayer,
  initialOnions,
  controlTools,
}: UseOnionArgs): UseOnionReturn => {
  const dropOnionRootEventRef = useRef<{
    time: number;
    layerIndex: number;
    screenX: number;
  } | null>(null);
  const addOnionEventRef = useRef<{ duration: number } | null>(null);

  const [onions, setOnions] = useState<OnionObj[]>(initialOnions);

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

      const newOnion: OnionObj = {
        id: `${new Date().getTime()}`,
        time: dropOnionRootEventRef.current.time,
        layer: controlLayer.renderedLayers[layerIndex],
        duration: addOnionEventRef.current.duration,
      };

      console.log("aaaa newOnion >>", newOnion);

      controlTools.setToolToActive(null);
      setOnions((prev) => {
        return [...prev, newOnion];
      });
      setCreateDuration(0);
      setCreateLayerIndex(0);
      setCreateTime(0);
    };

    document.addEventListener("mousemove", moveMoveHandler);
    document.addEventListener("mouseup", placeOnion);
  };

  return {
    dropOnionRoot,
    onions,
    create: {
      time: createTime,
      layerIndex: createLayerIndex,
      duration: createDuration,
    },
  };
};

export default useOnion;
