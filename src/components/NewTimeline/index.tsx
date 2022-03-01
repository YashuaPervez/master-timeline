import { useState } from "react";

// Components
import Sidebar from "./Sidebar";
import Layer from "./Layer";

//
import "./index.css";
import { LayerObj } from "./Layer";
import useLayer from "./Layer/useLayer";
import useZoomAndPan from "../../hooks/useZoomAndPan";
import useRender from "../../hooks/useRender";
import useNodes, { Node } from "../../hooks/useNodes";

type NewTimelineProps = {
  initialLayers: LayerObj[];
  initialNodes: Node[];
};

const duration = 15;

const NewTimeline: React.FC<NewTimelineProps> = ({
  initialLayers,
  initialNodes,
}) => {
  const [width, setWidth] = useState<number>(420);

  const controlLayer = useLayer({
    initialLayers,
  });
  const { layers, renderedLayers } = controlLayer;
  const { leftPosition, zoom, timelineBarMouseDown, wheelHandler } =
    useZoomAndPan({
      initialZoom: 3,
      duration,
      panSpeed: 1,
      zoomSpeed: 0.1,
    });
  const controlNodes = useNodes({
    zoom,
    leftPosition,
    initialNodes,
  });
  const { renderSecondGuides, renderDecimeterGuides, renderNodes } = useRender({
    zoom,
    duration,
    leftPosition,
    controlNodes,
    controlLayer,
  });

  let sidebarClass = "minified";
  if (width > 500) {
    sidebarClass = "one";
  }
  if (width > 860) {
    sidebarClass = "two";
  }

  return (
    <div className={`timeline ${sidebarClass}`}>
      <Sidebar width={width} setWidth={setWidth}>
        <div className="tabs"></div>
      </Sidebar>
      <div className="progress-bar" style={{ left: width + 8 }}>
        <div className="progress"></div>
      </div>
      <div className="layers-list">
        {layers.map((layer) => (
          <Layer
            key={layer.id}
            layer={layer}
            level={0}
            sidebarWidth={width}
            control={controlLayer}
            ancestors={[]}
          />
        ))}
      </div>
      <div
        className="main-timeline"
        id="main-timeline"
        style={{ left: width + 20 }}
        onWheel={wheelHandler}
      >
        {renderSecondGuides()}
        {renderDecimeterGuides()}
        <div
          className="scroll-container"
          style={{ width: duration * zoom * 100, left: leftPosition }}
          onMouseDown={timelineBarMouseDown}
        ></div>

        {renderNodes()}
      </div>
    </div>
  );
};

export default NewTimeline;
