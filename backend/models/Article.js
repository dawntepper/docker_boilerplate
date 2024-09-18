import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  categories: [{
    type: String,
    trim: true
  }],
  isBookmarked: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Article = mongoose.model('Article', ArticleSchema);

export default Article;
