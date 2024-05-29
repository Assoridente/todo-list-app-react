import React, { useState, useEffect, useRef } from 'react';
import { Button, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import { styled } from '@mui/system';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import hiddenImage from './IconeTempo.svg';
import alarmSound from './alarm.mp3';
import { CSSTransition } from 'react-transition-group';
import './Timer.css';

const Timer = () => {
  const [time, setTime] = useState(25 * 60);
  const [inputTime, setInputTime] = useState(25);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [showTimeNumber, setShowTimeNumber] = useState(true);
  const [timeSet, setTimeSet] = useState(false); // Estado para controlar se o tempo foi definido
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio(alarmSound));

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            notifyUser();
            audioRef.current.play();
            returnToEditingWithTransition();
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
      new Notification('Sua sessão de concentração terminou!', {
        body: 'Descanse :)',
      });
    }
  };

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const handleStart = () => {
    if (inputTime <= 0) {
      alert("Defina o tempo de foco.");
      return;
    }
    
    clearInterval(intervalRef.current);
    setTime(inputTime * 60);
    setIsActive(true);
    setIsPaused(false);
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
    setTimeSet(false); // Redefinir o estado de tempo definido
  };

  const handleTimeInputChange = (event) => {
    setInputTime(event.target.value);
    setTimeSet(event.target.value > 0); // Atualizar o estado de tempo definido
  };

  const handleToggleShowTimeNumber = () => {
    setShowTimeNumber(!showTimeNumber);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const returnToEditingWithTransition = () => {
    setTimeout(() => {
      setIsEditing(true);
    }, 300); // Tempo da duração da transição em milissegundos
  };

  return (
    <Container>
      <h2>Prepare-se para se concentrar!</h2>
      <p>Por quanto tempo vai focar nessa tarefa?</p>
      <CSSTransition
        in={isEditing}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className="timer-svg">
          <Box sx={{ width: '100%', margin: 'auto', mb: 7 }}>
          <FormControl
            fullWidth
            size="small"
            sx={{
                  color: '#1B76D2', // Cor do texto do Select
                  '& label': { color: '#1B76D2' }, // Cor do texto do label
                  '& .MuiSelect-root': {
                  color: '#1B76D2', // Cor do texto do Select
                  '&:before': { borderColor: '#1B76D2' }, // Cor da linha delimitadora antes
                  '&:after': { borderColor: '#1B76D2' } // Cor da linha delimitadora depois
                  },
                  '& .MuiSelect-icon': { color: '#1B76D2' }, // Cor do ícone do Select
                  '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#1B76D2', // Cor da borda
                    },
                  '&:hover fieldset': {
                  borderColor: '#1B76D2', // Cor da borda ao passar o mouse
                  },
                  '&.Mui-focused fieldset': {
                  borderColor: '#1B76D2', // Cor da borda quando o campo estiver focado
                  },
                  },
                  }}
                  >
              <InputLabel id="time-select-label">Tempo (minutos)</InputLabel>
                  <Select
                        labelId="time-select-label"
                          value={inputTime}
                            onChange={handleTimeInputChange}
                              label="Tempo (minutos)"
                              sx={{ color: '#1B76D2' }} // Define a cor do texto do Select
                              inputProps={{ sx: { borderColor: '#1B76D2' } }} // Define a cor da linha delimitadora
  >
                              {[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120].map((value) => (
                              <MenuItem key={value} value={value}>
                              {value} minutos
                              </MenuItem>
                              ))}
                  </Select>
            </FormControl>



            <Box mt={2}> {/* Adicione espaço entre o input e o botão "Começar" */}
              {isEditing && (
                <StyledButton variant="contained" onClick={handleStart}>
                  Começar
                </StyledButton>
              )}
            </Box>
          </Box>
        </div>
      </CSSTransition>
      <CSSTransition
        in={!isEditing}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
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
                <text x="50" y="55" textAnchor="middle" fill="#38A83D">{formatTime(time)}</text>
              ) : (
                <image x="30" y="30" width="40" height="40" href={hiddenImage} />
              )}
            </svg>
          </div>
          <ButtonContainer mt={2}>
            <div style={{ marginRight: '10px' }}>
              <StyledButton variant="contained" onClick={handlePause}>
                {isPaused ? <PlayCircleOutlineIcon /> : <PauseCircleIcon />}
              </StyledButton>
            </div>
            <div style={{ marginRight: '10px' }}>
              <StyledButton variant="contained" onClick={handleReset}>
                <ReplayIcon />
              </StyledButton>
            </div>
            <div>
              <StyledButton variant="contained" onClick={handleToggleShowTimeNumber}>
                {showTimeNumber ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </StyledButton>
            </div>
          </ButtonContainer>
        </div>
      </CSSTransition>
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
  text-align: center;
`;

const ButtonContainer = styled('div')`
  display: flex;
  flex-direction: row; /* Alterado para linha para alinhar os botões horizontalmente */
  justify-content: center; /* Centralizar os botões horizontalmente */
  margin-top: 10px;
  gap: 10px; /* Adiciona espaçamento horizontal entre os botões */
`;

const StyledButton = styled(Button)`
  margin: 5px; /* Optional additional margin for individual buttons */
`;

export default Timer;
