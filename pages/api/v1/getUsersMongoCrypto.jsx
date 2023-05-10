import bcrypt from 'bcrypt';
import client from '../../../mongoConnection';

export default async function handler(req, res) {
  const { username, password } = req.body;
  const collection = client.db('trivia').collection('userCrypto');

  console.log(req.body);

  try {
    const emailData = await collection.findOne({ email: username });

    if (!emailData) {
      return res
        .status(404)
        .json({ error: `Usuário com email ${username} não cadastrado` });
    }

    const passwordData = emailData.password;

    // Comparar a senha fornecida com a senha criptografada no banco de dados
    const isPasswordValid = await bcrypt.compare(password, passwordData);

    console.log('Resposta da requisição:', passwordData);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const { email: userEmail, name } = emailData;
    res.status(200).json({ email: userEmail, name: name, result: 'pass' });
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao verificar as credenciais' });
  } finally {
    // Fechar a conexão com o MongoDB, se necessário
    // client.close();
  }
}