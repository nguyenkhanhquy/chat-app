import { useState, useEffect } from "react";
import { Box, Input, Button, HStack, VStack, Text, Avatar } from "@chakra-ui/react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BE_URL);

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        let storedUserId = sessionStorage.getItem("userId");
        if (!storedUserId) {
            storedUserId = Math.random().toString(36).substring(7);
            sessionStorage.setItem("userId", storedUserId);
        }
        setUserId(storedUserId);

        socket.on("receiveMessage", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            const message = {
                userId,
                text: input,
            };
            socket.emit("sendMessage", message);
            setInput("");
        }
    };

    return (
        <VStack spacing={4} align="stretch">
            <Box h="400px" p={4} borderWidth={1} borderRadius="lg" overflowY="auto">
                {messages.map((msg, index) => (
                    <HStack key={index} justify={msg.userId === userId ? "flex-end" : "flex-start"} mb={4}>
                        {msg.userId !== userId && <Avatar name="Other" />}
                        <Box bg={msg.userId === userId ? "blue.100" : "green.100"} p={3} borderRadius="lg" maxW="70%">
                            <Text>{msg.text}</Text>
                        </Box>
                        {msg.userId === userId && <Avatar name="Me" />}
                    </HStack>
                ))}
            </Box>

            <HStack>
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
                <Button onClick={sendMessage} colorScheme="teal">
                    Send
                </Button>
            </HStack>
        </VStack>
    );
};

export default ChatBox;
