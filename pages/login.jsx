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
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [newName, setNewName] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newPasswordVerify, setNewPasswordVerify] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newVerify, setNewVerify] = useState(null);
  const [newOK, setNewOK] = useState(false);
  const [disableButton, setDisableButton]= useState(true)

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signUpScreen, setSignUpScreen] = useState(false);
  const [signScreen, setSignScreen] = useState(true);

  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      ...credentials,
    });

    if (result.error) {
      // Exibir a mensagem de erro na tela
      setError(result.error.message);
      setLoading(false);
    } else {
      // Redirecionar para a página principal após o login bem-sucedido
      setLoading(false);
      router.push("/indexLogado");
    }
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  if (sessionStatus === "loading") {
    return <div>Carregando...</div>;
  }

  if (session) {
    router.push("/");
    return null;
  }

  const apiCallChannels = async () => {
    try {
      const response = await fetch("/api/v1/postUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: stockUser,
          name: textSpanEnd,
          password: teste,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    setSignUpScreen(!signUpScreen);
    setSignScreen(!signScreen);
  };

  const handleVerifyPassword = () => {
    if (!newPassword || newPassword.trim() === '') {
      setNewVerify("Digite uma senha");
      setDisableButton(true);
    } else if (newPassword !== newPasswordVerify) {
      setNewVerify("Senhas diferentes");
      setDisableButton(true);
    } else {
      setNewVerify("");
      setNewOK(true);
      setDisableButton(false);
    }
  };

  return (
    <>
      <ChakraProvider>
        <Box p={4} maxWidth="md" mx="auto">
          {signScreen == true ? (
            <Text fontSize="2xl" mb={4} textAlign="center">
              Login
            </Text>
          ) : (
            ""
          )}

          <form onSubmit={handleSubmit} method="post">
            {signScreen == true ? (
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="username"
                    placeholder="e-mail"
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
                <Text textAlign="center">
                  Ainda não tem uma conta?{" "}
                  <Button onClick={handleClick}>Cadastrar-se</Button>
                </Text>

                {error && <Text color="red.500">{error}</Text>}
              </Stack>
            ) : (
              ""
            )}
          </form>

          {signUpScreen == true ? (
            <Text fontSize="2xl" mb={4} textAlign="center">
              Cadastro
            </Text>
          ) : (
            ""
          )}

          {signUpScreen && (
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  name="user"
                  placeholder="usuário"
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="e-mail"
                  value={newEmail}
                  onChange={(event) => setNewEmail(event.target.value)}
                />
              </FormControl>
              <Text>{newVerify}</Text>
              <FormControl>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Confirmação</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="repita a senha"
                  value={newPasswordVerify}
                  onBlur={handleVerifyPassword}
                  onChange={(event) => {
                    setNewPasswordVerify(event.target.value);
                  }}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={loading}
                isDisabled={disableButton}
              >
                Salvar
              </Button>
              <Button onClick={handleClick}>Login</Button>
              {error && <Text color="red.500">{error}</Text>}
            </Stack>
          )}
        </Box>
      </ChakraProvider>
    </>
  );
}
