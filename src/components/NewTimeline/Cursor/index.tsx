// Styled
import { UseCursorReturn } from "../../../hooks/useCursor";
import { CursorStyled } from "./styled";

type CursorProps = {
  leftPosition: number;
  zoom: number;
  controlCursor: UseCursorReturn;
};

const Cursor: React.FC<CursorProps> = ({
  leftPosition,
  zoom,
  controlCursor,
}) => { 
  return (
    <CursorStyled>
      <div
        className="line"
        style={{
          transform: `translateX(${
            zoom * 100 * controlCursor.progress + leftPosition
          }px)`,
        }}
      ></div>
    </CursorStyled>
  );
};

export default Cursor;
