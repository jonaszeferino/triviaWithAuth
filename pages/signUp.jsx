import { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import styles from '../styles/LoginPage.module.css'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  ChakraProvider
} from '@chakra-ui/react';

export default function LoginPage() {
  const { data: session, status: sessionStatus } = useSession()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      ...credentials,
    });
  
    if (result.error) {
      // Exibir a mensagem de erro na tela
      setError(result.error.message);
      setLoading(false)
    } else {
      // Redirecionar para a página principal após o login bem-sucedido
      setLoading(false)
      router.push('/indexLogado');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  if (sessionStatus === 'loading') {
    return <div>Carregando...</div>
  }

  if (session) {
    router.push('/')
    return null
  }

  return (
    <>
    <ChakraProvider>
    <Box p={4} maxWidth="md" mx="auto">
      <Text fontSize="2xl" mb={4} textAlign="center">
        Login
      </Text>
      <form onSubmit={handleSubmit} method="post">
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" isLoading={loading}>
            Login
          </Button>
          {error && <Text color="red.500">{error}</Text>}
        </Stack>
      </form>
    </Box>
    </ChakraProvider>
    </>
  )
}
