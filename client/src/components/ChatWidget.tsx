import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";
import { 
  MessageCircle, 
  X, 
  Send, 
  Loader2,
  Bot,
  User,
  Phone
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! 👋 I'm here to help with your removal or delivery needs. How can I assist you today?\n\nI can help you with:\n- Getting a quick quote\n- Information about our services\n- Booking enquiries\n- Service area questions"
    }
  ]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(() => `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: (data) => {
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    },
    onError: () => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I'm having trouble responding right now. Please call us directly at **07459 920 895** for immediate assistance." 
      }]);
    }
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    
    chatMutation.mutate({
      sessionId,
      message: userMessage,
      conversationHistory: messages.map(m => ({ role: m.role, content: m.content }))
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-smooth flex items-center justify-center ${isOpen ? "hidden" : ""}`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] animate-in slide-in-from-bottom-4 duration-300">
          <Card className="shadow-2xl border-border/50 overflow-hidden">
            {/* Header */}
            <CardHeader className="bg-primary text-primary-foreground p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">KK Logistics</CardTitle>
                    <p className="text-xs opacity-80">Usually replies instantly</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="p-0">
              <ScrollArea className="h-[350px] p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-pastel-blue/20 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-secondary text-secondary-foreground rounded-bl-md"
                        }`}
                      >
                        {message.role === "assistant" ? (
                          <div className="text-sm prose prose-sm max-w-none">
                            <Streamdown>{message.content}</Streamdown>
                          </div>
                        ) : (
                          <p className="text-sm">{message.content}</p>
                        )}
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>
                  ))}
                  {chatMutation.isPending && (
                    <div className="flex gap-2 justify-start">
                      <div className="w-8 h-8 rounded-full bg-pastel-blue/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-border bg-background">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={chatMutation.isPending}
                    className="flex-1"
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSend}
                    disabled={!input.trim() || chatMutation.isPending}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Phone className="w-3 h-3" />
                  <span>Or call us: </span>
                  <a href="tel:07459920895" className="font-medium hover:underline">07459 920 895</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
