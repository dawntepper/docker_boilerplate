import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App'; // Update this path

type ArticleDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ArticleDetail'
>;
type ArticleDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ArticleDetail'
>;

type Props = {
  route: ArticleDetailScreenRouteProp;
  navigation: ArticleDetailScreenNavigationProp;
};

const ArticleDetailScreen: React.FC<Props> = ({route}) => {
  const {article} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: article.imageUrl}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.author}>{article.author}</Text>
        <Text style={styles.date}>{article.date}</Text>
        <Text style={styles.body}>{article.content}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#999',
    marginBottom: 15,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ArticleDetailScreen;
