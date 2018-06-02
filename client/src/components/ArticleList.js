import React from 'react';
import Article from './Article';

const ArticleList = (props) => {
  console.log(props.articles);
  const articles = props.articles.map(article => {
    return (
      <Article
        key={article.source.id}
        article={article}
      />
    );
  });

  return (
    <ul className="col-md-4 list-group">
      {articles}
    </ul>
  );
}

export default ArticleList;