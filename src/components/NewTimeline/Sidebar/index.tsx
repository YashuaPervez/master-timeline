import { useRef } from "react";

//
import "./index.css";

type SidebarProps = {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
};

const Sidebar: React.FC<SidebarProps> = ({ children, width, setWidth }) => {
  const resizeRef = useRef<{ event: React.MouseEvent; width: number } | null>(
    null
  );

  const resizeHandler = (e: MouseEvent) => {
    if (!resizeRef.current) return;

    const xMoved = e.clientX - resizeRef.current.event.clientX;

    const newWidth = resizeRef.current.width + xMoved;
    if (newWidth > 319 && newWidth < 1024) {
      setWidth(newWidth);
    }
  };

  const resizeStartHandler: React.MouseEventHandler = (e) => {
    resizeRef.current = {
      event: e,
      width,
    };

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", resizeHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    document.addEventListener("mousemove", resizeHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  return (
    <div className="sidebar" style={{ width }}>
      <div className="cover"></div>
      {/* <div className="column column-1"></div> */}
      {/* <div className="column column-2"></div> */}
      <div className="sidebar-resizer" onMouseDown={resizeStartHandler}></div>
      {children}
    </div>
  );
};

export default Sidebar;
