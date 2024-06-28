import Parser from "rss-parser";
import { parse } from "url";

const parser = new Parser({
  customFields: {
    item: ["media:content", "content:encoded"],
  },
});

export async function fetchRSSFeed(url) {
  const feed = await parser.parseURL(url);
  const { hostname } = parse(url); 
  const source = hostname.replace("www.", "");

  const articles = feed.items.map((item) => {
    let imageUrl = null;

    // Flipboard image extraction
    const mediaContent = item["media:content"];
    if (mediaContent && Array.isArray(mediaContent)) {
      imageUrl = mediaContent[0].$.url;
    } else if (mediaContent && mediaContent.$) {
      imageUrl = mediaContent.$.url;
    }

    // NASA image extraction
    if (!imageUrl) {
      const contentEncoded = item["content:encoded"];
      if (contentEncoded) {
        const imgTagMatch = contentEncoded.match(/<img.*?src="(.*?)"/);
        if (imgTagMatch && imgTagMatch[1]) {
          imageUrl = imgTagMatch[1];
        }
      }
    }

    return {
      title: item.title,
      link: item.link,
      description: item.contentSnippet || item.description,
      pubDate: item.pubDate,
      imageUrl,
      source,
    };
  });

  return articles;
}
