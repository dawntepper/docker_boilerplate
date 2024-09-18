import mongoose from 'mongoose';
import Article from './backend/models/Article.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('Connecting to MongoDB...');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000
})
.then(() => console.log('MongoDB connected...'))
.catch(err => {
  console.log('MongoDB connection error:', err);
});

const fetchArticles = async () => {
  try {
    console.log('Fetching articles...');
    const articles = await Article.find();
    console.log('Fetched articles:', articles);
    console.log('Number of articles:', articles.length);
  } catch (error) {
    console.error('Error fetching articles:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

fetchArticles();
