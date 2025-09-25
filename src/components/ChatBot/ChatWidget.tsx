import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Globe, X, MessageCircle, Volume2, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChatMessage } from './ChatMessage';
import { useToast } from '@/hooks/use-toast';
import { findAnswer } from '@/data/knowledgeBase';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language?: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m KnowIt, your AI student support assistant. I can help you with fees, timetables, scholarships, exams, and more. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString() + '_user',
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
      language: selectedLanguage,
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Check knowledge base for predefined answers
    const predefinedAnswer = findAnswer(currentInput, selectedLanguage);
    
    setTimeout(() => {
      let responseText = '';
      
      if (predefinedAnswer) {
        responseText = predefinedAnswer;
      } else {
        // Fallback responses in selected language
        const fallbackResponses: {[key: string]: string[]} = {
          en: [
            'I understand your query. Let me help you with that information.',
            'Based on your question, here\'s what I found in our knowledge base.',
            'That\'s a great question! Here\'s the information you need.',
            'I can help you with that. Here are the details you\'re looking for.',
            'For specific queries, please contact the respective department or visit the college office.',
          ],
          hi: [
            'मैं आपके प्रश्न को समझता हूं। मैं आपकी इस जानकारी के साथ सहायता करता हूं।',
            'आपके प्रश्न के आधार पर, यहां वह जानकारी है जो मैंने हमारे ज्ञान आधार में पाई।',
            'यह एक बेहतरीन प्रश्न है! यहां आपको आवश्यक जानकारी है।',
            'मैं इसमें आपकी सहायता कर सकता हूं। यहां वे विवरण हैं जिन्हें आप खोज रहे हैं।',
            'विशिष्ट प्रश्नों के लिए, कृपया संबंधित विभाग से संपर्क करें या कॉलेज कार्यालय जाएं।',
          ],
          mr: [
            'मी तुमचा प्रश्न समजतो. मी तुम्हाला त्या माहितीसह मदत करतो।',
            'तुमच्या प्रश्नाच्या आधारे, आमच्या ज्ञान आधारात मला मिळालेली माहिती येथे आहे।',
            'हा एक उत्तम प्रश्न आहे! तुम्हाला आवश्यक असलेली माहिती येथे आहे।',
            'मी त्यामध्ये तुमची मदत करू शकतो. तुम्ही शोधत असलेले तपशील येथे आहेत।',
            'विशिष्ट प्रश्नांसाठी, कृपया संबंधित विभागाशी संपर्क साधा किंवा महाविद्यालयीन कार्यालयात भेट द्या।',
          ],
          ta: [
            'உங்கள் கேள்வியை நான் புரிந்துகொள்கிறேன். அந்த தகவலுடன் உங்களுக்கு உதவுகிறேன்.',
            'உங்கள் கேள்வியின் அடிப்படையில், எங்கள் அறிவுத் தளத்தில் நான் கண்டறிந்த தகவல் இங்கே.',
            'அது ஒரு சிறந்த கேள்வி! உங்களுக்குத் தேவையான தகவல் இங்கே.',
            'அதில் நான் உங்களுக்கு உதவ முடியும். நீங்கள் தேடும் விவரங்கள் இங்கே.',
            'குறிப்பிட்ட கேள்விகளுக்கு, தயவுசெய்து சம்பந்தப்பட்ட துறையைத் தொடர்பு கொள்ளுங்கள் அல்லது கல்லூரி அலுவலகத்திற்குச் செல்லுங்கள்.',
          ],
          te: [
            'మీ ప్రశ్నను నేను అర్థం చేసుకుంటున్నాను. ఆ సమాచారంతో మీకు సహాయం చేస్తున్నాను.',
            'మీ ప్రశ్న ఆధారంగా, మా విజ్ఞాన స్థావరంలో నేను కనుగొన్న సమాచారం ఇక్కడ ఉంది.',
            'అది ఒక గొప్ప ప్రশ్న! మీకు అవసరమైన సమాచారం ఇక్కడ ఉంది.',
            'దానిలో నేను మీకు సహాయం చేయగలను. మీరు వెతుకుతున్న వివరాలు ఇక్కడ ఉన్నాయి.',
            'నిర్దిష్ట ప్రశ్నల కోసం, దయచేసి సంబంధిత శాఖను సంప్రదించండి లేదా కళాశాల కార్యాలయాన్ని సందర్శించండి.',
          ],
          raj: [
            'म्हारै आपका सवाल समझ में आया। म्हैं आपकी इस जानकारी के साथ मदद करूंगो।',
            'आपके सवाल के हिसाब से, म्हारे ज्ञान के आधार में जो जानकारी मिली वो यहां है।',
            'यो एक बढिया सवाल है! आपको जरूरी जानकारी यहां है।',
            'इसमें म्हैं आपकी मदद कर सकूं हूं। आप जो ढूंढ रहे हो वो विवरण यहां है।',
            'खास सवालों के लिए, कृपया संबंधित विभाग से संपर्क करो या कॉलेज ऑफिस जाओ।',
          ],
          gu: [
            'હું તમારો પ્રશ્ન સમજું છું. હું તમને તે માહિતી સાથે મદદ કરું છું.',
            'તમારા પ્રશ્નના આધારે, અમારા જ્ઞાન આધારમાં મને જે માહિતી મળી તે અહીં છે.',
            'તે એક ઉત્તમ પ્રશ્ન છે! તમને જરૂરી માહિતી અહીં છે.',
            'હું તેમાં તમારી મદદ કરી શકું છું. તમે જે વિગતો શોધી રહ્યા છો તે અહીં છે.',
            'વિશિષ્ટ પ્રશ્નો માટે, કૃપા કરીને સંબંધિત વિભાગનો સંપર્ક કરો અથવા કૉલેજ ઓફિસની મુલાકાત લો.',
          ]
        };
        
        const responses = fallbackResponses[selectedLanguage] || fallbackResponses['en'];
        responseText = responses[Math.floor(Math.random() * responses.length)];
      }

      const aiMessage: Message = {
        id: Date.now().toString() + '_ai',
        text: responseText,
        isUser: false,
        timestamp: new Date(),
        language: selectedLanguage,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Voice recording stopped",
        description: "Processing your message...",
      });
    } else {
      setIsRecording(true);
      toast({
        title: "Voice recording started",
        description: "Speak now, I'm listening...",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'raj', name: 'राजस्थानी (Rajasthani)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  ];

  if (!isOpen) {
    return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            variant="gradient-primary"
            className="floating-widget rounded-full h-14 w-14 md:h-16 md:w-16 shadow-glow"
          >
          <MessageCircle className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      <Card className="w-[90vw] max-w-md h-[80vh] max-h-[600px] flex flex-col shadow-large border-0 bg-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-primary">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground text-sm">KnowIt AI</h3>
              <p className="text-primary-foreground/80 text-xs">Online now</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-10 h-8 border-primary-foreground/20 bg-transparent">
                <Globe className="h-4 w-4 text-primary-foreground" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <span className="text-sm">−</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-chat-bubble-bot px-4 py-2 rounded-lg max-w-xs">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full chat-typing"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full chat-typing" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full chat-typing" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-background">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="pr-20 bg-input border-border"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleVoiceToggle}
                      className={`h-8 w-8 p-0 ${isRecording ? 'voice-recording' : ''}`}
                    >
                      {isRecording ? (
                        <MicOff className="h-4 w-4 text-destructive" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  variant="gradient-primary"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};