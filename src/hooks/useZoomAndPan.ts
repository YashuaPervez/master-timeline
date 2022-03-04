import React, { useEffect, useState } from "react";

type UseZoomAndPanArgs = {
  initialZoom: number;
  zoomSpeed: number;
  // leftPosition: number;
  duration: number;
  panSpeed: number;
  width: number;
};

let registeredEvent: React.MouseEvent | null = null;
let registeredLeftPosition: number = 0;

const useZoomAndPan = ({
  initialZoom,
  zoomSpeed,
  // leftPosition,
  duration,
  panSpeed,
  width,
}: UseZoomAndPanArgs) => {
  const [zoom, setZoom] = useState<number>(initialZoom);
  const [leftPosition, setLeftPosition] = useState<number>(0);

  useEffect(() => {
    const scrollContainer = document.getElementById(
      "main-timeline"
    ) as HTMLDivElement;
    const { width: scW } = scrollContainer.getBoundingClientRect();

    const minZoom = scW / duration / 100;
    if (zoom <= minZoom) {
      setZoom(minZoom);
      setLeftPosition(0);
    }
  }, [width]);

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

    const minZoom = scW / duration / 100;

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

    const adjustLeftPosition = (newLeftPosition: number, minLeft: number) => {
      if (newLeftPosition > 0) {
        setLeftPosition(0);
      } else if (newLeftPosition < minLeft) {
        setLeftPosition(minLeft);
      } else {
        setLeftPosition(newLeftPosition);
      }
    };

    if (newZoom > minZoom && newZoom < 12) {
      adjustLeftPosition(newLeftPosition, minLeft);
      setZoom(newZoom);
    } else if (newZoom <= minZoom) {
      adjustLeftPosition(newLeftPosition, minLeft);
      setZoom(minZoom);
    }
  };

  const timelineBarMouseDown: React.MouseEventHandler = (e) => {
    registeredEvent = e;
    registeredLeftPosition = leftPosition;

    const node: any = e.target;
    const interactables = ["node", "onion"];
    let isInteractable = false;
    interactables.forEach((i) => {
      if (node.className.includes(i)) {
        isInteractable = true;
      }
    });
    if (isInteractable) {
      return;
    }

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
