import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function CopilotChat({ contractId, contractName }: { contractId: string, contractName: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello! I'm your Claude-powered Contract Co-Pilot. I've completely analyzed "${contractName}". You can ask me about hidden risks, rebate terms, termination clauses, or request a negotiation strategy.`
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isExpanded]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/contracts/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractId,
          message: userMessage,
          history: messages
        })
      });
      
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "assistant", content: "I encountered an error analyzing that request. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isExpanded) {
    return (
      <Button 
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 right-6 h-14 rounded-full shadow-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white px-6 flex items-center gap-3 z-50 transition-all duration-300 hover:scale-105"
      >
        <Sparkles className="w-5 h-5 text-blue-400" />
        <span className="font-semibold">Claude Co-Pilot</span>
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 shadow-2xl border-slate-700/50 bg-slate-900/95 backdrop-blur-xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
      <CardHeader className="p-4 border-b border-slate-800 bg-slate-900 flex flex-row items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold text-slate-100">Claude Co-Pilot</CardTitle>
            <p className="text-xs text-slate-400">Enterprise Intelligence</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)} className="text-slate-400 hover:text-white">
          <ChevronDown className="w-5 h-5" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 h-[400px] relative">
        <ScrollArea className="h-full p-4" ref={scrollRef}>
          <div className="space-y-4 pb-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <Avatar className="w-8 h-8 border border-slate-700 shrink-0">
                    <AvatarFallback className="bg-slate-800 text-blue-400"><Bot size={16}/></AvatarFallback>
                  </Avatar>
                )}
                <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-blue-600 text-white rounded-tr-none" 
                    : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50"
                }`}>
                  {/* Basic markdown parsing for bold text */}
                  {msg.content.split('**').map((text, i) => 
                    i % 2 === 1 ? <strong key={i} className="text-white">{text}</strong> : text
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8 border border-slate-700 shrink-0">
                  <AvatarFallback className="bg-slate-800 text-blue-400"><Bot size={16}/></AvatarFallback>
                </Avatar>
                <div className="p-4 rounded-2xl bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-3 border-t border-slate-800 bg-slate-900/90">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex w-full gap-2 items-center"
        >
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about risk, pricing, clauses..." 
            className="flex-1 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-blue-500"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 text-white shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}