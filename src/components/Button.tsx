import RocketIco from '../../public/images/rocket.svg';

interface IButton {
  className?: string;
  height: string;
  width: string;
  type: 'button' | 'submit' | 'reset';
  isDisabled: boolean;
}

export function Button({
  className,
  height,
  width,
  type,
  isDisabled,
}: IButton) {
  return (
    <button
      className={`relative flex flex-col ${width} ${height} ${className} group`}
      type={type}
      disabled={isDisabled}
    >
      <div
        className={`flex items-center justify-center ${
          isDisabled
            ? `bg-gray-400`
            : `transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 bg-amber-400`
        } z-10 p-3 ${width} ${height}`}
      >
        <RocketIco
          className={`w-7 h-7 ${isDisabled ? `text-gray-600` : `text-black`}`}
        />
      </div>
      <div
        className={`absolute inset-0 bg-black border-4 border-black translate-x-1 translate-y-1 ${width} ${height}`}
      ></div>
    </button>
  );
}
