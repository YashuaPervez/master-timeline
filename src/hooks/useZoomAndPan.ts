import React, { useState } from "react";

type UseZoomAndPanArgs = {
  initialZoom: number;
  zoomSpeed: number;
  // leftPosition: number;
  duration: number;
  panSpeed: number;
};

let registeredEvent: React.MouseEvent | null = null;
let registeredLeftPosition: number = 0;

const useZoomAndPan = ({
  initialZoom,
  zoomSpeed,
  // leftPosition,
  duration,
  panSpeed,
}: UseZoomAndPanArgs) => {
  const [zoom, setZoom] = useState<number>(initialZoom);
  const [leftPosition, setLeftPosition] = useState<number>(0);

  const mouseMove = (e: MouseEvent) => {
    if (!registeredEvent) return;

    const timelineBarWidth = duration * zoom * 100;

    //
    const scrollBarContainer = document.getElementById(
      "main-timeline"
    ) as HTMLDivElement;
    const { width: scrollBarContainerWidth } =
      scrollBarContainer.getBoundingClientRect();

    const canPan = timelineBarWidth > scrollBarContainerWidth;
    if (!canPan) {
      setLeftPosition(0);
      return;
    }

    // Get X distance moved
    const XDistanceMoved = (e.clientX - registeredEvent.clientX) * panSpeed;

    const newLeft = registeredLeftPosition + XDistanceMoved;
    const minLeft = (timelineBarWidth - scrollBarContainerWidth) * -1;

    if (newLeft <= 0 && newLeft >= minLeft) {
      setLeftPosition(newLeft);
    } else {
      if (newLeft > 0) {
        setLeftPosition(0);
      }
      if (newLeft < minLeft) {
        setLeftPosition(minLeft);
      }
    }
  };

  const wheelHandler: React.MouseEventHandler = (e: any) => {
    const scrollContainer = document.getElementById(
      "main-timeline"
    ) as HTMLDivElement;
    const {
      x: scX,
      y: scY,
      width: scW,
    } = scrollContainer.getBoundingClientRect();

    const positionInScrollContainer = {
      x: e.clientX - scX,
      y: e.clientY - scY,
    };

    let newZoom: number;
    let newLeftPosition: number;

    const movedUp = e.deltaY < 0;
    if (movedUp) {
      newZoom = zoom * (1 + zoomSpeed);
      newLeftPosition =
        (leftPosition - positionInScrollContainer.x) * (1 + zoomSpeed) +
        positionInScrollContainer.x;
    } else {
      newZoom = zoom * (1 - zoomSpeed);
      newLeftPosition =
        (leftPosition - positionInScrollContainer.x) * (1 - zoomSpeed) +
        positionInScrollContainer.x;
    }

    const minLeft = (duration * newZoom * 100 - scW) * -1;

    if (newLeftPosition > 0) {
      setLeftPosition(0);
    } else if (newLeftPosition < minLeft) {
      setLeftPosition(minLeft);
    } else {
      setLeftPosition(newLeftPosition);
    }
    setZoom(newZoom);
  };

  const timelineBarMouseDown: React.MouseEventHandler = (e) => {
    console.log("aaaa clicked");

    registeredEvent = e;
    registeredLeftPosition = leftPosition;

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  return {
    zoom,
    wheelHandler,
    leftPosition,
    timelineBarMouseDown,
  };
};

export default useZoomAndPan;
