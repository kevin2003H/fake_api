import React, { useState } from "react";

export default function Characters(props) {
  const { characters, setCharacters } = props;
  const [editIndex, setEditIndex] = useState(null);
  const [editedCharacter, setEditedCharacter] = useState(null);
  const [newCharacter, setNewCharacter] = useState({
    character: "",
    image: "",
    quote: ""
  });

  const resetCharacters = () => {
    setCharacters(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedCharacter(characters[index]);
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "edit") {
      setEditedCharacter((prevCharacter) => ({
        ...prevCharacter,
        [name]: value
      }));
    } else {
      setNewCharacter((prevCharacter) => ({
        ...prevCharacter,
        [name]: value
      }));
    }
  };

  const saveEdit = () => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character, index) =>
        index === editIndex ? editedCharacter : character
      )
    );
    setEditIndex(null);
    setEditedCharacter(null);
  };

  const addCharacter = () => {
    setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
    // Reiniciar el formulario después de agregar el nuevo personaje
    setNewCharacter({
      character: "",
      image: "",
      quote: ""
    });
  };

  const deleteCharacter = (index) => {
    setCharacters((prevCharacters) =>
      prevCharacters.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="App-header characters">
      <h1 className="title">Los Simpsons</h1>
      <div className="container-characters">
        {characters.map((character, index) => (
          <div className="character-container" key={index}>
            <div className="info">
              <h3>{character.character}</h3>
              <img src={character.image} alt={character.character} />
              <p>{character.quote}</p>
            </div>
            <div className="buttons">
              <button className="btn" onClick={() => handleEdit(index)}>
                Editar
              </button>
              <button className="btn" onClick={() => deleteCharacter(index)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="back">
        <button className="btn" onClick={resetCharacters}>
          <span className="material-icons">arrow_back</span> Volver
        </button>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="character"
          placeholder="Nombre del personaje"
          value={newCharacter.character}
          onChange={(e) => handleInputChange(e, "new")}
        />
        <input
          type="text"
          name="image"
          placeholder="URL de la imagen"
          value={newCharacter.image}
          onChange={(e) => handleInputChange(e, "new")}
        />
        <input
          type="text"
          name="quote"
          placeholder="Cita del personaje"
          value={newCharacter.quote}
          onChange={(e) => handleInputChange(e, "new")}
        />
        <button className="btn" onClick={addCharacter}>
          Agregar Personaje
        </button>
      </form>
      {editIndex !== null && editedCharacter !== null && (
        <div>
          <h2>Editar Personaje</h2>
          <input
            type="text"
            name="character"
            placeholder="Nombre del personaje"
            value={editedCharacter.character}
            onChange={(e) => handleInputChange(e, "edit")}
          />
          <input
            type="text"
            name="image"
            placeholder="URL de la imagen"
            value={editedCharacter.image}
            onChange={(e) => handleInputChange(e, "edit")}
          />
          <input
            type="text"
            name="quote"
            placeholder="Cita del personaje"
            value={editedCharacter.quote}
            onChange={(e) => handleInputChange(e, "edit")}
          />
          <button className="btn" onClick={saveEdit}>
            Guardar Cambios
          </button>
        </div>
      )}
    </div>
  );
}
