export type OnionObj = {
  layer: string;
  time: number;
  duration: number;
};

type OnionProps = {
  onion: OnionObj;
  time: number;
  duration: number;
  name: string;
};

const Onion: React.FC<OnionProps> = ({ onion, time, duration, name }) => {
  return <div>{name}</div>;
};

export default Onion;
