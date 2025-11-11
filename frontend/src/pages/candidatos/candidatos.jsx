import './candidatos.scss';
import Navbar from '../../components/NavBar/navBar.jsx';
import Footer from '../../components/Footer/index.jsx';
// eslint-disable-next-line no-unused-vars
import {motion} from 'framer-motion';
import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import { useNavigate } from 'react-router';

const Candidatos = () => {
    const [candidatos, setCandidatos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const Navigate = useNavigate();

    useEffect(() => {
        const userType = localStorage.getItem('USER_TYPE');
        if(userType !== 'empresa' && userType !== 'admin') {
            alert('Acesso negado! Você será redirecionado para a página inicial.');
            Navigate('/');
        }
    });

    async function mostrarCandidatos() {
        try {
            const response = await api.get('/candidatos');
            setCandidatos(response.data);
            setCurrentPage(1);
        } catch (error) {
            console.error('Erro ao carregar candidatos:', error);
            alert('Erro ao carregar candidatos. Por favor, tente novamente mais tarde.');
        }
    }
    return (
        <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}>

            <Navbar />
            <div className="main">
                <div className="candidato">
                    <button className='btn-Show' onClick={mostrarCandidatos}>Mostrar Candidatos</button>

                    {candidatos.length > 0 && (
                        <div className="candidatos-list-modal">
                            <div className="titulo">
                                <h3>Candidatos</h3>
                            </div>
                            <div className="itens">
                                {candidatos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((candidato) => (
                                    <div key={candidato.id} className="candidato-item">
                                        
                                        <div className="info">
                                            <div className="apresentacao">
                                                <div className="candidato-photo">
                                                    {candidato.user_foto ? (
                                                        <img src={`${api.defaults.baseURL}/storage/${candidato.user_foto}`} alt="Foto do candidato" />
                                                    ) : (
                                                        <span>👤</span>
                                                    )}
                                                </div>
                                                <div className="titulo">
                                                    <h4>{candidato.nome}</h4>
                                                </div>
                                            </div>
                                            <p><strong>Data de Nascimento:</strong> {new Date(candidato.data_nascimento).toLocaleDateString()}</p>
                                            <p><strong>Cidade:</strong> {candidato.cidade}</p>
                                            <p><strong>Telefone:</strong> {candidato.telefone}</p>
                                            <p><strong>Email:</strong><a target='_blank' href={`mailto:${candidato.email}`}>    {candidato.email}</a></p>
                                            <p><strong>Área de Interesse:</strong> {candidato.area_interesse}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {candidatos.length > itemsPerPage && (
                                <div className="pagination">
                                    <button
                                        className="pagination-btn"
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Anterior
                                    </button>
                                    <span>Página {currentPage} de {Math.ceil(candidatos.length / itemsPerPage)}</span>
                                    <button
                                        className="pagination-btn"
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage === Math.ceil(candidatos.length / itemsPerPage)}
                                    >
                                        Próxima
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </motion.div>
    );
}

export default Candidatos;