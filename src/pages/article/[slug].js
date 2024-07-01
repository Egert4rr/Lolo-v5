import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/components/Article.module.css";

const ArticlePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchArticle(slug);
    }
  }, [slug]);

  const fetchArticle = async (articleSlug) => {
    try {
      const response = await fetch(
        `/api/fetch-article?slug=${encodeURIComponent(articleSlug)}`
      );
      if (response.ok) {
        const data = await response.json();
        setArticle(data);
      } else {
        console.error("Failed to fetch article");
      }
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  if (!article) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => router.back()}>
        &larr; Back
      </button>
      <h1 className={styles.title}>{article.title}</h1>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
};

export default ArticlePage;
