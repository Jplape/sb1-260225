import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isAdmin: boolean;
}

function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Jean Dupont',
      content: 'Maintenance de l\'IRM terminée. Rapport envoyé.',
      timestamp: '10:30',
      isAdmin: false
    },
    {
      id: '2',
      sender: 'Admin',
      content: 'Parfait, je valide le rapport. Nouvelle intervention disponible.',
      timestamp: '10:32',
      isAdmin: true
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'Admin',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAdmin: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-lg shadow">
      {/* Chat Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat avec les techniciens</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isAdmin ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.isAdmin
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm font-medium">{message.sender}</p>
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;