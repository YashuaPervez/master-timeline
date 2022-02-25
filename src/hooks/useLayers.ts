import { useState } from "react";

export type Layer = {
  id: string;
  childrens?: Layer[];
  open?: boolean;
};

type UseLayerArgs = {
  initialLayers: Layer[];
};

export type UseLayersReturn = {
  layers: Layer[];
};

const useLayers = ({ initialLayers }: UseLayerArgs): UseLayersReturn => {
  const [layers, setLayers] = useState<Layer[]>(
    initialLayers.map((l) => ({ ...l, open: !!l.open }))
  );

  return {
    layers,
  };
};

export default useLayers;
