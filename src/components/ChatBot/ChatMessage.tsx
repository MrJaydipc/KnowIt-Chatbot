import React from 'react';
import { Bot, User, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language?: string;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message.text);
      utterance.lang = message.language || 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`chat-bubble-appear flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative group ${
        message.isUser 
          ? 'bg-chat-bubble-user text-chat-bubble-user-text' 
          : 'bg-chat-bubble-bot text-chat-bubble-bot-text'
      }`}>
        <div className="flex items-start gap-2">
          {!message.isUser && (
            <div className="flex-shrink-0 mt-1">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-3 h-3 text-primary-foreground" />
              </div>
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm leading-relaxed">{message.text}</p>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs ${
                message.isUser ? 'text-chat-bubble-user-text/70' : 'text-chat-bubble-bot-text/70'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              {!message.isUser && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handlePlayAudio}
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Volume2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
          {message.isUser && (
            <div className="flex-shrink-0 mt-1">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                <User className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};