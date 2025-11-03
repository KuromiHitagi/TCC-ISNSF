import "./searchVagas.scss";
import Navbar from "../../components/NavBar/navBar.jsx";
import Footer from "../../components/Footer/index.jsx";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import api from '../../services/api.js'
import { useState, useEffect } from 'react';

const SearchVagas = () => {
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    async function carregarVagas() {
      try {
        const response = await api.get('/vaga');
        setVagas(response.data);
      } catch (error) {
        console.error('Erro ao carregar vagas:', error);
      }
    }
    carregarVagas();
  }, []);

  async function Candidatar(vagaId) {
    try {
      await api.post('/candidatura', { vaga_id: vagaId });
      alert('Candidatura realizada com sucesso!');
    } catch (error) {
      console.error('Erro ao candidatar-se:', error);
      alert('Erro ao se candidatar. Tente novamente.');
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
        <div className="navbar__search">
          <input type="text" placeholder="Pesquisar" className="navbar__search-input"/>
          <button aria-label="Pesquisar" className="navbar__search-button">🔎</button>
        </div>
        
          <div className="vagas-list">
              {vagas.map((vaga) => (
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
