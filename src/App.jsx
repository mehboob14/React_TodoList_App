import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const AddHandler = () => {
      setTodos([...todos, { id: uuidv4(), text: todo, isCompleted: false }]);
      setTodo("");
    
  };

  const EditHandler = (id) => {
    const updatedTodos = todos.map((task) =>
      task.id === id ? { ...task, text: prompt("Edit task:", task.text) || task.text } : task
    );
    setTodos(updatedTodos);
  };

  const DeleteHandler = (id) => {
    const updatedTodos = todos.map((task) =>
      task.id === id ? { ...task, isCompleted: true } : task
    );
    setTodos(updatedTodos);
  };

  const displayedTodos = showCompleted
    ? todos.filter((task) => task.isCompleted)
    : todos.filter((task) => !task.isCompleted);

  return (
    <div>
      <Navbar />
      <div className="addTodos container flex flex-row items-center px-6 py-4 bg-gray-600 my-6 rounded">
        <input
          type="text"
          placeholder="Add a new task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="flex-1 px-4 py-2 rounded-l border-none"
        />
        <button
          className="px-4 py-2 text-white font-bold bg-blue-600 rounded-r hover:bg-blue-700"
          onClick={AddHandler}
        >
          Add
        </button>
      </div>

      <div className="filter-tasks container flex items-center px-6 py-4 bg-gray-200 rounded mb-6">
        <input
          type="radio"
          name="filter"
          id="unfinished-tasks"
          className="mr-2"
          checked={!showCompleted}
          onChange={() => setShowCompleted(false)}
        />
        <label htmlFor="unfinished-tasks" className="mr-4">
          Unfinished tasks
        </label>
        <input
          type="radio"
          name="filter"
          id="finished-tasks"
          className="mr-2"
          checked={showCompleted}
          onChange={() => setShowCompleted(true)}
        />
        <label htmlFor="finished-tasks" className="mr-4">
          Finished tasks
        </label>
      </div>

      <div className="Todos container flex flex-col gap-4 px-6 py-4">
        {displayedTodos.map((task) => (
          <div
            key={task.id}
            className="Item flex items-center justify-between bg-white p-4 shadow rounded"
          >
            <p className={`flex-1 ${task.isCompleted ? "line-through text-gray-400" : ""}`}>
              {task.text}
            </p>
            {!task.isCompleted && (
              <div className="flex gap-2 flex-wrap">
                <button
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                  onClick={() => EditHandler(task.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                  onClick={() => DeleteHandler(task.id)}
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
