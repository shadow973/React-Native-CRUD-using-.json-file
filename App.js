import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Todo} from './components/Todo';
import {TodoModel} from './models/TodoModel';

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [textInputValue, setTextInputValue] = useState('');
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@todos');
      if (jsonValue != null) {
        setTodos(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveData = async () => {
    try {
      const jsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem('@todos', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const addTodo = (text) => {
    const newTodo = {...TodoModel, id: Math.random().toString(), title: text};
    setTodos([...todos, newTodo]);
    setTextInputValue('');
  };

  const removeTodo = todo => {
    const newTodos = todos.filter(t => t.id !== todo.id);
    setTodos(newTodos);
  };

  const updateTodo = (todo, index) => {
    const newTodoList = [...todos];
    newTodoList[index] = todo;
    setTodos(newTodoList);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={({item, index}) => (
          <Todo todo={item} index={index} removeTodo={removeTodo} updateTodo={updateTodo} />
        )}
        keyExtractor={todo => todo.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add new Todo"
          value={textInputValue}
          onChangeText={setTextInputValue}
          onSubmitEditing={()=>addTodo(textInputValue)}
          style={styles.input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '80%',
  },
});