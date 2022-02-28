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

export const Eye: React.FC<Icon> = ({ size = 1, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="12"
      fill="none"
      viewBox="0 0 14 12"
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.108 6.035a2.108 2.108 0 11-4.216 0 2.108 2.108 0 014.216 0z"
        clipRule="evenodd"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.999 10.903c2.538 0 4.86-1.825 6.168-4.868-1.308-3.042-3.63-4.868-6.168-4.868H7c-2.538 0-4.86 1.826-6.168 4.868 1.308 3.043 3.63 4.868 6.168 4.868H7z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
