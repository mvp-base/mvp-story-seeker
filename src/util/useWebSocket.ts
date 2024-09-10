import { useState, useEffect, useRef, useCallback } from 'react';
import { createWebSocket } from './webSocket';

interface UseWebSocketResult<T> {
  messages: T[];
  sendMessage: (message: T) => Promise<T>;
  isConnected: boolean;
}

export function useWebSocket<T>(url: string): UseWebSocketResult<T> {
  const [messages, setMessages] = useState<T[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const webSocketRef = useRef<WebSocket | null>(null);
  const pendingRequests = useRef<Map<string, (response: T) => void>>(new Map());

  const generateRequestId = useCallback(() => {
    return Math.random().toString(36).substring(2, 15);
  }, []);

  const handleMessage = useCallback((data: string) => {
    try {
      const parsedData = JSON.parse(data);
      setMessages((prevMessages) => [...prevMessages, parsedData as T]);

      const requestId = parsedData.requestId;
      if (requestId && pendingRequests.current.has(requestId)) {
        const resolve = pendingRequests.current.get(requestId);
        if (resolve) {
          resolve(parsedData);
          pendingRequests.current.delete(requestId);
        }
      }
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

  const sendMessage = useCallback(
    (message: T): Promise<T> => {
      if (
        webSocketRef.current &&
        webSocketRef.current.readyState === WebSocket.OPEN
      ) {
        return new Promise((resolve, reject) => {
          const requestId = generateRequestId();
          const messageWithId = { ...message, requestId };

          pendingRequests.current.set(requestId, resolve);
          webSocketRef.current!.send(JSON.stringify(messageWithId));

          setTimeout(() => {
            if (pendingRequests.current.has(requestId)) {
              pendingRequests.current.delete(requestId);
              reject(new Error('Request timed out.'));
            }
          }, 30000);
        });
      } else {
        return Promise.reject(new Error('WebSocket is not open.'));
      }
    },
    [generateRequestId]
  );

  return {
    messages,
    sendMessage,
    isConnected,
  };
}
