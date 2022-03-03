// Styled
import { SplitterItemStyled } from "./styled";

type SecondSplitterProps = {
  leftPosition: number;
  duration: number;
  zoom: number;
};

const SecondSplitter: React.FC<SecondSplitterProps> = ({
  duration,
  leftPosition,
  zoom,
}) => {
  const renderSecondSplitter = (): React.ReactNode[] => {
    let decimeters = 0;
    const totalDecimeters = duration * 10;

    const splitterArray: React.ReactNode[] = [];

    while (decimeters < totalDecimeters + 1) {
      const translateX = decimeters * zoom * 10 + leftPosition;

      const secondString = `${decimeters / 10}s`;

      splitterArray.push(
        <SplitterItemStyled
          style={{
            transform: `translate(${translateX + 15}px, 32px)`,
          }}
          className="time-splitter-item time-splitter-item--decisecond"
        >
          <div className="text">{secondString}</div>
        </SplitterItemStyled>
      );
      decimeters++;
    }

    return splitterArray;
  };

  return <>{renderSecondSplitter()}</>;
};

export default SecondSplitter;
