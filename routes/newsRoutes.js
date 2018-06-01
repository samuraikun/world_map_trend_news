require('dotenv').config();
const NewsAPI = require('newsapi');
const news_api = new NewsAPI(process.env.NEWS_API_KEY);

module.exports = (app) => {
  app.get('/api/news/recent', async (req, res) => {
    try {
      const response = await news_api.v2.topHeadlines({
        category: req.query.category,
        country: req.query.country
      });
  
      res.send(response);
    } catch (err) {
      console.log(err);
  
      res.redirect('/');
    }
  });
  
  app.get('/api/news/search', async (req, res) => {
    try {
      const response = await news_api.v2.everything({
        q: req.query.keyword,
        language: req.query.language,
        from: req.query.from,
        sortBy: req.query.sortby,
        page: 10
      });
  
      res.send(response);
    } catch (err) {
      console.log(err);
  
      res.redirect('/');
    }
  });
  
  app.get('/api/news/sources', async (req, res) => {
    try {
      const response = await news_api.v2.sources({
        language: req.query.language,
        country: req.query.country
      });
  
      res.send(response);
    } catch (err) {
      console.log(err);
  
      res.redirect('/');
    }
  });
}