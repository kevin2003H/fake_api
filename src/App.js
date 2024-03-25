import { useState } from 'react';
import './App.css';
import simpsonsImage from './img/imagen-S.png'
import Characters from './componentes/characters';

function App() {
  const [characters, setCharacters] = useState(null);

  const getCharacters = async () => {
   try {
    const apiCharacters = await fetch("https://thesimpsonsquoteapi.glitch.me/quotes?count=50");
    const jsonCharacters = await apiCharacters.json();

    let charactersMap = jsonCharacters.map(item => {
      return[item.character,item ]
    });
    let charactersMapArr = new Map(charactersMap);

    let uniqueCharacters = [...charactersMapArr.values()];
   

    setCharacters(uniqueCharacters);
   } catch (error) {
    console.log(error);
   }
  }
  return (
    <div className="App">
   <header className="app-header">
    <h1 className='title'>Los simpsons</h1>
    {characters ?(
      <Characters characters={characters} setCharacters={setCharacters} /> 
    ) : (
      <>
      <img src={simpsonsImage} alt='los simpsons' className='img-home'/>
      <button className='btn' onClick={getCharacters}>encuentra los persosajes</button>
      </>
    )}
    
   </header>
    </div>
  );
}

export default App;
