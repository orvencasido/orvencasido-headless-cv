"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn't reach the server right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white border text-neutral-900 border-neutral-200 shadow-xl rounded-2xl w-80 sm:w-96 h-[30rem] flex flex-col overflow-hidden transition-all dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100">
          <div className="bg-neutral-50 dark:bg-neutral-800 p-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 flex items-center justify-center">
                <MessageCircle size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">AI Assistant</h3>
                <p className="text-xs text-green-500 font-medium">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200 dark:hover:text-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/50 dark:bg-neutral-900/50">
            {messages.length === 0 && (
              <div className="text-center text-sm text-neutral-500 mt-6 bg-white dark:bg-neutral-800 p-4 rounded-xl border border-neutral-100 dark:border-neutral-700 mx-4">
                👋 Hi there! I'm an AI assistant. How can I help you today?
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                    msg.role === "user"
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-br-sm"
                      : "bg-white text-neutral-900 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700 rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-neutral-500 flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600 animate-bounce [animation-delay:-.3s]" />
                  <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600 animate-bounce [animation-delay:-.5s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-neutral-100 dark:bg-neutral-800 text-sm px-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 transition-shadow"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-full disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              <Send size={16} className="-ml-0.5 mt-0.5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 p-4 rounded-full shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Open chat assistant"
        >
          <MessageCircle size={28} className="group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
}
