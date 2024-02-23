import { useEffect, useState } from 'react';
import '../styles/todoList.css';
import axios from 'axios';
const Counter = () => {
    const [count,setCount]=useState(0);
    const updateCount=async()=>{
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}count`,);
        if (response.status!==200) {
          throw new Error('Failed to fetch count');
        }
        setCount(response.data.totalCount);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    }
    useEffect(()=>{
      updateCount()
    },[]);
  return (
    <div style={{margin:'auto'}}>
      <span>Count: {count}</span>
      <button style={{backgroundColor:"black",margin: '20px'}} onClick={updateCount}>update count</button>
    </div>
  );
};
export default Counter;
