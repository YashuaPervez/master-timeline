import React from "react";

//
import useRender from "../hooks/useRender";
import useZoomAndPan from "../hooks/useZoomAndPan";
import useNodes, { Node } from "../hooks/useNodes";
import useLayers, { Layer } from "../hooks/useLayers";
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
  const controlNodes = useNodes({ initialNodes, zoom });
  const {
    renderSecondGuides,
    renderDecimeterGuides,
    renderLayers,
    renderNodes,
  } = useRender({
    zoom,
    duration,
    controlNodes,
    leftPosition,
    controlLayers,
  });

  return (
    <div className="timeline">
      <div className="layer-bar">a</div>
      <div className="main">
        <div className="controls">b</div>
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
          </div>
          {renderNodes()}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
