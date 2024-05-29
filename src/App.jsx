import React, { useState, useEffect } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import { IconButton, Grid, Paper, Tooltip } from '@mui/material';
import TaskList from './components/TaskList.jsx';
import Timer from './components/Timer.jsx';
import InspirationPanel from './components/InspirationPanel.jsx';
import './components/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [theme, setTheme] = useState('light');
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  const addTask = () => {
    if (taskInput.trim() === '') {
      setShowNotification(true);
      return;
    }

    if (tasks.some(task => task.text === taskInput)) {
      alert('Esta tarefa já existe na lista!');
      return;
    }

    setTasks([...tasks, { text: taskInput, completed: false }]);
    setTaskInput('');
    setShowNotification(false);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`App ${theme === 'dark' ? 'dark-theme' : ''}`} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
      <div className="theme-toggle">
        <Tooltip title="Alterar Tema" arrow>
          <IconButton onClick={toggleTheme} style={{ float: 'right', color: theme === 'light' ? '#000' : '#fff' }}>
            {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Defina uma imagem de fundo" arrow>
          <IconButton component="label" style={{ float: 'right' }}>
            <PhotoCameraBackIcon sx={{ color: theme === 'light' ? '#000' : '#fff' }} />
            <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
          </IconButton>
        </Tooltip>
      </div>
      <InspirationPanel />
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
                style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}
              />
              <button onClick={addTask} style={{ backgroundColor: theme === 'dark' ? '#555' : '#61dafb', color: theme === 'dark' ? '#61dafb' : '#555' }}>Adicionar</button>
            </div>
            {showNotification && <p style={{ color: 'red' }}>Por favor, digite uma tarefa válida!</p>}
            <TaskList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="timer-container" sx={{ marginBottom: 2 }}>
            <Timer theme={theme} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
