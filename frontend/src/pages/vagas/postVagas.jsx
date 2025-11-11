import './postVagas.scss'
import Navbar from '../../components/NavBar/navBar.jsx';
import Footer from '../../components/Footer/index.jsx';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import api from '../../services/api.js';
import { getCidades } from '../../services/cidades.js';

const Vagas = () => {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [salario, setSalario] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [vagas, setVagas] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [loadingCidades, setLoadingCidades] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Função pra validar texto (título e descrição)
    function validarTexto(texto) {
        const textoTrimmed = texto.trim();
        return textoTrimmed.length >= 2 && textoTrimmed.length <= 255;
    }

    // Puxa as vagas do usuário
    const carregarVagas = async () => {
        try {
            const response = await api.get('/vaga/usuario/minhas');
            setVagas(response.data);
            setCurrentPage(1);
        } catch (error) {
            console.error('Erro ao carregar vagas:', error);
        }
    };

    useEffect(() => {
        carregarVagas();
    }, []);

    // Puxa as cidades da API
    useEffect(() => {
        const loadCidades = async () => {
            try {
                const cidadesList = await getCidades();
                setCidades(cidadesList);
            } catch (error) {
                console.error("Erro ao carregar cidades:", error);
            } finally {
                setLoadingCidades(false);
            }
        };
        loadCidades();
    }, []);

    // Função principal de postagem com validação
    async function PostarVagas() {
        if (!validarTexto(titulo)) {
            alert("O título precisa ter entre 2 e 255 caracteres.");
            return;
        }

        if (!validarTexto(descricao)) {
            alert("A descrição precisa ter entre 2 e 255 caracteres.");
            return;
        }

        if (!localizacao) {
            alert("Selecione uma localização.");
            return;
        }

        const salarioNumero = parseInt(salario, 10);
        if (isNaN(salarioNumero) || salarioNumero < 1500) {
            alert("O salário deve ser no mínimo R$1500.");
            return;
        }

        const body = {
            titulo,
            descricao,
            localizacao,
            salario: salarioNumero
        };

        try {
            await api.post('/vaga/criar', body);
            carregarVagas();
            setShowForm(false);
            setTitulo("");
            setDescricao("");
            setLocalizacao("");
            setSalario("");
        } catch (error) {
            console.error('Erro ao postar vaga:', error);
        }
    }

    return (
        <div>
            <Navbar />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <div className='main'>
                    <h1>Postar Vagas</h1>
                    <h3>Esta página serve para disponibilizar vagas de emprego para os demais</h3>

                    <button 
                        className='btn-showForm' 
                        onClick={() => setShowForm(!showForm)}
                    >
                        Abrir / Fechar Formulário
                    </button>

                    <AnimatePresence>
                        {showForm && (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6 }}
                                className="pre-input"
                            >
                                <input
                                    className="input"
                                    value={titulo}
                                    minLength={2}
                                    maxLength={255}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    type="text"
                                    placeholder="Título:"
                                    required
                                />

                                <input
                                    className="input"
                                    value={descricao}
                                    minLength={2}
                                    maxLength={255}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    type="text"
                                    placeholder="Descrição:"
                                    required
                                />

                                <select
                                    value={localizacao}
                                    onChange={(e) => setLocalizacao(e.target.value)}
                                    required
                                >
                                    <option value="">-- Selecione uma cidade --</option>
                                    {loadingCidades ? (
                                        <option disabled>Carregando cidades...</option>
                                    ) : (
                                        cidades.map((cidadeNome, index) => (
                                            <option key={index} value={cidadeNome}>
                                                {cidadeNome}
                                            </option>
                                        ))
                                    )}
                                </select>

                                <input
                                    className="input"
                                    value={salario}
                                    onChange={(e) => {
                                        const onlyNums = e.target.value.replace(/\D/g, '');
                                        setSalario(onlyNums);
                                    }}
                                    type="text"
                                    min="1500"
                                    max="999999"
                                    pattern='^[1-9][0-9]*$'
                                    placeholder="Salário:"
                                    required
                                />

                                <button className="btn-postarVagas" onClick={PostarVagas}>
                                    Postar Vaga
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="vagas-list">
                        <h2>Suas Vagas:</h2>
                        <div className="itens">
                            {vagas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((vaga) => (
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
                                    </div>
                                </div>
                            ))}
                        </div>
                        {vagas.length > itemsPerPage && (
                            <div className="pagination">
                                <button
                                    className="pagination-btn"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Anterior
                                </button>
                                <span>Página {currentPage} de {Math.ceil(vagas.length / itemsPerPage)}</span>
                                <button
                                    className="pagination-btn"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === Math.ceil(vagas.length / itemsPerPage)}
                                >
                                    Próxima
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default Vagas;
