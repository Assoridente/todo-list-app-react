// src/components/TaskInput.js
import React, { useState } from 'react';

function TaskInput({ addTask }) {
  const [taskText, setTaskText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) {
      setErrorMessage('A tarefa não pode estar vazia');
    } else {
      const result = addTask(taskText);
      if (result === 'DUPLICATE_TASK') {
        setErrorMessage('Tarefa já existe');
      } else {
        setTaskText('');
        setErrorMessage('');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Adicione uma nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default TaskInput;
