import bcrypt from 'bcrypt';
import client from '../../../mongoConnection';

const SALT_ROUNDS = 10; // Número de rounds de criptografia do bcrypt

export default async function handler(req, res) {
  const { name, email, password } = req.body.userData;
  const collection = client.db('trivia').collection('userCrypto');

  try {
    // Criptografar a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await collection.insertOne({
      name: name ? name : null,
      email: email ? email : null,
      password: hashedPassword, // Salvar a senha criptografada
    });

    console.log(result);

    res.status(200).json({ message: 'Usuário inserido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}