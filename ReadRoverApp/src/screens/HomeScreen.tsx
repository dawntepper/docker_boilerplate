import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  RefreshControl,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App'; // Adjust this import path as needed
import {getArticles} from '../services/apiService'; // Adjust this import as needed
import fetchAIRecommendations from '../services/apiService'; // Changed to default import
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Article {
  _id: string;
  title: string;
  author: string;
  categories: string[];
  imageUrl: string; // Added property
  date: string; // Added property
  content: string; // Added property
}

interface Recommendation {
  title: string;
  description: string;
  // Add other properties as needed
}

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}
const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [taskInput, setTaskInput] = useState('');
  const [aiRecommendations, setAIRecommendations] = useState<Recommendation[]>(
    [],
  );
  const [refreshing, setRefreshing] = useState(false);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
      setError(null);
    } catch (err) {
      setError('Failed to fetch articles. Please try again.');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleAIRecommendation = async () => {
    try {
      const response = await fetchAIRecommendations(taskInput);
      setAIRecommendations(response.data); // Extract data from the response
    } catch (err) {
      console.error('Error fetching AI recommendations:', err);
      // Consider adding error handling UI for AI recommendations
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchArticles().then(() => setRefreshing(false));
  }, [fetchArticles]);

  const renderArticleItem = ({item}: {item: Article}) => (
    <TouchableOpacity
      style={styles.articleItem}
      onPress={() => navigation.navigate('ArticleDetail', {article: item})}>
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleAuthor}>{item.author}</Text>
      <Text style={styles.articleCategories}>{item.categories.join(', ')}</Text>
    </TouchableOpacity>
  );

  const renderRecommendationItem = ({item}: {item: Recommendation}) => (
    <View style={styles.recommendationItem}>
      <Text style={styles.recommendationTitle}>{item.title}</Text>
      <Text style={styles.recommendationDescription}>{item.description}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading articles...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <TouchableOpacity onPress={fetchArticles} style={styles.retryButton}>
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text style={styles.header}>ReadRover</Text>
      <TouchableOpacity
        style={styles.newNoteButton}
        onPress={() => navigation.navigate('Note')}>
        <Text style={styles.newNoteButtonText}>New Note</Text>
      </TouchableOpacity>
      <Text style={styles.subHeader}>Latest Articles</Text>
      <FlatList
        data={articles}
        renderItem={renderArticleItem}
        keyExtractor={item => item._id}
        style={styles.articleList}
      />
      <View style={styles.aiSection}>
        <Text style={styles.subHeader}>AI Recommendations</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a task (e.g., 'Dinner ideas with an air fryer')"
          value={taskInput}
          onChangeText={setTaskInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleAIRecommendation}>
          <Text style={styles.buttonText}>Get Recommendations</Text>
        </TouchableOpacity>
        {aiRecommendations.length > 0 && (
          <FlatList
            data={aiRecommendations}
            renderItem={renderRecommendationItem}
            keyExtractor={(item, index) => `recommendation-${index}`}
            style={styles.recommendationList}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  articleItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  articleAuthor: {
    fontSize: 14,
    color: 'gray',
  },
  articleCategories: {
    fontSize: 12,
    color: 'blue',
    marginTop: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  aiSection: {
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recommendationItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 15,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recommendationDescription: {
    fontSize: 14,
    color: 'gray',
  },
  recommendationList: {
    marginBottom: 20,
  },
  articleList: {
    marginBottom: 20,
  },
  newNoteButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  newNoteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
