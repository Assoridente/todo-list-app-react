import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import Timer from './Timer';
import './App.css';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton, Grid, Paper } from '@mui/material';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [theme, setTheme] = useState('light');
  const [inspirationText, setInspirationText] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  const handleTextChange = (e) => {
    setInspirationText(e.target.value);
  };

  const handleImageUpload = (e) => {
    const newImages = [...images];
    newImages.push(URL.createObjectURL(e.target.files[0]));
    setImages(newImages);
  };

  const handleImageDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const addTask = () => {
    if (taskInput.trim() === '') {
      setShowNotification(true);
      return;
    }

    if (tasks.includes(taskInput)) {
      alert('Esta tarefa já existe na lista!');
      return;
    }

    setTasks([...tasks, taskInput]);
    setTaskInput('');
    setShowNotification(false);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <div className="theme-toggle">
        <IconButton onClick={toggleTheme} style={{ float: 'right' }}>
          {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon sx={{ color: '#fff' }} />}
        </IconButton>
      </div>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper className="task-container">
            <h2>Lista de Tarefas</h2>
            <div className="task-input">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Digite sua tarefa"
              />
              <button onClick={addTask}>Adicionar</button>
            </div>
            {showNotification && <p>Por favor, digite uma tarefa válida!</p>}
            <TaskList tasks={tasks} removeTask={removeTask} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="timer-container" sx={{ marginBottom: 2 }}>
            <Timer />
          </Paper>
          <Paper className="inspiration-container">
            <h2>Painel de Inspiração</h2>
            <div className="inspiration-box">
              <textarea
                value={inspirationText}
                onChange={handleTextChange}
                placeholder="Digite uma frase inspiradora..."
              ></textarea>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              <div className="image-list">
                {images.map((image, index) => (
                  <div key={index} className="image-container">
                    <img src={image} alt={`Imagem ${index}`} />
                    <button onClick={() => handleImageDelete(index)}>Excluir</button>
                  </div>
                ))}
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
