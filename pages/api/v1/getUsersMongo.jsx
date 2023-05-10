import client from "../../../mongoConnection";

export default async function handler(req, res) {
  const { username, password } = req.body;
  const collection = client.db("trivia").collection("user");

  console.log(req.body);

  try {
    const emailData = await collection.findOne({ email: username });

    if (!emailData) {
      return res
        .status(404)
        .json({ error: `Usuário com email ${username} não cadastrado` });
    }

    const passwordData = await collection.findOne({
      email: username,
      password: password,
    });

    console.log('Resposta da requisição:', passwordData);
    const { email: userEmail, name } = passwordData;
    if (!passwordData) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    res.status(200).json({ email: userEmail, name: name, result: 'pass' });
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao verificar as credenciais' });
  } finally {
    // Fechar a conexão com o MongoDB, se necessário
    // client.close();
  }
}