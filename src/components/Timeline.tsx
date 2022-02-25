import React from "react";

//
import useRender from "../hooks/useRender";
import useZoomAndPan from "../hooks/useZoomAndPan";
import useNodes, { Node } from "../hooks/useNodes";
import useLayers, { Layer } from "../hooks/useLayers";
import useCursor from "../hooks/useCursor";
import "./timeline.css";

type TimelineProps = {
  initialZoom?: number;
  panSpeed?: number;
  zoomSpeed?: number;
  duration: number; // Number of seconds
  initialNodes?: Node[];
  initialLayers: Layer[];
};

const Timeline: React.FC<TimelineProps> = ({
  initialZoom = 1,
  panSpeed = 1,
  zoomSpeed = 0.1,
  duration,
  initialNodes = [],
  initialLayers,
}) => {
  const { zoom, wheelHandler, leftPosition, timelineBarMouseDown } =
    useZoomAndPan({
      initialZoom,
      zoomSpeed,
      duration,
      panSpeed,
    });

  const controlLayers = useLayers({ initialLayers });
  const controlCursor = useCursor();
  const controlNodes = useNodes({ initialNodes, zoom });
  const {
    renderSecondGuides,
    renderDecimeterGuides,
    renderLayers,
    renderCursor,
    renderNodes,
  } = useRender({
    zoom,
    duration,
    controlNodes,
    controlLayers,
    leftPosition,
    controlCursor,
  });

  return (
    <div className="timeline">
      <div className="layer-bar">a</div>
      <div className="main">
        <div className="controls">
          <button onClick={controlCursor.startProgress}>Start</button>
          <button onClick={controlCursor.reset}>Reset</button>
          <button onClick={controlCursor.stopProgress}>Stop</button>
        </div>
        <div
          className="scrollable-container"
          id="scrollable-container"
          onWheel={wheelHandler}
        >
          <div
            className="timeline-bar"
            style={{ width: duration * zoom * 100, left: leftPosition }}
            onMouseDown={timelineBarMouseDown}
          >
            {renderLayers()}
            {renderSecondGuides()}
            {renderDecimeterGuides()}
            {renderCursor()}
          </div>
          {renderNodes()}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
