import { useWebSocket } from './util/useWebSocket';
import { useState } from 'react';

interface ChatMessage {
  type: 'REQUEST_GENERATE_SUGGESTION';
  query: string;
}

export default function App() {
  // Initialize the WebSocket hook with the URL of your WebSocket server
  const { messages, sendMessage, isConnected } = useWebSocket<ChatMessage>(
    'ws://localhost:8080'
  );

  // Local state for managing message input
  const [inputMessage, setInputMessage] = useState<string>('');

  // Handle sending a message when the user submits the form
  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputMessage.trim()) {
      sendMessage({ type: 'REQUEST_GENERATE_SUGGESTION', query: inputMessage });
      setInputMessage('');
    }
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <div>
        <h2>Status: {isConnected ? 'Connected' : 'Disconnected'}</h2>
      </div>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{`${msg.query}`}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
