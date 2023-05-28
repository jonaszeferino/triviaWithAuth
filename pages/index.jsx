import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  Stack,
  ChakraProvider,
  Center,
  Button,
  Text,
  Image,
  Grid,
} from "@chakra-ui/react";

export default function StrikeManager() {
  const [isClient, setIsClient] = useState(false);
  const [nome, setNome] = useState("Glacial");
  const [ocorrencia, setOcorrencia] = useState("");
  const [strikeValue, setStrikeValue] = useState(0);
  const [isNew, setIsNew] = useState(true);
  const [strike1Clicked, setStrike1Clicked] = useState(false);
  const [strike2Clicked, setStrike2Clicked] = useState(false);
  const [strike3Clicked, setStrike3Clicked] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const apiCall = async () => {
    try {
      const response = await fetch("/api/v1/putStrikeManager", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nome,
          incident: ocorrencia,
          strikePoints: strikeValue,
          
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const nomes = [
    { value: "Giovani", label: "Giovani", imagem: "/imagens/giovani.jpg" },
    {
      value: "Guilherme",
      label: "Guilherme",
      imagem: "/imagens/guilherme.jpg",
    },
    {
      value: "Jaime",
      label: "Jaime",
      imagem: "/imagens/jaime.jpg",
    },
    {
      value: "Jonas",
      label: "Jonas",
      imagem: "/imagens/jonas.jpg",
    },
    {
      value: "Leonardo",
      label: "Leonardo",
      imagem: "/imagens/leonardo.jpg",
    },
    {
      value: "Murilo",
      label: "Murilo",
      imagem: "/imagens/murilo.jpg",
    },
    {
      value: "Veller",
      label: "Veller",
      imagem: "/imagens/veller.jpg",
    },
    {
      value: "Vitor",
      label: "Vitor",
      imagem: "/imagens/vitor.jpg",
    },
  ];

  const categorias = [
    "Clubista",
    "Foi Lóqui",
    "Machista",
    "Nazista",
    "Otako",
    "Repost",
    "Só Fala De Grêmio",
    "Só Fala De Inter",
    "Torce Pro Boston",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsNew(false);
    // Lógica para lidar com o envio do formulário
  };

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleOcorrenciaChange = (event) => {
    setOcorrencia(event.target.value);
  };

  const handleStrikeClick1 = () => {
    setStrikeValue(strikeValue + 1);
    setStrike1Clicked(true);
    setIsNew(false);
  };

  const handleStrikeClick2 = () => {
    setStrikeValue(strikeValue + 2);
    setStrike2Clicked(true);
    setIsNew(false);
  };

  const handleStrikeClick3 = () => {
    setStrikeValue(strikeValue + 3);
    setStrike3Clicked(true);
    setIsNew(false);
  };

  const getImagemPorNome = (nome) => {
    const pessoa = nomes.find((item) => item.value === nome);
    if (pessoa) {
      return pessoa.imagem;
    }
    return "/imagens/glacial.jpg";
  };

  return (
    <ChakraProvider>
      <Center>
        <Stack spacing={4} width="600px">
          <form onSubmit={handleSubmit} method="post">
            <FormControl>
              <FormLabel>Elemento</FormLabel>
              <Select
                name="nome"
                placeholder="Selecione o Meliante"
                onChange={handleNomeChange}
                value={nome}
              >
                {nomes.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Ocorrência</FormLabel>
              <Select
                name="ocorrencia"
                placeholder="Descreva a Ocorrência"
                onChange={handleOcorrenciaChange}
                value={ocorrencia}
              >
                {categorias.map((categoria, index) => (
                  <option key={index} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Center>
              <form onSubmit={handleSubmit} method="post">
                {/* ... */}
                <Center>
                  <Button
                    colorScheme={strike1Clicked ? "teal" : "gray"}
                    onClick={handleStrikeClick1}
                    disabled={isNew || strike1Clicked}
                  >
                    +1 Strike
                  </Button>
                  <Button
                    colorScheme={strike2Clicked ? "teal" : "gray"}
                    onClick={handleStrikeClick2}
                    disabled={isNew || strike2Clicked}
                  >
                    +2 Strike
                  </Button>
                  <Button
                    colorScheme={strike3Clicked ? "teal" : "gray"}
                    onClick={handleStrikeClick3}
                    disabled={isNew || strike3Clicked}
                  >
                    +3 Strike
                  </Button>
                </Center>
              </form>
            </Center>
          </form>
          <Center>
            <Grid templateColumns="auto 1fr" gap={4} alignItems="center">
              {nome && (
                <Image
                  src={getImagemPorNome(nome)}
                  alt={nome}
                  boxSize="200px"
                  objectFit="cover"
                />
              )}
              <div>
                <Text>Meliante: {nome}</Text>
                <Text>BO: {ocorrencia}</Text>
                <Text>Valor do Strike: {strikeValue}</Text>
              </div>
            </Grid>
          </Center>
          <Button type="submit" colorScheme="teal" disabled={isNew} onClick={apiCall}>
            Enviar
          </Button>
        </Stack>
      </Center>
    </ChakraProvider>
  );
}
