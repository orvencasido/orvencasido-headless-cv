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
        <div className="bg-background border text-foreground border-border shadow-xl rounded-2xl w-80 sm:w-96 h-[30rem] flex flex-col overflow-hidden transition-all">
          <div className="bg-muted p-4 border-b border-border flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center">
                <MessageCircle size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Orbs</h3>
                <p className="text-xs text-green-500 font-medium">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-background/50 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
            {messages.length === 0 && (
              <div className="text-center text-sm text-muted-foreground mt-6 bg-muted p-4 rounded-xl border border-border mx-4">
                Orbs AI
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm shadow-sm ${msg.role === "user"
                    ? "bg-foreground text-background rounded-br-sm"
                    : "bg-muted text-foreground border border-border rounded-bl-sm"
                    }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted border border-border shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-muted-foreground flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/30 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/30 animate-bounce [animation-delay:-.3s]" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/30 animate-bounce [animation-delay:-.5s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-background flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-muted text-sm px-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-border transition-shadow"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 bg-foreground text-background rounded-full disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              <Send size={16} className="-ml-0.5 mt-0.5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-foreground text-background p-4 rounded-full shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Open chat assistant"
        >
          <MessageCircle size={28} className="group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
}
