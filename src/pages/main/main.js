import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/container';
import { Form, SubmitButton, List, Error } from './styles';


const HomePage = () => {
  const [newRepo, setNewRepo] = useState('')
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errMsg, setErrMsg] = useState('Repositrio não encontrado...')

  useEffect(()=>{
    if (repositories !== repositories){
      localStorage.setItem('repos', JSON.stringify(repositories))
    }
  },[repositories])

  useEffect(()=>{
    const fetchRep = () =>{
      const repositoriesStorage = localStorage.getItem('repos');
      if (repositoriesStorage){
        setRepositories(JSON.parse(repositoriesStorage))
      }
    }
    fetchRep();
  },[setRepositories]);


  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true)

    const msg = 'Repositório duplicado';
    try {
        const isExists = repositories.filter((r) =>
          r.fullName === newRepo
        );

        if (isExists.length > 0) throw msg;

        const res = await api.get(`/repos/${newRepo}`);

        const data = {
          name: res.data.fullName
        }

        setRepositories([...repositories, data])
        setNewRepo('')
        setError(false);

    }catch (e) {
      setError(true)
      setErrMsg(e === msg ? msg : 'Repositório duplicado')
    }

    setLoading(false)
  }

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={ event => setNewRepo(event.target.value)}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        {error && <Error>{errMsg}</Error>}
        <List>
          {repositories.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Detalhe
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
}

export default HomePage;
