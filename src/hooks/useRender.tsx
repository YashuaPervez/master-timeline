import { UseNodeReturn } from "./useNodes";
import { UseLayerReturn } from "../components/NewTimeline/Layer/useLayer";
import { UseCursorReturn } from "./useCursor";

type UseRenderArgs = {
  zoom: number;
  duration: number;
  leftPosition: number;
  controlNodes: UseNodeReturn;
  controlLayer: UseLayerReturn;
  controlCursor: UseCursorReturn;
};

const useRender = ({
  zoom,
  duration,
  leftPosition,
  controlNodes,
  controlLayer,
  controlCursor,
}: UseRenderArgs) => {
  const { nodes, moveNodeStart } = controlNodes;
  const { renderedLayers } = controlLayer;
  const { progress } = controlCursor;

  const renderSecondGuides = () => {
    let seconds = 0;

    const guideArray: React.ReactNode[] = [];

    if (zoom >= 3.6) {
      return guideArray;
    }

    while (seconds < duration + 1) {
      guideArray.push(
        <div
          style={{
            position: "absolute",
            transform: `translate(${
              seconds * zoom * 100 + leftPosition
            }px, 32px)`,
            backgroundColor: "var(--lies)",
            height: 8,
            width: 1,
          }}
        >
          <div
            style={{
              transform: "translate(-50%, -18px)",
              fontSize: 12,
              width: 30,
              color: "#fff",
              textAlign: "center",
            }}
          >
            {`${seconds.toLocaleString("en", {
              minimumIntegerDigits: 2,
            })} s`}
          </div>
        </div>
      );
      seconds++;
    }

    return guideArray;
  };

  const renderDecimeterGuides = () => {
    let decimeters = 0;
    const totalDecimeters = duration * 10;

    const guideArray: React.ReactNode[] = [];

    if (zoom < 3.6) {
      return guideArray;
    }

    while (decimeters < totalDecimeters + 1) {
      guideArray.push(
        <div
          style={{
            position: "absolute",
            transform: `translate(${
              decimeters * zoom * 10 + leftPosition
            }px, 32px)`,
            backgroundColor: "var(--lies)",
            height: 8,
            width: 1,
          }}
        >
          <div
            style={{
              position: "absolute",
              transform: "translate(-50%, -18px)",
              fontSize: 12,
              width: 30,
              color: "#fff",
              textAlign: "center",
            }}
          >
            {decimeters / 10}s
          </div>
        </div>
      );
      decimeters++;
    }

    return guideArray;
  };

  const renderCursor = () => {
    return (
      <div
        style={{
          position: "absolute",
          top: 40,
          bottom: 0,
          left: progress * zoom * 100 + leftPosition,
          width: 1,
          backgroundColor: "var(--active)",
          zIndex: 5,
        }}
      >
        <div
          style={{
            position: "absolute",
            backgroundColor: "var(--active)",
            height: 8,
            width: 10,
            top: -7,
            left: "50%",
            transform: "translate(-50%)",
            clipPath: "polygon(100% 0, 0 0, 50% 100%)",
          }}
        ></div>
      </div>
    );
  };

  const renderNodes = () => {
    const nodesArray: React.ReactNode[] = [];
    nodes.forEach((node) => {
      if (renderedLayers.includes(node.layer)) {
        nodesArray.push(
          <div
            style={{
              position: "absolute",
              top: 82 + renderedLayers.indexOf(node.layer) * 21,
              left: zoom * node.position * 100 + leftPosition,
              transform: "translateX(-50%)",
              height: 16,
              width: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onMouseDown={(e) => moveNodeStart(e, node.id, node.position)}
          >
            <div
              style={{
                height: 6,
                width: 6,
                backgroundColor: "var(--active)",
                borderRadius: "50%",
              }}
            ></div>
          </div>
        );
      }
    });

    return nodesArray;
  };

  return {
    renderSecondGuides,
    renderDecimeterGuides,
    renderNodes,
    renderCursor,
  };
};

export default useRender;
