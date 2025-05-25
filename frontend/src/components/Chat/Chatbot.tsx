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
  Spinner,
  HStack,
  useToast,
} from "@chakra-ui/react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I'm Anton Advisor, your Infection Control Assistant. Ask me about guidelines, protocols, or case management."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const userBg = useColorModeValue("blue.500", "blue.300");
  const botBg = useColorModeValue("gray.200", "gray.600");

  const toast = useToast();

  const renderFeedbackToast = (type: 'positive' | 'negative') => {
    toast({
      title: type === 'positive' ? 'Thanks for the feedback!' : 'We’ll improve!',
      status: type === 'positive' ? 'success' : 'info',
      duration: 3000,
      isClosable: true,
      position: 'bottom-right',
    });
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user" as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      let botResponse = "";

      const lowerInput = input.toLowerCase();
      if (lowerInput.includes("cystitis") || lowerInput.includes("uti")) {
        botResponse = `If symptoms are mild and fever-free, it might not be clear whether it's cystitis or something else like vulvitis. Hold off on antibiotics and monitor.\n\nFor confirmed cases:\n- Trimethoprim: 6 mg/kg/day (max 400 mg), divided into 2 doses\n- Nitrofurantoin: 5 mg/kg/day (max 200 mg), 2 doses\n- Fosfomycin: One dose of 3g (take after dinner, delay urination)\n\nSource: [Pediatric UTI Guidelines 2024](https://example.com/ped-uti-guidelines )`;
      } else if (lowerInput.includes("thank")) {
        botResponse = "You're welcome! Let me know if you need anything else.";
      } else {
        botResponse = "I'm here to help. Could you rephrase or ask about infection control?";
      }

      const botMessage = { sender: "bot" as const, text: botResponse };
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
    }, 1000);
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
              <Text whiteSpace="pre-line">{msg.text}</Text>
              {msg.sender === "bot" && (
                <HStack mt={2} spacing={3}>
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => renderFeedbackToast('positive')}
                    aria-label="Positive feedback"
                  >
                    👍
                  </Button>
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => renderFeedbackToast('negative')}
                    aria-label="Negative feedback"
                  >
                    👎
                  </Button>
                </HStack>
              )}
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
            if (e.key === "Enter") sendMessage();
          }}
          disabled={loading}
          bg={useColorModeValue("white", "gray.700")}
        />
        <Button 
          onClick={sendMessage} 
          disabled={!input.trim() || loading}
          colorScheme="blue"
        >
          Send
        </Button>
      </Flex>
    </Box>
  );
};