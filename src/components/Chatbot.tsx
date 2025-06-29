import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Gemini API call utility
interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[]
    }
  }[]
}

async function fetchGeminiResponse(prompt: string, history: Message[] = []): Promise<string> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBPLpHtgWkZsra0cRhYUelFZperfEQRIpk";
    // Use Gemini 2.5 Lite model
    const model = "gemini-1.5-flash-latest";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const instructions =
      "You are Dermora, a friendly skincare assistant.\n" +
      "- You ONLY answer questions about skincare.\n" +
      "- You REFUSE to answer any questions unrelated to skincare. Instead, you must say: 'Sorry, I can only answer skincare-related questions. Please ask me about skincare!'\n" +
      "- You answer skincare questions clearly and helpfully.\n" +
      "- You PROVIDE solutions and ASK MINIMUM questions.\n" +
      "- If the user's question is not about skincare, do NOT answer it.\n";
    // Build conversation history (last 6 messages)
    const historyToSend = history.slice(-6).map(msg => `${msg.isBot ? "Dermora" : "User"}: ${msg.text}`).join("\n");
    const fullPrompt = `${instructions}\n\nConversation so far:\n${historyToSend}\nUser: ${prompt}`;

    const response = await axios.post<GeminiResponse>(
      url,
      {
        contents: [{ parts: [{ text: fullPrompt }] }]
      }
    );
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't find an answer.";
  } catch (error: any) {
    // Log error for debugging
    console.error('Gemini API error:', error?.response?.data || error.message || error);
    if (error?.response?.data?.error?.message) {
      return `Gemini API error: ${error.response.data.error.message}`;
    }
    return "Sorry, there was an error reaching the assistant.";
  }
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi gorgeous! 💕 I'm Dermora AI, here to help you with your skincare journey. What can I assist you with today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const quickReplies = [
    "How often should I use retinol?",
    "What's the best order for my routine?",
    "Help with sensitive skin",
    "SPF recommendations"
  ];

  const botResponses: { [key: string]: string } = {
    "retinol": "Start with retinol 2-3 times per week and gradually increase! Always use it at night and follow with moisturizer. Don't forget SPF the next morning! ✨",
    "routine": "Perfect routine order: Cleanser → Toner → Serum → Moisturizer → SPF (AM) or Night Cream (PM). Remember: thinnest to thickest consistency! 💫",
    "sensitive": "For sensitive skin, look for fragrance-free products with gentle ingredients like ceramides, niacinamide, and hyaluronic acid. Always patch test first! 🌸",
    "spf": "Choose SPF 30+ for daily use! Mineral sunscreens (zinc oxide, titanium dioxide) are great for sensitive skin. Reapply every 2 hours! ☀️",
    "default": "That's a great question! For personalized advice, I'd recommend consulting with a dermatologist. In the meantime, keep up with your consistent routine - you're doing amazing! 💪✨"
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    const lowerInput = inputValue.toLowerCase();
    let response = botResponses.default;
    let matched = false;
    for (const [key, value] of Object.entries(botResponses)) {
      if (lowerInput.includes(key) && key !== 'default') {
        response = value;
        matched = true;
        break;
      }
    }
    if (!matched) {
      response = await fetchGeminiResponse(inputValue, messages);
    }
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
    }, matched ? 1000 : 0);
    setInputValue('');
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    handleSend();
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </motion.div>
          </AnimatePresence>
        </Button>
        
        {/* Idle animation */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-pink-300 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 h-96 z-40"
          >
            <Card className="h-full bg-white/95 backdrop-blur-sm border-pink-200 shadow-2xl flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-pink-100 bg-gradient-to-r from-pink-50 to-pink-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Dermora Assistant</h3>
                    <p className="text-xs text-gray-600">Always here to help! 💕</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.isBot
                          ? 'bg-pink-100 text-gray-800'
                          : 'bg-gradient-to-r from-pink-400 to-pink-500 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[80%] p-3 rounded-2xl bg-pink-100 text-gray-800 opacity-70">
                      <p className="text-sm animate-pulse">Thinking...</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Quick Replies */}
              {messages.length === 1 && (
                <div className="p-3 border-t border-pink-100">
                  <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-1">
                    {quickReplies.map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs h-6 px-2 border-pink-200 text-pink-600 hover:bg-pink-50"
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-pink-100">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask me anything..."
                    className="flex-1 border-pink-200 focus:border-pink-400"
                  />
                  <Button
                    onClick={handleSend}
                    size="sm"
                    className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
