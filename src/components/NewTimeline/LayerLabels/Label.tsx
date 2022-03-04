import { useState } from "react";

// Components
import ColorPicker from "../../ColorPicker";

// Styled
import { LabelStyled } from "./styled";

//
import { DownAngle, Eye } from "../../icon";
import { LayerObj } from "../Layers/Layer";
import { UseLayerReturn } from "../Layer/useLayer";

type LabelProps = {
  controlLayer: UseLayerReturn;
  label: LayerObj;
  renderedLayers: string[];
  level: number;
  prevAddress: string[];
  parentDisabled: boolean;
};

const Label: React.FC<LabelProps> = ({
  label,
  renderedLayers,
  level,
  controlLayer,
  prevAddress,
  parentDisabled,
}) => {
  const hasChildren = label.children && label.children.length;
  const renderChildren = Boolean(hasChildren && label.open);

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const isDisabled = parentDisabled || disabled;

  const myIndex = renderedLayers.indexOf(label.id);
  const myAddress = [...prevAddress, label.id];

  return (
    <>
      <LabelStyled
        style={{
          transform: `translateY(${myIndex * 21}px)`,
        }}
        open={open}
        disabled={isDisabled}
        renderChildren={renderChildren}
      >
        <div className="toggle">
          <button
            disabled={parentDisabled}
            className={isDisabled ? "closed" : ""}
            onClick={() => setDisabled((prev) => !prev)}
          >
            <Eye />
          </button>
        </div>
        <div className="title">
          <div className="children-toggle">
            {hasChildren && (
              <button onClick={() => controlLayer.toggleLayer(myAddress)}>
                <DownAngle color="#fff" size={0.42} />
              </button>
            )}
          </div>
          <h3 style={{ paddingLeft: 36 * level }}>{label.id}</h3>
        </div>
        <div className="controls">
          {label.controls?.map((ctrl) => (
            <div className="control-unit" key={ctrl}>
              {ctrl === "select" && (
                <select className="form-unit" disabled={isDisabled}>
                  <option>Normal</option>
                  <option>Type 2</option>
                  <option>Type 3</option>
                </select>
              )}
              {ctrl === "input" && (
                <input className="input form-unit" disabled={isDisabled} />
              )}
              {ctrl === "color-picker" && (
                <ColorPicker
                  open={open}
                  setOpen={setOpen}
                  disabled={isDisabled}
                />
              )}
            </div>
          ))}
        </div>
      </LabelStyled>
      {renderChildren &&
        label.children?.map((child) => (
          <Label
            label={child}
            renderedLayers={renderedLayers}
            level={level + 1}
            controlLayer={controlLayer}
            prevAddress={myAddress}
            parentDisabled={parentDisabled || disabled}
          />
        ))}
    </>
  );
};

export default Label;
