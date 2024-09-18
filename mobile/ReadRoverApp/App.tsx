import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ArticleDetailScreen from './src/screens/ArticleDetailScreen';
import 'react-native-gesture-handler';
import NoteScreen from './src/screens/NoteScreen'; // {{ edit_1 }} Import NoteScreen

export type RootStackParamList = {
  Home: undefined;
  ArticleDetail: {
    article: {
      imageUrl: string;
      title: string;
      author: string;
      date: string;
      content: string;
    };
  };
  Note: undefined; // {{ edit_1 }} Add Note to the param list
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
        <Stack.Screen name="Note" component={NoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
