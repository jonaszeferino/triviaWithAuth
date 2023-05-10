import { connectionRdsMySql } from "../../../components/connectiondb";

export default async function handler(req, res) {
  const { username, password } = req.body;
  const connection = await connectionRdsMySql();

  console.log(req.body);

  let email = username;

  try {
    const checkEmailQuery = 'SELECT DISTINCT email FROM users WHERE email = ?';
    const emailValues = [email];
    const [emailData] = await connection.execute(checkEmailQuery, emailValues);

    if (emailData.length === 0) {
      return res
        .status(404)
        .json({ error: `Usuário com email ${email} não cadastrado` });
    }

    const checkPasswordQuery =
      'SELECT DISTINCT email, password, name FROM users WHERE email = ? AND password = ?';
    const passwordValues = [email, password];
    const [passwordData] = await connection.execute(
      checkPasswordQuery,
      passwordValues
    );

    console.log('Resposta da requisição:', passwordData);
    const { email: userEmail, name } = passwordData[0];
    if (passwordData.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    res.status(200).json({ email: userEmail, name: name, result: 'pass' });
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao verificar as credenciais' });
  } finally {
    connection.end();
  }
}