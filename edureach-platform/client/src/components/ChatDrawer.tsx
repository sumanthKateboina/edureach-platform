import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../services/chat.service.ts";
import { X, Send, Sparkles, User, Loader2, CornerDownLeft } from "lucide-react";
import { toast } from "react-hot-toast";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

interface ChatDrawerProps {
  open: boolean;
  onClose: () => void;
}

const QUICK_QUESTIONS = [
  "What is the tuition fee for B.Tech?",
  "What are B.Tech CSE placements like?",
  "How can I apply for management quota?",
  "Are there sports scholarships?",
  "Who is Dr. Vikram Patel?",
];

export default function ChatDrawer({ open, onClose }: ChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! I'm the EduReach AI Assistant. I have full knowledge of our courses, fees, scholarships, hostels, and fests. Ask me anything!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  if (!open) return null;

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const data = await sendMessage(textToSend.trim());
      const botMsg: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: data.message || "I couldn't process that response.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error("Chat message dispatch failed:", err);
      const errorMsg: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: "I encountered an error connecting to the AI services. Please verify the server is running.",
      };
      setMessages((prev) => [...prev, errorMsg]);
      toast.error("Failed to connect to the bot.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 z-40 bg-gray-950/40 backdrop-blur-[2px] animate-in fade-in duration-200"
      />

      {/* Drawer Body */}
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-white shadow-2xl border-l border-gray-100 flex flex-col justify-between animate-in slide-in-from-right duration-300 font-body">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-cream">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-maroon text-white shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-gray-900 leading-none">
                EduReach AI Guide
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Online · RAG Search</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message Container */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-cream/10">
          
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div className={`h-8 w-8 rounded-full border flex items-center justify-center shrink-0 ${
                msg.sender === "bot" 
                  ? "bg-maroon/10 border-maroon/20 text-maroon" 
                  : "bg-gray-100 border-gray-200 text-gray-600"
              }`}>
                {msg.sender === "bot" ? <Sparkles className="h-4.5 w-4.5" /> : <User className="h-4.5 w-4.5" />}
              </div>

              {/* Text Bubble */}
              <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[75%] shadow-sm ${
                msg.sender === "bot"
                  ? "bg-white border border-gray-100 text-gray-800"
                  : "bg-maroon text-white"
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
          ))}

          {/* Loader bubble */}
          {loading && (
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full border bg-maroon/10 border-maroon/20 text-maroon flex items-center justify-center shrink-0">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <div className="rounded-2xl px-4 py-3 bg-white border border-gray-100 shadow-sm flex items-center gap-2">
                <Loader2 className="h-4.5 w-4.5 text-maroon animate-spin" />
                <span className="text-xs font-semibold text-gray-400">Ava is typing...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick select Piles & Input Area */}
        <div className="border-t border-gray-100 bg-white">
          
          {/* Pills */}
          {messages.length === 1 && (
            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-50 text-left">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2.5">
                Popular Student Questions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSend(question)}
                    className="font-body text-xs text-gray-600 bg-white hover:bg-cream hover:text-maroon border border-gray-200 rounded-lg px-2.5 py-1.5 text-left transition-all duration-150 active:scale-98 shadow-sm"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form Input */}
          <form onSubmit={handleFormSubmit} className="p-4 flex gap-2.5 items-center relative">
            <input
              type="text"
              required
              disabled={loading}
              placeholder="Ask about admissions, fee waiver, GATE..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-xl border border-gray-200 pl-4 pr-12 py-3 text-sm font-medium text-gray-900 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all duration-200 disabled:opacity-50"
            />
            
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-6 rounded-lg bg-maroon p-2 text-white hover:bg-maroon-light transition-all duration-200 disabled:opacity-30 disabled:scale-100 active:scale-95 shadow-md flex items-center justify-center"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          {/* Tips footer */}
          <div className="px-6 pb-4 pt-1 bg-white text-center flex items-center justify-center gap-1 text-[9px] text-gray-400 font-medium border-t border-gray-50">
            <CornerDownLeft className="h-3 w-3 shrink-0" />
            <span>Powered by Google Gemini RAG Search Agent</span>
          </div>

        </div>

      </div>
    </>
  );
}
