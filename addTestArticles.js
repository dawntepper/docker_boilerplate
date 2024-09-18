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

const testArticles = [
  {
    title: 'First Test Article',
    content: 'This is the content of the first test article.',
    author: 'Test Author 1',
    source: 'Test Source',
    url: 'http://example.com/article1',
    categories: ['Technology', 'Science']
  },
  {
    title: 'Second Test Article',
    content: 'This is the content of the second test article.',
    author: 'Test Author 2',
    source: 'Another Test Source',
    url: 'http://example.com/article2',
    categories: ['Politics', 'Economy']
  }
];

const addTestArticles = async () => {
  try {
    console.log('Attempting to add test articles...');
    const result = await Article.insertMany(testArticles);
    console.log('Test articles added successfully:', result);
  } catch (error) {
    console.error('Error adding test articles:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

addTestArticles();
