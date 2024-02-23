import './App.css';
import TodoList from './components/TodoList';
import Counter from './components/count';

function App() {

  return (
    <div className="App flex">
     <Counter/>
    <TodoList />
  </div>
  );
}

export default App;
