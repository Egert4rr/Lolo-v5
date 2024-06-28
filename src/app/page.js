"use client";

import { useState, useEffect } from "react";
import ArticleCard from "@/components/ArticleCard";
import FeedManager from "@/components/FeedManager";
import styles from "./page.module.css";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      let allArticles = [];
      for (const feed of feeds) {
        try {
          const response = await fetch(
            `/api/rss?url=${encodeURIComponent(feed)}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch articles");
          }
          const data = await response.json();
          allArticles = allArticles.concat(data);
        } catch (error) {
          console.error("Error fetching articles:", error);
        }
      }

      // Sort all articles by pubDate in descending order (newest first)
      allArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      setArticles(allArticles);
    };

    if (feeds.length > 0) {
      fetchArticles();
    }
  }, [feeds]);

  return (
    <div className={styles.container}>
      <h1>Lolo v5 Articles</h1>
      <FeedManager feeds={feeds} setFeeds={setFeeds} />
      <div className={styles.articles}>
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
