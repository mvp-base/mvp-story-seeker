import { useState, useEffect, useRef, useCallback } from 'react';
import { createWebSocket } from './webSocket';

interface UseWebSocketResult<T> {
  messages: T[];
  sendMessage: (message: T) => void;
  isConnected: boolean;
}

export function useWebSocket<T>(url: string): UseWebSocketResult<T> {
  const [messages, setMessages] = useState<T[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const webSocketRef = useRef<WebSocket | null>(null);

  const handleMessage = useCallback((data: string) => {
    try {
      const parsedData = JSON.parse(data);
      setMessages((prevMessages) => [...prevMessages, parsedData as T]);
    } catch (error) {
      console.error('Error parsing message data:', error);
    }
  }, []);

  const handleError = useCallback((error: Event) => {
    console.error('WebSocket error:', error);
  }, []);

  const handleClose = useCallback(() => {
    setIsConnected(false);
    console.log('WebSocket connection closed.');
  }, []);

  // const reconnect = useCallback(() => {
  //   setReconnectAttempts((prevAttempts) => prevAttempts + 1);
  //   const delay = Math.min(30000, Math.pow(2, reconnectAttempts) * 1000);

  //   setTimeout(() => {
  //     if (webSocketRef.current) {
  //       webSocketRef.current.close();
  //     }
  //     webSocketRef.current = createWebSocket(
  //       url,
  //       handleMessage,
  //       handleError,
  //       handleClose
  //     );
  //   }, delay);
  // }, [url, reconnectAttempts, handleMessage, handleError, handleClose]);

  useEffect(() => {
    webSocketRef.current = createWebSocket(
      url,
      handleMessage,
      handleError,
      handleClose
    );

    if (webSocketRef.current) {
      webSocketRef.current.onopen = () => {
        setIsConnected(true);
        console.log('WebSocket connection established.');
      };

      return () => {
        if (webSocketRef.current) {
          webSocketRef.current.close();
        }
      };
    }
  }, [url, handleMessage, handleError, handleClose]);

  const sendMessage = useCallback((message: T) => {
    if (
      webSocketRef.current &&
      webSocketRef.current.readyState === WebSocket.OPEN
    ) {
      webSocketRef.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Unable to send message:', message);
    }
  }, []);

  return {
    messages,
    sendMessage,
    isConnected,
  };
}
