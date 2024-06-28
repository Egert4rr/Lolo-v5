import { fetchRSSFeed } from "@/lib/rss";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    res.status(400).json({ error: "URL required" });
    return;
  }

  try {
    const articles = await fetchRSSFeed(url);
    res.status(200).json(articles);
  } catch (error) {
    console.error("Error fetching Feed:", error);
    res.status(500).json({ error: "Failed to fetch Feed" });
  }
}
