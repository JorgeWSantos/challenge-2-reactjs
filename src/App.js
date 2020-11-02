import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
    .then(res => {
      setRepositories(res.data);
    })
  }, [])

  async function handleAddRepository() {
    
    const repositorie = {
      title : `Desafio ReactJS`,
      url : `urlLink`, 
      owner : "jorge",
      techs : ['node', 'react']
    };

    api.post('repositories', repositorie)
    .then(res => setRepositories([...repositories, res.data]))
    .catch(error => console.log(error));
  }

  async function handleRemoveRepository(id) {


    api.delete(`repositories/${id}`)
    .then(() => {

      const reposToStore = repositories.filter(repo => {
        return repo.id !== id;
      });

      setRepositories(reposToStore); 
    })
    .catch(error => console.log(error));
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => {
          return(
            <li key={repository.id}>

              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
