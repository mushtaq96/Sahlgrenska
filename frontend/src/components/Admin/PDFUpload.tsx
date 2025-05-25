import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import axiosInstance from '../../services/axios';
import {useNavigate} from 'react-router-dom';

export function PDFUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    setUploading(true);
  
    const formData = new FormData();
    formData.append('file', file); // Make sure this key matches backend expectation
  
    try {
      const response = await axiosInstance.post('/upload/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      toast({
        title: 'Guidelines uploaded',
        description: 'The clinical guidelines have been added to the knowledge base',
        status: 'success',
        isClosable: true,
      });
      setFile(null);
    } catch (error: any) {
      let errorMessage = 'Could not upload the guidelines';
  
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Server error response:', error.response.data);
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        // No response received
        console.error('No response received:', error.request);
        errorMessage = 'No response from server';
      } else {
        // Something else went wrong
        console.error('Error:', error.message);
      }
  
      toast({
        title: 'Upload failed',
        description: errorMessage,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setUploading(false);
    }
  };
  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Upload Clinical Guidelines</Heading>
      
      <VStack spacing={6} align="stretch">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          borderStyle="dashed"
          borderColor="gray.300"
        >
          <Flex direction="column" align="center">
            <Input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              display="none"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button as="span" colorScheme="blue" mb={4}>
                Select PDF File
              </Button>
            </label>
            {file && (
              <Text fontSize="sm" mb={4}>
                Selected: {file.name}
              </Text>
            )}
            <Button
              onClick={uploadFile}
              isLoading={uploading}
              isDisabled={!file}
              colorScheme="green"
              width="full"
            >
              Upload Guidelines
            </Button>
          </Flex>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Uploaded Guidelines
          </Heading>
          <Text color="gray.500">No files uploaded yet</Text>
        </Box>
      </VStack>
    </Container>
  );
}