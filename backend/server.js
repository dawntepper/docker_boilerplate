import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Make sure to import cors
import Article from './models/Article.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000' // Allow your React app's origin
}));
app.use(express.json());

// Detailed logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the DashRover API');
});

app.get('/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.get('/api/articles', async (req, res) => {
  try {
    console.log('Fetching articles from database...');
    const articles = await Article.find();
    console.log(`Found ${articles.length} articles`);
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log('MongoDB connection error:', err));

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});