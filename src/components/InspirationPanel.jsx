import React, { useState } from 'react';
import { IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './InspirationPanel.css';


export default function InspirationPanel() {
  const [inspirationText, setInspirationText] = useState('Clique aqui e faça seu painel de inspiração!');
  const [images, setImages] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = [...images];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event) => {
          newImages.push(event.target.result);
          setImages(newImages);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleEditClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleInspirationTextChange = (e) => {
    setInspirationText(e.target.value);
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className="inspiration-panel" style={{ margin: '20px' }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs>
          <Tooltip title="Digite aqui uma frase Inspiradora para você mesmo." arrow>
            <TextField
              value={inspirationText}
              onChange={handleInspirationTextChange}
              fullWidth
              variant="standard"
              InputProps={{
                disableUnderline: true,
                style: { fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'Dancing Script, cursive', color: '#6D9AFF' } // Defina a cor do texto aqui
              }}
              onClick={() => setIsDialogOpen(true)}
            />
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Editar" arrow>
            <IconButton onClick={handleEditClick} className="icon-button">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <div className="image-list">
        {images.map((img, index) => (
          <div key={index} className="image-item">
            <img src={img} alt={`Inspiration ${index}`} className="preview-image" />
            <IconButton onClick={() => handleDeleteImage(index)} className="delete-button">
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Editar painel de inspiração</DialogTitle>
        <DialogContent>
        <p>Abaixo coloque a sua frase inspiradora do dia:</p>
          <TextField
            value={inspirationText}
            onChange={handleInspirationTextChange}
            fullWidth
            variant="standard"
            InputProps={{
              style: { fontSize: '1rem' }
            }}
          />
          <p>Preencha o seu painel de inspiração com imagens que te tragam alegria e motivação ex: Seu pets, Lugares que você gostaria de conhecer, fotos da família e fotos com amigos ou colegas de equipe.</p>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
          <div className="preview">
            {images.map((img, index) => (
              <div key={index} className="image-item">
                <img src={img} alt={`Preview ${index}`} className="preview-image" />
                <IconButton onClick={() => handleDeleteImage(index)} className="delete-button">
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
