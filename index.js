const express  = require('express');
require('dotenv').config();
const NewsAPI = require('newsapi');
const news_api = new NewsAPI(process.env.NEWS_API_KEY);

const app = express();

app.get('/api/news/recent', async (req, res) => {
  try {
    const response = await news_api.v2.topHeadlines({
      category: req.query.category,
      country: req.query.country
    });

    res.send(response);
  } catch (err) {
    console.log(err);
  }
})

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);