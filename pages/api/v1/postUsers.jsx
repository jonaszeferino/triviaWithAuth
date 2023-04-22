import { connectionRdsMySql } from "../../../components/connectiondb";

export default async function handler(req, res) {
  const connection = await connectionRdsMySql();

  try {
    const { name, email, password } = req.body.userData;
    console.log(req.body);
    console.log(name, email, password);
    
    const query = "INSERT INTO users (name,email,password) VALUES (?, ?, ?)";

    const values = [
      name ? name : null,
      email ? email : null,
      password ? password : null,
    ];

    const [result] = await connection.execute(query, values);

    connection.end();
    res.status(200).json({ message: "Usuário inserido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}