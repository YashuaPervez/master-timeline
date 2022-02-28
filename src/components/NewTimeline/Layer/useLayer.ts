import { useState } from "react";
import { LayerObj } from ".";

type UseLayerArgs = {
  initialLayers: LayerObj[];
};

// Functions
type ToggleLayer = (addressArray: string[]) => void;

export type UseLayerReturn = {
  layers: LayerObj[];
  toggleLayer: ToggleLayer;
};

const useLayers = ({ initialLayers }: UseLayerArgs): UseLayerReturn => {
  const [layers, setLayers] = useState<LayerObj[]>(initialLayers);

  const toggleLayer: ToggleLayer = (addressArray) => {
    const newLayers: LayerObj[] = [...layers];

    let prevFound: LayerObj | undefined;
    addressArray.forEach((item) => {
      if (prevFound) {
        prevFound = prevFound.children?.find((l) => l.id === item);
      } else {
        prevFound = newLayers.find((l) => l.id === item);
      }
    });

    if (prevFound) {
      prevFound.open = !!!prevFound.open;
    }

    console.log("aaaa newLayers >>", newLayers);

    setLayers(newLayers);
  };

  return {
    layers,
    toggleLayer,
  };
};

export default useLayers;
