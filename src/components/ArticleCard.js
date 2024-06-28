import React from "react";
import styles from "./ArticleCard.module.css";

const ArticleCard = ({ article }) => {
  const { title, link, description, pubDate, imageUrl, source } = article;

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = `/article/${encodeURIComponent(link)}`;
  };

  return (
    <div
      className={`${styles.card} ${styles.articleCard}`}
      onClick={handleClick}
    >
      {imageUrl && <img src={imageUrl} alt={title} className={styles.image} />}
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <p className={styles.date}>{new Date(pubDate).toLocaleDateString()} - {source}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
