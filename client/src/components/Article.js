import React from 'react';

const Article = ({article}) => {
  const articleImage = article.urlToImage;

  return (
    <li className="list-group-item">
      <div className="article-list media">
        <div className="media-left">
          <img className="media-object" src={articleImage} />
        </div>
        <div className="media-body">
          <div className="media-heading">{article.title}</div>
        </div>
      </div>
    </li>
  );
}

export default Article;