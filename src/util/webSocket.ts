export function createWebSocket(
  url: string,
  onMessage: (data: any) => void,
  onError: (error: Event) => void,
  onClose: () => void
): WebSocket {
  const socket = new WebSocket(url);

  socket.onopen = () => {
    console.log(`Websocket connection established.`);
  };

  socket.onmessage = (event) => {
    onMessage(event.data);
  };

  socket.onerror = (error) => {
    onError(error);
  };

  socket.onclose = () => {
    onClose();
    console.log('WebSocket connection closed.');
  };

  return socket;
}
