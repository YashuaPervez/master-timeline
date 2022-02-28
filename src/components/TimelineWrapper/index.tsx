import React, { useRef, useState } from "react";

//
import "./index.css";

const TimelineWrapper: React.FC = ({ children }) => {
  const [height, setHeight] = useState<number>(500);
  const resizeRef = useRef<{ event: React.MouseEvent; height: number } | null>(
    null
  );

  const resizeHandler = (e: MouseEvent) => {
    if (!resizeRef.current) return;

    const yMoved = resizeRef.current?.event.clientY - e.clientY;
    setHeight(resizeRef.current.height + yMoved);
  };

  const resizeStartHandler: React.MouseEventHandler = (e) => {
    resizeRef.current = {
      event: e,
      height,
    };

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", resizeHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    document.addEventListener("mousemove", resizeHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  return (
    <div className="timeline-wrapper" style={{ height }}>
      <div className="resizer" onMouseDown={resizeStartHandler}></div>
      <div className="timeline-content">{children}</div>
    </div>
  );
};

export default TimelineWrapper;
