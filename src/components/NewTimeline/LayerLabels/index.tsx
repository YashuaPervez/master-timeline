// Components
import Label from "./Label";

// Styled
import { UseLayerReturn } from "../Layer/useLayer";
import { LayerLabelsStyled } from "./styled";

type LayerLabelsStyled = {
  controlLayer: UseLayerReturn;
  renderedLayers: string[];
};

const LayerLabels: React.FC<LayerLabelsStyled> = ({
  controlLayer,
  renderedLayers,
}) => {
  return (
    <LayerLabelsStyled className="label-set">
      <>
        {controlLayer.layers.map((label) => (
          <Label
            label={label}
            renderedLayers={renderedLayers}
            level={0}
            controlLayer={controlLayer}
            prevAddress={[]}
            parentDisabled={false}
          />
        ))}
      </>
    </LayerLabelsStyled>
  );
};

export default LayerLabels;
