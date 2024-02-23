import React, { useEffect, useState } from 'react';
import '../styles/todoList.css';
import axios from 'axios';
function TodoList() {
  const [inputValue, setInputValue] = useState('');
  const [editingInput, setEditingInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const updateTodo=async(id)=>{
    if(editingInput.trim() === '') return;
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_BASE_URL}todos/${id}`,{
        title:editingInput
      });
      if (response.status!==200) {
        throw new Error('Failed to update todo');
      }
      handleUpdateTodo(response.data.title);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }
  const fetchTodo=async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}todos`,);
      if (response.status!==200) {
        throw new Error('Failed to fetch todos');
      }
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }
  const addTodo=async()=>{
    if(inputValue.trim() === '') return;
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}todos`,{
        title:inputValue
      });
      if (response.status!==201) {
        throw new Error('Failed to add todo');
      }
      handleAddTodo(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }
useEffect(()=>{
  fetchTodo();
},[])
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = (todoItem) => {
    if (todoItem) {
      setTodos([...todos, todoItem]);
      setInputValue('');
    }
  };

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    setEditingInput(todos[index].title);
  };

  const handleUpdateTodo = (title) => {
    if (title.trim() !== '') {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex].title = title;
      setTodos(updatedTodos);
      handleCancelTodo();
    }
  };
const handleCancelTodo=()=>{
    setEditingInput('');
    setEditingIndex(null);
}
  return (
    <div className="todo-container">
    <h1>Todo List</h1>
    <div className="input-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a todo..."
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <li key={index}>
          {editingIndex === index ? (
            <>
              <input
                type="text"
                value={editingInput}
                onChange={(e) => setEditingInput(e.target.value)}
              />
              <button onClick={()=>updateTodo(todo._id)}>Update</button>
              <button onClick={handleCancelTodo}>Cancel</button>
            </>
          ) : (
            <>
              <span>{todo.title}</span>
              <button onClick={() => handleEditTodo(index)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
  );
}

export default TodoList;
