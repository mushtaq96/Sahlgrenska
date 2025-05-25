import { useState } from "react";
import { 
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Text,
  useColorModeValue,
  VStack,
  Spinner
} from "@chakra-ui/react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I'm your Infection Control Assistant. Ask me about guidelines, protocols, or case management."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const userBg = useColorModeValue("blue.500", "blue.300");
  const botBg = useColorModeValue("gray.200", "gray.600");

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: "user" as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/v1/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ question: input }),
      });
      
      if (!response.ok) throw new Error("Failed to get response");
      
      const data = await response.json();
      const botMessage = { 
        sender: "bot" as const, 
        text: data.answer || "I couldn't find information about that in our guidelines."
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev, 
        { sender: "bot", text: "Sorry, I'm having trouble accessing the guidelines. Please try again later." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box width="100%">
      <VStack 
        spacing={4}
        align="stretch"
        maxH="60vh"
        overflowY="auto"
        pr={2}
        mb={4}
      >
        {messages.map((msg, i) => (
          <Flex 
            key={i} 
            direction={msg.sender === "user" ? "row-reverse" : "row"}
            align="flex-start"
            gap={3}
          >
            <Avatar 
              size="sm" 
              name={msg.sender === "user" ? "User" : "AI"}
              bg={msg.sender === "user" ? userBg : "gray.500"}
            />
            <Box
              p={3}
              borderRadius="lg"
              bg={msg.sender === "user" ? userBg : botBg}
              color={msg.sender === "user" ? "white" : "inherit"}
              maxWidth="80%"
            >
              <Text>{msg.text}</Text>
            </Box>
          </Flex>
        ))}
        {loading && (
          <Flex direction="row" align="flex-start" gap={3}>
            <Avatar size="sm" name="AI" bg="gray.500" />
            <Box p={3} borderRadius="lg" bg={botBg}>
              <Spinner size="sm" />
            </Box>
          </Flex>
        )}
      </VStack>
      
      <Flex gap={2}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about infection guidelines..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) sendMessage();
          }}
          disabled={loading}
          bg={useColorModeValue("white", "gray.700")}
        />
        <Button 
          onClick={sendMessage} 
          disabled={!input.trim() || loading}
          colorScheme="blue"
          px={6}
        >
          Send
        </Button>
      </Flex>
    </Box>
  );
};