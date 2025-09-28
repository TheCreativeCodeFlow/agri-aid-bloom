import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Mic, X, Bot, User } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! I'm your CropCast AI Assistant. I can help you with farming advice, crop management, pest identification, and market insights. How can I assist you today?",
    sender: "bot",
    timestamp: new Date()
  }
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 1500)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes("weather")) {
      return "Based on current weather data, expect partly cloudy conditions with temperatures around 28°C. There's a 30% chance of rain in the next 3 days. Would you like detailed weather forecasts for your specific location?"
    }
    
    if (input.includes("pest") || input.includes("bug") || input.includes("insect")) {
      return "I can help identify pests! You can upload images through the Pest Detection feature. Common pests this season include aphids, leaf miners, and bollworms. Would you like specific treatment recommendations?"
    }
    
    if (input.includes("price") || input.includes("market")) {
      return "Current market prices: Wheat ₹2,150/quintal, Rice ₹3,200/quintal, Cotton ₹5,800/quintal. Prices are trending upward this week. Would you like prices for specific crops or mandis?"
    }
    
    if (input.includes("fertilizer") || input.includes("soil")) {
      return "For optimal soil health, I recommend getting a soil test first. Generally, NPK 10-26-26 works well for most crops during planting. Organic options include vermicompost and neem cake. What crop are you planning to grow?"
    }
    
    if (input.includes("yield") || input.includes("production")) {
      return "Yield predictions depend on crop type, soil condition, weather, and farming practices. Our AI model can predict yields with 95% accuracy. Would you like to run a yield prediction for your specific crop?"
    }
    
    return "That's a great question! I'm here to help with farming advice, crop management, pest control, weather updates, and market prices. Could you please be more specific about what you'd like to know?"
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice input not supported in this browser")
      return
    }

    setIsListening(true)
    // TODO: Implement actual voice recognition
    setTimeout(() => {
      setIsListening(false)
      setInputValue("Voice input would work here")
    }, 2000)
  }

  const ChatWindow = () => (
    <Card className={`${isMobile ? 'h-full' : 'w-96 h-[500px]'} flex flex-col`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-primary rounded-lg">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <span>CropCast AI Assistant</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 pt-0">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}>
                    {message.sender === "user" ? (
                      <User className="h-3 w-3" />
                    ) : (
                      <Bot className="h-3 w-3" />
                    )}
                  </div>
                  <div className={`p-3 rounded-lg chat-bubble ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-2">
                  <div className="p-2 rounded-full bg-muted">
                    <Bot className="h-3 w-3" />
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="mt-4 flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your farming question..."
              className="pr-12"
              disabled={isLoading}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleVoiceInput}
              className={`absolute right-1 top-1 h-8 w-8 ${isListening ? 'text-red-500' : ''}`}
              disabled={isLoading}
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            onClick={handleSendMessage} 
            size="icon"
            disabled={!inputValue.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  if (isMobile && isOpen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background"
      >
        <ChatWindow />
      </motion.div>
    )
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg pulse-ring"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <ChatWindow />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}