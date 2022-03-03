import { useEffect, useState } from "react";
import { LayerObj } from "../Layers/Layer";

type UseLayerArgs = {
  initialLayers: LayerObj[];
};

// Functions
type ToggleLayer = (addressArray: string[]) => void;

export type UseLayerReturn = {
  layers: LayerObj[];
  renderedLayers: string[];
  toggleLayer: ToggleLayer;
};

const useLayers = ({ initialLayers }: UseLayerArgs): UseLayerReturn => {
  const [layers, setLayers] = useState<LayerObj[]>(initialLayers);
  const [renderedLayers, setRenderedLayers] = useState<string[]>([]);

  useEffect(() => {
    let _renderedLayers: string[] = [];
    const operateLayers = (layers: LayerObj[]) => {
      layers.forEach((layer) => {
        const renderChildren =
          layer.children && layer.children.length && layer.open;

        _renderedLayers.push(layer.id);
        if (renderChildren) {
          operateLayers(layer.children || []);
        }
      });
    };

    operateLayers(layers);
    setRenderedLayers(_renderedLayers);
  }, [layers]);

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

    setLayers(newLayers);
  };

  return {
    layers,
    renderedLayers,
    toggleLayer,
  };
};

export default useLayers;
