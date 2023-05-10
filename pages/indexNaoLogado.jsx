import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  ChakraProvider,
  Link,
} from "@chakra-ui/react";

export default function LoginPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  return (
    <>
      <ChakraProvider>
        <Box p={4} maxWidth="md" mx="auto">
          <Stack spacing={4}>
            <Text textAlign="center">
              Não foi possível realizar o login. Verifique seu email e senha.
            </Text>
            <Link href="/login" textAlign="center" color="blue.500">
              Voltar para a página de login
            </Link>
            <Button
              onClick={() => router.push("/")}
              colorScheme="blue"
              size="md"
              width="100%"
            >
              Ir para Home
            </Button>
          </Stack>
        </Box>
      </ChakraProvider>
    </>
  );
}