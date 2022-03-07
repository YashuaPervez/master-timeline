// Styled
import { OnionStyled } from "./styled";

export type OnionObj = {
  id: string;
  layer: string;
  time: number;
  duration: number;
};

type OnionProps = {
  onion: OnionObj;
  leftPosition: number;
  zoom: number;
};

const Onion: React.FC<OnionProps> = ({ onion, zoom, leftPosition }) => {
  return (
    <OnionStyled
      style={{
        width: onion.duration * zoom * 100,
        transform: `translateX(${
          onion.time * zoom * 100 + leftPosition + 10
        }px)`,
      }}
    >
      {onion.id}
    </OnionStyled>
  );
};

export default Onion;
