import React, {useState} from 'react';
import {
  // View, // Removed unused import
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

// Ensure 'Note' is a key in AppRootStackParamList
// Example of adding it if missing
type AppRootStackParamList = {
  Note: undefined; // Add this line if 'Note' is not defined
  // ... other routes
};

type NoteScreenNavigationProp = StackNavigationProp<
  AppRootStackParamList,
  'Note'
>;

interface NoteScreenProps {
  navigation: NoteScreenNavigationProp;
}

const NoteScreen: React.FC<NoteScreenProps> = ({navigation}) => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const handleSaveNote = () => {
    // TODO: Implement note saving logic
    console.log('Saving note:', {title: noteTitle, content: noteContent});
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TextInput
        style={styles.titleInput}
        placeholder="Note Title"
        value={noteTitle}
        onChangeText={setNoteTitle}
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Start typing your note..."
        value={noteContent}
        onChangeText={setNoteContent}
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
        <Text style={styles.saveButtonText}>Save Note</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NoteScreen;
