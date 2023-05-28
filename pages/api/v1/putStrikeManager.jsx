import client from "../../../mongoConnection";

export default async function handler(req, res) {
  const { name, incidents, strikePoints } = req.body;
  const collection = client.db("strikeManager").collection("incidents");

  try {
    const result = await collection.insertOne({
      name: name ? name : null,
      incidents: incidents ? incidents : null,
      strikePoints: strikePoints ? strikePoints : null,
    });

    

    console.log(result);

    res.status(200).json({ message: "Strike Inserido!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}