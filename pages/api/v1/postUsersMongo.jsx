import client from "../../../mongoConnection";

export default async function handler(req, res) {
  const { name, email, password } = req.body.userData;
  const collection = client.db("trivia").collection("user");

  try {
    const result = await collection.insertOne({
      name: name ? name : null,
      email: email ? email : null,
      password: password ? password : null,
    });

    console.log(result);

    res.status(200).json({ message: "Usuário inserido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}