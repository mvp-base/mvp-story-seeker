import React, { useState } from 'react';
import { useWebSocket } from './util/useWebSocket';

import bg from './assets/bg.svg';

interface ChatMessage {
  type: 'REQUEST_GENERATE_SUGGESTION';
  query: string;
  requestId?: string;
}

export default function App() {
  const { messages, sendMessage, isConnected } = useWebSocket<ChatMessage>(
    'ws://localhost:8080'
  );
  const [inputMessage, setInputMessage] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputMessage.trim()) {
      try {
        const response = await sendMessage({
          type: 'REQUEST_GENERATE_SUGGESTION',
          query: inputMessage,
        });
        console.log(response);
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setInputMessage('');
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500">
      <img
        src={bg}
        alt='Background design'
        className="absolute inset-0 object-cover"
      />
      {/* <h1>WebSocket Chat</h1>
      <div>
        <h2>Status: {isConnected ? 'Connected' : 'Disconnected'}</h2>
      </div>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{`${msg.query}`}</li>
          ))}
        </ul>
        {responseMessage && <p>Response: {responseMessage}</p>}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form> */}
    </div>
  );
}
