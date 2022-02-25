import React, { useState } from "react";
import { UseNodeReturn } from "./useNodes";
import { Layer, UseLayersReturn } from "./useLayers";
import { UseCursorReturn } from "./useCursor";

type UseRenderArgs = {
  zoom: number;
  duration: number;
  leftPosition: number;
  controlNodes: UseNodeReturn;
  controlLayers: UseLayersReturn;
  controlCursor: UseCursorReturn;
};

let renderedLayers: string[] = [];

const useRender = ({
  zoom,
  duration,
  leftPosition,
  controlNodes,
  controlLayers,
  controlCursor,
}: UseRenderArgs) => {
  const { nodes, moveNodeStart } = controlNodes;
  const { layers } = controlLayers;
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
            left: seconds * zoom * 100,
            backgroundColor: "black",
            height: "100%",
            width: 1,
          }}
        >
          {seconds}s
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
            left: decimeters * zoom * 10,
            backgroundColor: "black",
            height: "100%",
            width: 1,
          }}
        >
          {decimeters / 10}s
        </div>
      );
      decimeters++;
    }

    return guideArray;
  };

  const renderLayers = () => {
    const layerNodesArray: React.ReactNode[] = [];
    const _renderedLayers: string[] = [];

    const destructureLayerArray = (layers: Layer[]) => {
      layers.forEach((layer) => {
        // Push to main array
        layerNodesArray.push(
          <div
            style={{
              position: "absolute",
              top: 40 + 40 * layerNodesArray.length,
              left: 0,
              right: 0,
              lineHeight: "40px",
              borderBottom: "1px solid black",
              padding: "0px 8px",
            }}
            className="layer"
          >
            {layer.id}
          </div>
        );
        _renderedLayers.push(layer.id);

        // Operate on child
        const childToBeRendered = layer.open && layer.childrens?.length !== 0;
        if (childToBeRendered) {
          destructureLayerArray(layer.childrens || []);
        }
      });
    };

    destructureLayerArray(layers);
    renderedLayers = _renderedLayers;

    return layerNodesArray;
  };

  const renderCursor = () => {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: progress * zoom * 100,
          width: 1,
          backgroundColor: "purple",
        }}
      ></div>
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
              top: 45 + renderedLayers.indexOf(node.layer) * 40,
              left: zoom * node.position * 100 + leftPosition,
              transform: "translateX(-50%)",
            }}
          >
            <div
              style={{
                height: 30,
                width: 30,
                backgroundColor: "purple",
                borderRadius: "50%",
              }}
              onMouseDown={(e) => moveNodeStart(e, node.id, node.position)}
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
    renderLayers,
    renderNodes,
    renderCursor,
  };
};

export default useRender;
