import { useState } from "react";

export type Layer = {
  id: string;
  childrens?: Layer[];
  open?: boolean;
};

// Function Types
type ToggleLayer = (id: string) => void;

type UseLayerArgs = {
  initialLayers: Layer[];
};

export type UseLayersReturn = {
  layers: Layer[];
  toggleLayer: ToggleLayer;
};

const useLayers = ({ initialLayers }: UseLayerArgs): UseLayersReturn => {
  const [layers, setLayers] = useState<Layer[]>(
    initialLayers.map((l) => ({ ...l, open: !!l.open }))
  );

  const toggleLayer: ToggleLayer = (id) => {
    setLayers(prev => prev.map(item => {
      if(item.id === id){
        return {
          ...item,
          open: !!!item.open
        }
      }

      return item;
    }))
  }

  return {
    layers,
    toggleLayer,
  };
};

export default useLayers;
