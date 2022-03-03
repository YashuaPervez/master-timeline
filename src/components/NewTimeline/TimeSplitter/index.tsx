// Styled
import { TimelineSplitterStyled } from "./styled";

// Components
import SecondSplitter from "./SecondSplitter";
import DeciSecondSplitter from "./DeciSecondSplitter";

type TimeSplitterProps = {
  leftPosition: number;
  zoom: number;
  duration: number;
};

const TimeSplitter: React.FC<TimeSplitterProps> = (props) => {
  const { zoom } = props;
  return (
    <TimelineSplitterStyled className="time-splitter">
      {zoom < 3.6 && <SecondSplitter {...props} />}
      {zoom > 3.6 && <DeciSecondSplitter {...props} />}
    </TimelineSplitterStyled>
  );
};

export default TimeSplitter;
