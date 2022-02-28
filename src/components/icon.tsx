const sizeFactor = 24;

export type Icon = {
  size?: number;
  color?: string;
};

export const DownAngle: React.FC<Icon> = ({ size = 1, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizeFactor * size}
      height={sizeFactor * size}
      fill="none"
      viewBox="0 0 8 6"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M.707.828L0 1.536l2.828 2.828.708.707.707-.707L7.07 1.536 6.364.828 3.536 3.657.707.828z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
