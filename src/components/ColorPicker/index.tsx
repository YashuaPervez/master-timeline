import { useState } from "react";
import ReactDOM from "react-dom";
import { ColorChangeHandler, SketchPicker } from "react-color";

//
import "./index.css";

type ColorPickerProps = {
  open: boolean;
  disabled: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  open,
  disabled,
  setOpen,
}) => {
  const [color, setColor] = useState<string>("#ff0000");

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  const closeOpen = () => {
    setOpen(false);
  };

  const onColorChange: ColorChangeHandler = (props) => {
    setColor(props.hex);
  };

  return (
    <>
      <div className="picker-container">
        <button
          className="picker"
          onClick={toggleOpen}
          style={{ backgroundColor: color }}
          disabled={disabled}
        ></button>
        {open && (
          <div className="picker-popover">
            <SketchPicker
              width="200px"
              color={color}
              onChange={onColorChange}
            />
          </div>
        )}
      </div>
      {open && <Backdrop onClick={closeOpen} />}
    </>
  );
};

const Backdrop: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const target = document.getElementById("backdrop-container");

  if (!target) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="backdrop" onClick={onClick} />,
    target
  );
};

export default ColorPicker;
