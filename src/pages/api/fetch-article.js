import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { slug } = req.query;
      const response = await axios.post(
        "https://uptime-mercury-api.azurewebsites.net/webparser",
        { url: slug }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching article content:", error.message);
      res.status(500).json({ error: "Failed to fetch article content" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
