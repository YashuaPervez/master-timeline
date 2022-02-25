import { useState } from "react";

let registeredEvent: React.MouseEvent | null = null;
let registeredLeftPosition: number = 0;

type UsePanningArgs = {
  timelineBarWidth: number;
  panSpeed: number;
};

const usePanning = ({ timelineBarWidth, panSpeed }: UsePanningArgs) => {
  const [leftPosition, setLeftPosition] = useState<number>(0);

  const mouseMove = (e: MouseEvent) => {
    if (!registeredEvent) return;

    //
    const scrollBarContainer = document.getElementById(
      "scrollable-container"
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

  const timelineBarMouseDown: React.MouseEventHandler = (e) => {
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
    timelineBarMouseDown,
    leftPosition,
  };
};

export default usePanning;
