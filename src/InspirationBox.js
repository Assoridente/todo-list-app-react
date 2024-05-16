import React, { useState } from 'react';

function InspirationBox() {
  const [inspirationText, setInspirationText] = useState('');
  const [images, setImages] = useState([]);

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

  return (
    <div className="inspiration-box">
      <h2>Frases e Imagens Inspiradoras</h2>
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
  );
}

export default InspirationBox;
