import { useState, useEffect, useRef, useCallback } from 'react';

interface UseWebSocketResult {
  messages: string[];
  sendMessage: (message: string) => void;
  isConnected: boolean;
}

export const useWebSocket = (url: string): UseWebSocketResult => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const webSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    webSocketRef.current = new WebSocket(url);

    webSocketRef.current.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket connection established.');
    };

    webSocketRef.current.onmessage = (event) => {
      const receivedMessage = event.data;
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      console.log('Received:', receivedMessage);
    };

    webSocketRef.current.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket connection closed.');
    };

    webSocketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, [url]);

  const sendMessage = useCallback((message: string) => {
    if (
      webSocketRef.current &&
      webSocketRef.current.readyState === WebSocket.OPEN
    ) {
      webSocketRef.current.send(message);
      console.log('Sent:', message);
    } else {
      console.error('WebSocket is not open. Unable to send message:', message);
    }
  }, []);

  return {
    messages,
    sendMessage,
    isConnected,
  };
};
