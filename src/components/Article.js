import React from 'react';

const Article = ({ article }) => {
  return (
    <div className="article">
      <h2><a href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a></h2>
      <p>{article.contentSnippet}</p>
      <p><small>{new Date(article.pubDate).toLocaleDateString()}</small></p>
    </div>
  );
};

export default Article;