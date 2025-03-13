import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, StopCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { addSuggestion } from '../../state/chatbotSlice';
import type { RootState } from '../../state/store';

interface ChatbotAssistantProps {
  onClose: () => void;
  onSuggestionSelect: (suggestion: string) => void;
}

interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

function ChatbotAssistant({ onClose, onSuggestionSelect }: ChatbotAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Bonjour ! Je suis votre assistant pour la rédaction des rapports. Comment puis-je vous aider ?",
      type: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const suggestions = useSelector((state: RootState) => state.chatbot.suggestions);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      // Simuler une réponse du chatbot (à remplacer par l'appel API réel)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "D'après les informations fournies, je suggère d'inclure les points suivants dans votre rapport...",
        type: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      
      // Ajouter une suggestion au state global
      dispatch(addSuggestion({
        id: Date.now().toString(),
        text: "Maintenance préventive effectuée selon le protocole standard. Tous les paramètres sont dans les normes.",
        timestamp: new Date()
      }));
    } catch (error) {
      console.error('Erreur lors de la communication avec le chatbot:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceInput = () => {
    if (!isRecording) {
      // Démarrer l'enregistrement
      setIsRecording(true);
      // TODO: Implémenter la reconnaissance vocale
    } else {
      // Arrêter l'enregistrement
      setIsRecording(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">Assistant Rédaction</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 rounded-lg p-3">
              <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Suggestions:</p>
          <div className="space-y-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => onSuggestionSelect(suggestion.text)}
                className="w-full text-left text-sm p-2 rounded hover:bg-gray-100 transition-colors"
              >
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleVoiceInput}
            className={`p-2 rounded-full ${
              isRecording
                ? 'bg-red-100 text-red-500'
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            {isRecording ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Écrivez votre message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            className={`p-2 rounded-full ${
              input.trim() && !isProcessing
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ChatbotAssistant;