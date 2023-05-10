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
            <Text textAlign="center">Conectado! Parabens</Text>
          </Stack>
        </Box>
      </ChakraProvider>
    </>
  );
}
