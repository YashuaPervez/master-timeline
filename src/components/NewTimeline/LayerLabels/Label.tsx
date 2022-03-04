import { useState } from "react";

// Components
import ColorPicker from "../../ColorPicker";

// Styled
import { LabelStyled } from "./styled";

//
import { Eye } from "../../icon";
import { LayerObj } from "../Layers/Layer";

type LabelProps = {
  label: LayerObj;
  renderedLayers: string[];
};

const Label: React.FC<LabelProps> = ({ label, renderedLayers }) => {
  const hasChildren = label.children && label.children.length;
  const renderChildren = hasChildren && label.open;

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const myIndex = renderedLayers.indexOf(label.id);

  return (
    <>
      <LabelStyled
        style={{
          transform: `translateY(${myIndex * 21}px)`,
        }}
        open={open}
        disabled={disabled}
      >
        <div className="toggle">
          <button
            className={disabled ? "closed" : ""}
            onClick={() => setDisabled((prev) => !prev)}
          >
            <Eye />
          </button>
        </div>
        <div className="title">
          <h3>{label.id}</h3>
        </div>
        <div className="controls">
          {label.controls?.map((ctrl) => (
            <div className="control-unit" key={ctrl}>
              {ctrl === "select" && (
                <select className="form-unit" disabled={disabled}>
                  <option>Normal</option>
                  <option>Type 2</option>
                  <option>Type 3</option>
                </select>
              )}
              {ctrl === "input" && (
                <input className="input form-unit" disabled={disabled} />
              )}
              {ctrl === "color-picker" && (
                <ColorPicker
                  open={open}
                  setOpen={setOpen}
                  disabled={disabled}
                />
              )}
            </div>
          ))}
        </div>
      </LabelStyled>
      {renderChildren &&
        label.children?.map((child) => (
          <Label label={child} renderedLayers={renderedLayers} />
        ))}
    </>
  );
};

export default Label;
