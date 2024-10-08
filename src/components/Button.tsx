import RocketIco from '../../public/images/rocket.svg';

interface IButton {
  className?: string;
  height: string;
  width: string;
  type: 'button' | 'submit' | 'reset';
}

export function Button({ className, height, width, type }: IButton) {
  return (
    <button
      className={`relative flex flex-col ${width} ${height} ${className} group`}
      type={type}
    >
      <div
        className={`flex items-center justify-center bg-amber-400 z-10 p-3 ${width} ${height} transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5`}
      >
        <RocketIco className="w-7 h-7" />
      </div>
      <div
        className={`absolute inset-0 bg-black border-4 border-black translate-x-1 translate-y-1 ${width} ${height}`}
      ></div>
    </button>
  );
}
