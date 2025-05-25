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
} from "@chakra-ui/react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I'm Anton Advisor, your Infection Control Assistant. Ask me about guidelines or treatments.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const userBg = useColorModeValue("blue.500", "blue.300");
  const botBg = useColorModeValue("gray.200", "gray.600");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user" as const, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate response delay
    setTimeout(() => {
      const botResponse =
        `If symptoms are mild and fever-free, it might not be clear whether it's cystitis or something else like vulvitis. In that case, hold off on antibiotics and monitor. But if you're sure it's cystitis, first-line options include:\n\n1. Trimethoprim (6 mg/kg/day max 400 mg, divided into 2 doses)\n2. Nitrofurantoin (5 mg/kg/day max 200 mg, 2 doses)\n3. Fosfomycin – one dose of 3g (take after dinner and delay urination)\n\nPick based on age, weight, and local resistance patterns.`;

      const botMessage = { sender: "bot" as const, text: botResponse };
      setMessages((prev) => [...prev, botMessage]);
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
            if (e.key === "Enter") sendMessage();
          }}
          disabled={loading}
          bg={useColorModeValue("white", "gray.700")}
        />
        <Button onClick={sendMessage} disabled={!input.trim() || loading} colorScheme="blue">
          Send
        </Button>
      </Flex>
    </Box>
  );
};