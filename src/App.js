import './App.css';
import { useState } from 'react';

function App() {
  const [toDo, setToDo] = useState('');
  const [toDos, setToDos] = useState([]);
  //toDos holds a set of todo items
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState('');
  const dayofWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const dayName = dayofWeek[today.getDay()];

  
  const toggleEditMode = (id) => {
    if (id === editingTodoId) {
      setEditingTodoId(null);
    } else {
      setEditingTodoId(id);
      const todoToEdit = toDos.find((todo) => todo.id === id);
      setEditedTodoText(todoToEdit.text);
    }
  };
  const removeTodo = (id) => {
    setToDos(toDos.filter((obj) => obj.id !== id));
  };

  const updateTodoText = (id) => {
    setToDos((prevToDos) =>
      prevToDos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: editedTodoText };
        }
        return todo;
      })
    );

    setEditingTodoId(null);
    setEditedTodoText('');
  };

  const addTodo = () => {
    if (!toDo) {
      return;
    }
  
    // Check if a todo with the same id already exists
    if (!toDos.some((todo) => todo.text === toDo)) {
      const newTodo = { id: Date.now(), text: toDo, status: false };
      setToDos([...toDos, newTodo]);
      setToDo('');
    } else {
      console.log('Todo with the same text already exists!');
    }
  };
  

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {dayName}  ☕</h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i
          onClick={addTodo}
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => (
          <div className={`todo ${obj.status ? 'completed' : ''}`} key={obj.id}>
            <div className="left">
        <input
          onChange={(e) => {
            console.log(e.target.checked);
            console.log(obj);
            setToDos((prevToDos) =>
              prevToDos.map((obj2) => {
                if (obj2.id === obj.id) {
                  obj2.status = e.target.checked;
                }
                return obj2;
              })
            );
          }}
          value={obj.status}
          type="checkbox"
        />
        {editingTodoId === obj.id ? (
          <input
            type="text"
            value={editedTodoText}
            onChange={(e) => setEditedTodoText(e.target.value)}
          />
        ) : (
          <p className={obj.status ? 'completed' : ''}>{obj.text}</p>
        )}
      </div>
            <div className="right">
        <i
          onClick={() => removeTodo(obj.id)}
          className="fas fa-times"
          style={{ cursor: "pointer", color: "red" }}
        ></i>
        <i
          onClick={() => toggleEditMode(obj.id)}
          className="fas fa-edit"
          style={{ cursor: "pointer", color: "blue" }}
        ></i>
        {
        editingTodoId === obj.id ? (
          <i
            onClick={() => updateTodoText(obj.id)}
            className="fas fa-check"
            style={{ cursor: "pointer", color: "green" }}
          ></i>
        ) : null
        }
      </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
