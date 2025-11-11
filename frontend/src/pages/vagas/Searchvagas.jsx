import "./searchVagas.scss";
import Navbar from "../../components/NavBar/navBar.jsx";
import Footer from "../../components/Footer/index.jsx";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import api from '../../services/api.js'
import { useState, useEffect } from 'react';
import SearchBar from './searchbar.jsx';

const SearchVagas = () => {
  const [vagas, setVagas] = useState([]);
  const [filteredVagas, setFilteredVagas] = useState([]);

  useEffect(() => {
    async function carregarVagas() {
      try {
        const response = await api.get('/vaga');
        setVagas(response.data);
        setFilteredVagas(response.data);
      } catch (error) {
        console.error('Erro ao carregar vagas:', error);
      }
    }
    carregarVagas();
  }, []);

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setFilteredVagas(vagas);
    } else {
      const filtered = vagas.filter(vaga =>
        vaga.titulo.toLowerCase().includes(query.toLowerCase()) ||
        vaga.empresa.toLowerCase().includes(query.toLowerCase()) ||
        vaga.descricao.toLowerCase().includes(query.toLowerCase()) ||
        vaga.localizacao.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredVagas(filtered);
    }
  };

  async function Candidatar(vagaId) {
    try {
      let yes = window.confirm('Tem certeza que deseja se candidatar a essa vaga?');
      if(yes === true) {
        await api.post('/candidatura', { vaga_id: vagaId });
        alert('Candidatura realizada com sucesso!');
      }
      else {
        alert('Candidatura cancelada.');
      }
    } catch (error) {
      console.error('Erro ao candidatar-se:', error);
      const errorMessage = error.response?.data?.erro || 'Erro ao se candidatar. Tente novamente.';
      alert(errorMessage);
    }
  }

  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}>
        
        <div id="mainV">
          <h1>Buscar Vagas</h1>
          <h3>Nessa página, todas as vagas criadas serão exibidas</h3>

        {/* Busca */}
        <SearchBar onSearch={handleSearch} placeholder="Pesquisar vagas por título, empresa, descrição ou localização" />
        
          <div className="vagas-list">
              {filteredVagas.map((vaga) => (
                <div key={vaga.id} className="vaga-item">
                  <div className="titulo">
                    <h4>{vaga.titulo}</h4>
                  </div>
                  <div className="info">
                    <p><strong>Empresa:</strong> {vaga.empresa}</p>
                    <p><strong>Descrição:</strong> {vaga.descricao}</p>
                    <p><strong>Localização:</strong> {vaga.localizacao}</p>
                    <p><strong>Salário:</strong> R${vaga.salario}</p>
                    <p><strong>Data de Publicação:</strong> {new Date(vaga.data_publicacao).toLocaleDateString()}</p>
                    <div className="btn">
                      <button onClick={() => Candidatar(vaga.id)} className="btn-cand">Candidatar-se</button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default SearchVagas;
