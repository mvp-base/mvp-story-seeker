export function logger(message: string) {
  const timeStamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const stack = new Error().stack;
  const callerLine = stack?.split('\n')[2]?.trim();

  console.log(`${timeStamp} - ${callerLine} - ${message}`);
}
