import React, { useEffect, useRef, useState } from 'react';

interface Message {
  text: string;
  fromSelf: boolean;
}

const App: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      alert('WebSocket is not connected.');
      return;
    }

    const message = inputRef.current?.value.trim();
    if (message) {
      socket.send(message);
      setMessages((prev) => [...prev, { text: message, fromSelf: true }]);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    ws.onmessage = (event: MessageEvent) => {
      setMessages((prev) => [...prev, { text: event.data, fromSelf: false }]);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-md bg-[#111] border border-gray-800 rounded-xl p-6 shadow-lg space-y-4">
        <h1 className="text-xl font-semibold text-center text-gray-200 tracking-widest">WebSocket Chat</h1>

        <div className="h-64 overflow-y-auto flex flex-col space-y-2 bg-[#1a1a1a] p-3 rounded border border-gray-700">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs px-3 py-2 text-sm rounded-lg ${
                msg.fromSelf
                  ? 'bg-blue-600 text-white self-end'
                  : 'bg-gray-700 text-gray-200 self-start'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter message..."
            className="flex-grow px-3 py-2 bg-[#222] border border-gray-600 rounded outline-none text-white placeholder-gray-500"
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
