import { useEffect, useState, useRef } from 'react'
import { Box, Button, Center, Container, Spinner, Stack, Text } from '@chakra-ui/react'
import axiosInstance from '../../services/axios'
import { LoginUserType } from '../../components/Auth/UserType.types'
import {PDFUpload} from '../Admin/PDFUpload'
import {Chatbot} from '../Chat/Chatbot'
import { useAuth } from '../../hooks/useAuth'

export function Users() {
  const [users, setUsers] = useState<LoginUserType[]>([])
  const [loading, setLoading] = useState(true)
  const isMounted = useRef(false)
  const { user } = useAuth()

  useEffect(() => {
    if (isMounted.current) return
    const initialize = async () => {
      try {
        const response = await axiosInstance.get('/users/')
        setUsers(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    initialize()
    isMounted.current = true
  }, [])

  if (loading) {
    return (
      <Center mt={6}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="green.200"
          color="green.500"
          size="xl"
        />
      </Center>
    )
  }

  return (
    <Container mt={9}>
      {user?.is_admin && (
        <Box mb={6}>
          <PDFUpload />
        </Box>
      )}
      <Chatbot />
      <Box mt={6}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          User List
        </Text>
        <Stack spacing={3}>
          {users.map((user) => (
            <Box key={user.id} p={4} borderWidth="1px" borderRadius="lg">
              <Text fontWeight="bold">{user.username}</Text>
              <Text>{user.email}</Text>
              {user.is_admin && (
                <Text color="blue.500">Admin</Text>
              )}
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  )
}