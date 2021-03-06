import { useState } from "react";

// Components
import ColorPicker from "../../ColorPicker";

//
import { DownAngle, Eye } from "../../icon";
import { UseLayerReturn } from "./useLayer";

export type LayerObj = {
  id: string;
  label: string;
  open?: boolean;
  children?: LayerObj[];
  controls?: string[];
};

type LayerProps = {
  layer: LayerObj;
  level: number;
  sidebarWidth: number;
  control: UseLayerReturn;
  ancestors: string[];
};

const Layer: React.FC<LayerProps> = ({
  layer,
  level,
  sidebarWidth,
  control,
  ancestors,
}) => {
  const hasChidren = layer.children && layer.children.length;
  const myAddress = [...ancestors, layer.id];

  const [disabled, setDisabled] = useState<boolean>(false);

  return (
    <>
      <div className={`layer ${disabled ? "disabled" : ""}`}>
        <div className="label" style={{ width: sidebarWidth }}>
          <div className="eye-button">
            <button
              className={`${disabled ? "in-active" : ""}`}
              onClick={() => setDisabled((prev) => !prev)}
            >
              <Eye />
            </button>
          </div>
          <div className="title" style={{ paddingLeft: level * 40 }}>
            {hasChidren && (
              <button
                style={{ transform: layer.open ? "" : "rotate(-90deg)" }}
                onClick={() => control.toggleLayer(myAddress)}
              >
                <DownAngle color="#fff" size={0.4} />
              </button>
            )}
            <span className="text">{layer.label}</span>
          </div>
          <div className="controls">
            {layer.controls?.map((el, i) => {
              if (el === "input") {
                return (
                  <div className={`control-unit c-${i + 1}`}>
                    <select className="select form-unit" disabled={disabled}>
                      <option>Normal</option>
                      <option>Type 2</option>
                      <option>Type 3</option>
                    </select>
                  </div>
                );
              }

              if (el === "select") {
                return (
                  <div className={`control-unit c-${i + 1}`}>
                    <input className="input form-unit" disabled={disabled} />
                  </div>
                );
              }

              if (el === "color-picker") {
                return (
                  <div className={`control-unit c-${i + 1}`}>
                    {/* <ColorPicker /> */}
                    {/* <button className="picker" disabled={disabled}></button> */}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="presenter" style={{ left: sidebarWidth + 8 }}></div>
      </div>
      {layer.children &&
        layer.children.length &&
        layer.open &&
        layer.children.map((child) => (
          <Layer
            key={child.id}
            layer={child}
            level={level + 1}
            sidebarWidth={sidebarWidth}
            control={control}
            ancestors={myAddress}
          />
        ))}
    </>
  );
};

export default Layer;
