import { UseNodeReturn } from "./useNodes";
import { UseLayerReturn } from "../components/NewTimeline/Layer/useLayer";
import { UseCursorReturn } from "./useCursor";

type UseRenderArgs = {
  zoom: number;
  duration: number;
  leftPosition: number;
  controlNodes: UseNodeReturn;
  controlLayer: UseLayerReturn;
  // controlCursor: UseCursorReturn;
};

const useRender = ({
  zoom,
  duration,
  leftPosition,
  controlNodes,
  controlLayer,
}: // controlCursor,
UseRenderArgs) => {
  const { nodes, moveNodeStart } = controlNodes;
  const { renderedLayers } = controlLayer;
  // const { progress } = controlCursor;

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
            left: seconds * zoom * 100 + leftPosition,
            backgroundColor: "var(--lies)",
            height: 8,
            width: 1,
            top: 32,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: "50%",
              transform: "translate(-50%)",
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
            left: decimeters * zoom * 10 + leftPosition,
            backgroundColor: "var(--lies)",
            height: 8,
            width: 1,
            top: 32,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: "50%",
              transform: "translate(-50%)",
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

  // const renderLayers = () => {
  //   const layerNodesArray: React.ReactNode[] = [];
  //   const _renderedLayers: string[] = [];

  //   const destructureLayerArray = (layers: Layer[]) => {
  //     layers.forEach((layer, i) => {
  //       const childToBeRendered = layer.open && layer.childrens?.length !== 0;

  //       // Push to main array
  //       layerNodesArray.push(
  //         <div
  //           style={{
  //             position: "absolute",
  //             top: 40 + 40 * layerNodesArray.length,
  //             left: 0,
  //             right: 0,
  //             height: "40px",
  //             borderBottom: childToBeRendered ? "" : "1px solid black",
  //             borderTop: i === 0 ? "1px solid black" : undefined,
  //           }}
  //           className="layer"
  //         ></div>
  //       );
  //       _renderedLayers.push(layer.id);

  //       // Operate on child
  //       if (childToBeRendered) {
  //         destructureLayerArray(layer.childrens || []);
  //       }
  //     });
  //   };

  //   destructureLayerArray(layers);
  //   renderedLayers = _renderedLayers;

  //   return layerNodesArray;
  // };

  // const renderLayersLabels = () => {
  //   const layerNodesArray: React.ReactNode[] = [];

  //   const destructureLayerArray = (layers: Layer[]) => {
  //     layers.forEach((layer, i) => {
  //       const hasChildren = layer.childrens && layer.childrens?.length !== 0
  //       const childToBeRendered = layer.open && hasChildren;

  //       // Push to main array
  //       layerNodesArray.push(
  //         <div
  //           style={{
  //             position: "absolute",
  //             top: 40 * layerNodesArray.length,
  //             left: 0,
  //             right: 0,
  //             height: 40,
  //             borderBottom: childToBeRendered ? "" : "1px solid black",
  //             borderTop: i === 0 ? "1px solid black" : undefined,
  //             padding: "0px 10px",
  //             display: "flex",
  //             alignItems: "center",
  //           }}
  //           className="layer"
  //         >
  //           <div
  //             style={{
  //               flex: 1,
  //             }}
  //           >
  //             {layer.id}
  //           </div>
  //           {hasChildren && (
  //             <div>
  //               <button onClick={() => toggleLayer(layer.id)}>{layer.open ? "Close" : "Open"}</button>
  //             </div>
  //           )}
  //         </div>
  //       );

  //       // Operate on child
  //       if (childToBeRendered) {
  //         destructureLayerArray(layer.childrens || []);
  //       }
  //     });
  //   };

  //   destructureLayerArray(layers);

  //   return layerNodesArray;
  // };

  // const renderCursor = () => {
  //   return (
  //     <div
  //       style={{
  //         position: "absolute",
  //         top: 0,
  //         bottom: 0,
  //         left: progress * zoom * 100,
  //         width: 1,
  //         backgroundColor: "purple",
  //       }}
  //     ></div>
  //   );
  // };

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
    // renderLayers,
    // renderLayersLabels,
    renderNodes,
    // renderCursor,
    // renderedLayers
  };
};

export default useRender;
