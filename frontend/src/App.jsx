import { ChakraProvider, Box, Heading } from "@chakra-ui/react";
import ChatBox from "./components/ChatBox";

function App() {
    return (
        <ChakraProvider>
            <Box display="flex" justifyContent="center" alignItems="center" w="100vw" h="100vh" bg="gray.100">
                <Box w="100%" maxW="500px" h="80%" maxH="100vh" bg="white" borderRadius="md" boxShadow="lg" p={6}>
                    <Heading size="lg" textAlign="center" mb={4}>
                        Real-Time Chat App
                    </Heading>
                    <ChatBox />
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default App;
