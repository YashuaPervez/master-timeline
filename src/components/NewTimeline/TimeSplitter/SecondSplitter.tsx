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
    let seconds = 0;
    const splitterArray: React.ReactNode[] = [];

    while (seconds < duration + 1) {
      const translateX = seconds * zoom * 100 + leftPosition;

      const secondString = `${seconds.toLocaleString("en", {
        minimumIntegerDigits: 2,
      })}s`;

      splitterArray.push(
        <SplitterItemStyled
          style={{
            transform: `translate(${translateX + 15}px, 32px)`,
          }}
          className="time-splitter-item time-splitter-item--second"
        >
          <div className="text">{secondString}</div>
        </SplitterItemStyled>
      );
      seconds++;
    }

    return splitterArray;
  };

  return <>{renderSecondSplitter()}</>;
};

export default SecondSplitter;
