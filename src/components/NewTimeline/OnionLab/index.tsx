import { UseLayerReturn } from "../Layer/useLayer";
import { UseOnionReturn } from "./useOnion";

// Styled
import { OnionLabStyled } from "./styled";

type OnionLabProps = {
  controlOnions: UseOnionReturn;
  controlLayer: UseLayerReturn;
  leftPosition: number;
  zoom: number;
};

const OnionLab: React.FC<OnionLabProps> = ({
  controlOnions,
  controlLayer,
  leftPosition,
  zoom,
}) => {
  const { create } = controlOnions;

  console.log("aaaa create >>", create);

  return (
    <OnionLabStyled
      style={{
        height: controlLayer.renderedLayers.length * 21 - 1,
      }}
      onMouseDown={controlOnions.dropOnionRoot}
    >
      {create.time ? (
        <div
          className="test-subject"
          style={{
            left: create.time * zoom * 100 + leftPosition,
            top: create.layerIndex * 21,
            width: create.duration * zoom * 100,
          }}
        ></div>
      ) : null}
    </OnionLabStyled>
  );
};

export default OnionLab;
