import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getTasks, addTask, deleteTask, toggleTask } from '../api/tasks';

function TodoUI() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTasks();
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await addTask(title);
      setTasks(prev => [...prev, res.data]);
      setTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id, currentCompleted) => {
    try {
      const res = await toggleTask(id, !currentCompleted);
      setTasks(prev => prev.map(t => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div>
      <div>
        <header>
          <h1>My Todo List</h1>
          <button onClick={handleLogout}>Logout</button>
        </header>

        <form onSubmit={handleAdd}>
          <input
            type="text"
            className="todo-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit" className="todo-add-button">Add</button>
        </form>

        <ul>
          {tasks.map((task) => (
            <li key={task._id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={!!task.completed}
                onChange={() => handleToggle(task._id, task.completed)}
              />
              <span>{task.title}</span>
              <button onClick={() => handleDelete(task._id)}>×</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoUI;
