import { 
  Box, 
  Container, 
  Flex, 
  Heading, 
  Stack, 
  Text, 
  useColorModeValue,
  Button
} from '@chakra-ui/react'
import { Chatbot } from '../Chat/Chatbot'
// import {Illustration} from './Illustration'
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  return (
    <Container maxW={'7xl'} py={8}>
      <Flex justify="flex-end" align="center" mb={6}>
        <Button onClick={() => navigate('/upload')} colorScheme="blue">
          Back to Dashboard
        </Button>
      </Flex>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 18 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Infection Control{' '}
          <Text as={'span'} color={'blue.400'}>
            Assistant
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          AI-powered assistant for evidence-based infection prevention and antimicrobial stewardship
        </Text>
      </Stack>

      <Box
        borderRadius="lg"
        p={6}
        mb={10}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'xl'}
      >
        <Chatbot />
      </Box>

      <Flex w={'full'} justify="center">
        {/* <Illustration height={{ sm: '24rem', lg: '28rem' }} /> */}
      </Flex>
    </Container>
  )
}