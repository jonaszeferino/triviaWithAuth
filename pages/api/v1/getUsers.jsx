import { connectionRdsMySql } from "../../../components/connectiondb";

export default async function handler(req, res) {

 const { email } = req.body;
  const connection = await connectionRdsMySql();

  try {
    const query = `SELECT DISTINCT email, password FROM users where email='${email}'`
                  
    console.log('aqui', query)
    const values = [];
    const [data] = await connection.execute(query, values);
    connection.end();


    if (data.length === 0) {
     return res
       .status(404)
       .json({ error: `Usuário com email ${email} não cadastrado` });
   }

    res.status(200).json({ results: data });
    console.log("aqui", data)
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
}