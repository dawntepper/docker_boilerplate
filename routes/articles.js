import express from 'express';
import Article from '../backend/models/Article.js';

const router = express.Router();

// GET all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ publishDate: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new article
router.post('/', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    source: req.body.source,
    url: req.body.url,
    categories: req.body.categories
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Additional routes (GET by ID, PUT, DELETE) can be added here

export default router;
