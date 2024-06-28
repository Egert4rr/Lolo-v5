import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
};

export default ArticlePage;
