import { useState } from "react";

// Components
import Sidebar from "./Sidebar";
import TimeSplitter from "./TimeSplitter";
import Layers from "./Layers";
import ProgressBar from "./Progressbar";
import Cursor from "./Cursor";
import LayerLabels from "./LayerLabels";
import OnionLab from "./OnionLab";

// import Layer from "./Layer";

//
import "./index.css";
import { LayerObj } from "./Layers/Layer";
import useLayer from "./Layer/useLayer";
import useZoomAndPan from "../../hooks/useZoomAndPan";
// import useRender from "../../hooks/useRender";
import useNodes, { Node } from "../../hooks/useNodes";
import useOnion from "./OnionLab/useOnion";
import useCursor from "../../hooks/useCursor";
import Tools from "./Tools";
import useTools from "./Tools/useTools";
import { OnionObj } from "./Onion";

type NewTimelineProps = {
  initialLayers: LayerObj[];
  initialNodes: Node[];
  initialOnions: OnionObj[];
};

const duration = 15;

const NewTimeline: React.FC<NewTimelineProps> = ({
  initialLayers,
  initialNodes,
  initialOnions,
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
      width,
    });
  const controlTools = useTools();
  const controlNodes = useNodes({
    zoom,
    leftPosition,
    initialNodes,
    controlLayer,
  });
  const conrolOnions = useOnion({
    zoom,
    leftPosition,
    controlLayer,
    initialOnions,
    controlTools,
  });
  const controlCursor = useCursor({ nodes: controlNodes.nodes });

  let sidebarClass = "minified";
  if (width > 640) {
    sidebarClass = "one";
  }
  if (width > 860) {
    sidebarClass = "two";
  }

  return (
    <div className={`timeline ${sidebarClass}`}>
      <Sidebar width={width} setWidth={setWidth}>
        <div className="tabs">
          <button onClick={controlCursor.startProgress}>Start</button>
          <button onClick={controlCursor.reset}>Reset</button>
          <button onClick={controlCursor.stopProgress}>Stop</button>
        </div>
        <Tools controlTools={controlTools} />
        <LayerLabels
          controlLayer={controlLayer}
          renderedLayers={renderedLayers}
        />
      </Sidebar>

      <div
        className="main-timeline"
        id="main-timeline"
        style={{ left: width + 20 }}
        onWheel={wheelHandler}
      >
        <TimeSplitter
          duration={duration}
          leftPosition={leftPosition}
          zoom={zoom}
        />
        <ProgressBar />
        <Cursor
          leftPosition={leftPosition}
          controlCursor={controlCursor}
          zoom={zoom}
        />
        <Layers
          layers={layers}
          renderedLayers={renderedLayers}
          nodes={controlNodes.nodes}
          leftPosition={leftPosition}
          zoom={zoom}
          timelineBarMouseDown={timelineBarMouseDown}
          controlNodes={controlNodes}
          controlOnions={conrolOnions}
        />
        {controlTools.activeTool === "onion" && (
          <OnionLab
            controlOnions={conrolOnions}
            controlLayer={controlLayer}
            leftPosition={leftPosition}
            zoom={zoom}
          />
        )}
      </div>
      <div className="backdrop-container" id="backdrop-container"></div>
    </div>
  );
};

export default NewTimeline;
