import React, { useState, useEffect, useRef } from 'react';
import { Button, InputAdornment } from '@mui/material';
import QuantityInput from './QuantityInput';
import { styled } from '@mui/system';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import EditIcon from '@mui/icons-material/Edit';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import hiddenImage from './IconeTempo.svg';

function Timer() {
  const [time, setTime] = useState(25 * 60);
  const [inputTime, setInputTime] = useState(25);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [showTimeNumber, setShowTimeNumber] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            notifyUser();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused]);

  const notifyUser = () => {
    if (Notification.permission === 'granted') {
      new Notification('Lembre-se de descansar!', {
        body: 'Você está concentrado há 25 minutos. Faça uma pausa!',
      });
    }
  };

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const handleStart = () => {
    setIsActive(true);
    setIsEditing(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTime(inputTime * 60);
    setIsEditing(true);
  };

  const handleEdit = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsPaused(false);
    setIsEditing(true);
  };

  const handleTimeInputChange = (event) => {
    const value = Math.max(0, Number(event.target.value));
    setInputTime(value);
    setTime(value * 60);
  };

  const handleToggleShowTimeNumber = () => {
    setShowTimeNumber(!showTimeNumber);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Container>
      <h4>Prepare-se para se concentrar!</h4>
      <h8>Desativaremos as notificações, a cada 20 minutos</h8>
      <h8>de concentração acionaremos pequenos descansos!</h8>
      <br />
      {isEditing ? (
        <div className="timer-svg" style={{ textAlign: 'center', width: '100%' }}>
          <QuantityInput
            value={inputTime}
            onChange={handleTimeInputChange}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            style={{ marginBottom: '10px' }} // Adicione margem inferior ao QuantityInput
          />
          <ButtonContainer>
            <Button variant="contained" onClick={handleStart}>
              Começar
            </Button>
          </ButtonContainer>
        </div>
      ) : (
        <div>
          <div>
            <svg width="200" height="200" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="#ccc" strokeWidth="10" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#4caf50"
                strokeWidth="10"
                fill="none"
                strokeDasharray={282.6}
                strokeDashoffset={(282.6 * (1 - time / (inputTime * 60)))}
                transform="rotate(-90 50 50)"
              />
              {showTimeNumber ? (
                <text x="50" y="55" textAnchor="middle" fill="#000">{formatTime(time)}</text>
              ) : (
                <image x="30" y="30" width="40" height="40" href={hiddenImage} />
              )}
            </svg>
          </div>
          <ButtonContainer style={{ marginTop: '10px' }}> {/* Adicione margem superior ao ButtonContainer */}
            <Button variant="contained" onClick={handlePause}>
              {isPaused ? <PlayCircleOutlineIcon /> : <PauseCircleIcon />}
            </Button>
            <Button variant="contained" onClick={handleEdit}>
              <EditIcon />
            </Button>
            <Button variant="contained" onClick={handleReset}>
              <ReplayIcon />
            </Button>
            <Button variant="contained" onClick={handleToggleShowTimeNumber}>
              {showTimeNumber ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </Button>
          </ButtonContainer>
        </div>
      )}
    </Container>
  );
}

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const ButtonContainer = styled('div')`
  display: flex;
  justify-content: center;
`;

export default Timer;
