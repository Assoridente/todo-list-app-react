// src/components/TaskList.js
import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/system';

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
  ${({ completed }) => completed && 'text-decoration: line-through; opacity: 0;'}
`;

function TaskList({ tasks, removeTask }) {
  const handleToggleComplete = (index) => {
    removeTask(index);
  };

  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem key={index}>
          <TaskText completed={false}>
            {task}
          </TaskText>
          <Checkbox
            onChange={() => handleToggleComplete(index)}
            sx={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }}
          />
        </TaskItem>
      ))}
    </ul>
  );
}

export default TaskList;
