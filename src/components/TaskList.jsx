import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/system';
import dingSound from '../components/ding.mp3';


const TaskItem = styled('li')`
  position: relative;
  transition: opacity 0.5s ease, transform 0.5s ease, max-height 0.5s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const TaskText = styled('span')`
  transition: opacity 0.5s ease;
`;

function TaskList({ tasks, toggleTaskCompletion }) {
  const [completedIndex, setCompletedIndex] = useState(null);

  const handleCompleteTask = (index) => {
    setCompletedIndex(index);
  
    // Tocar o som de "ding"
    const audio = new Audio(dingSound);
    audio.play();
  
    setTimeout(() => {
      toggleTaskCompletion(index);
      setCompletedIndex(null);
    }, 500); // 0.5s delay for animation
  };
  
  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem key={index}>
          <TaskText>
            {task.text}
          </TaskText>
          <Checkbox
            checked={completedIndex === index}
            onChange={() => handleCompleteTask(index)}
            sx={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }}
          />
        </TaskItem>
      ))}
    </ul>
  );
}

export default TaskList;
