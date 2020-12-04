import React, { useEffect, useState } from "react";

import "./style.css";

export default function Personagem() {
  const [personagens, setPersonagens] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    fetch("https://swapi.dev/api/people/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPersonagens(result.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    console.log(personagens);
    return (
      <div id="personagens">
        { personagens.map(p => (
          <div class="personagem">
            <p style={{color: p.eye_color}}>
              {p.name}
            </p>
            <button onClick={(e) => removerPersonagem(p.name)}>Remover</button>
          </div>
        ))}
        <div>
          <select id="dropdown">
            { personagens.map(p => (
              <option value={p.name}>{p.name}</option>
            ))}
          </select>
          <button onClick={e => removerPersonagem(document.getElementById("dropdown").value)}>
            Remover
          </button>
        </div>
      </div>
    );
  }

  function removerPersonagem(nome) {
    setPersonagens(personagens.filter(({name})=> name != nome));
  }
}
