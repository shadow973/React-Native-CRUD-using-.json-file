import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

export const Todo = ({todo, index, updateTodo, removeTodo}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const updatedTodo = {...todo, title: title, description: description};
    updateTodo && updateTodo(updatedTodo, index);
    setIsEditing(false);
  };

  const handleRemove = () => {
    removeTodo && removeTodo(todo);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            style={styles.input}
          />
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.title}>{todo.title}</Text>
            <Text style={styles.description}>{todo.description}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRemove} style={styles.button}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#b3003b',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
});