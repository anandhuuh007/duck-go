import React, { useState } from 'react';
import './App.css';
import Lottie from "lottie-react";
import UFOAnimation from "./assets/UFO-spaceship.json";
import duckImage from './duck.png';
import amongus from './amongus.png';

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setTodo] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div>
      <div className='header'></div>
      <div>
        <img className='bg' src={amongus} alt="" />
      </div>

      <div className="app">
        <div className="mainHeading">
          <h1 className='first-head'>Duckduck Goo</h1>
        </div>
        <div className="subHeading">
          <br />
          <h2 className='second-head'>Your Tasks, Simplified</h2>
          <img className='image' src={duckImage} alt="" />
        </div>
        <div className="ufo-container">
          <Lottie animationData={UFOAnimation} loop={true} />
        </div>

        <div className='poo po'>
          <div className="glass-card">
            <div className="input">
              <input
                value={toDo}
                onChange={(e) => setTodo(e.target.value)}
                type="text"
                placeholder="Add your Task"
              />
              <i
                onClick={() => {
                  if (toDo.trim() !== '') {
                    setTodos([
                      ...toDos,
                      {
                        id: Date.now(),
                        text: toDo,
                        status: false,
                        time: new Date().toLocaleString()
                      }
                    ]);
                    setTodo('');
                  }
                }}
                className="fas fa-plus plus"
              ></i>
            </div>

            <div className="todos">
              {toDos.map((obj) => (
                <div className="todo" key={obj.id}>
                  <div className="left">
                    <input
                      type="checkbox"
                      checked={obj.status}
                      onChange={(e) => {
                        const updatedTodos = toDos.map((obj2) => {
                          if (obj2.id === obj.id) {
                            obj2.status = e.target.checked;
                            if (e.target.checked) {
                              setMessage("🎉 Great job! Task completed!");
                              setTimeout(() => setMessage(''), 3000);
                            }
                          }
                          return obj2;
                        });
                        setTodos(updatedTodos);
                      }}
                    />
                    <div className={`todo-line ${obj.status ? 'completed' : ''}`}>
  <span className="task-text">{obj.text}</span>
  <span className="time">🕒 {obj.time}</span>
</div>

                  </div>
                  <div className="right">
  <i
    className="fas fa-times into"
    onClick={() => {
      const updatedTodos = toDos.filter((item) => item.id !== obj.id);
      setTodos(updatedTodos);
    }}
  ></i>
</div>

                </div>
              ))}
            </div>

            {message && (
              <div className="success-message">{message}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
