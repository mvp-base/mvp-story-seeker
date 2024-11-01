interface INotification {
  message: string;
  type: 'error' | 'info' | 'warning';
}

export function Notification({ message, type }: INotification) {
  let colorStyle;

  switch (type) {
    case 'error':
      colorStyle = 'bg-rose-500 border-rose-500';
      break;
    case 'warning':
      colorStyle = 'bg-yellow-400 border-yellow-400';
      break;
    case 'info':
    default:
      colorStyle = 'bg-cyan-800 border-cyan-800';
      break;
  }

  return (
    <div className="flex flex-col">
      <div
        className={`flex absolute inset-1 items-center justify-center border-4 z-10 ${colorStyle}`}
      >
        {message}
      </div>
      <div className="absolute inset-1 bg-black border-4 border-black translate-x-1 translate-y-1" />
    </div>
  );
}
