import './postVagas.scss'
import Navbar from '../../components/NavBar/navBar.jsx';
import Footer from '../../components/Footer/index.jsx';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import api from '../../services/api.js'

const Vagas = () => {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [salario, setSalario] = useState("");
    const [showForm, setShowForm] = useState(false);

    
    async function PostarVagas() {
        const body = {
            "titulo": titulo,
            "descricao": descricao,
            "localizacao": localizacao,
            "salario": salario
        }
        await api.post('/vaga/criar', body)
        // Reload vagas after posting
        carregarVagas();
        // Optionally, reset form or show success message
        setShowForm(false);
    }

    const [vagas, setVagas] = useState([]);

    const carregarVagas = async () => {
        try {
            const response = await api.get('/vaga/usuario/minhas');
            setVagas(response.data);
        } catch (error) {
            console.error('Erro ao carregar vagas:', error);
        }
    };

    useEffect(() => {
        carregarVagas();
    }, []);


    function AtivarForm() {
        return(
            <div>
                <input value={titulo} onChange={(e) => setTitulo(e.target.value)} type="text" placeholder='Título:' required/>
                <input value={descricao} onChange={(e) => setDescricao(e.target.value)} type="text" placeholder='Descrição:' required/>
                <input value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} type="text" placeholder='Localização:' required/>
                <input value={salario} onChange={(e) => setSalario(e.target.value)} type="text" placeholder='Salário:' required/>

                <button onClick={PostarVagas}>Postar Vaga</button>
            </div>
        )
    }
    
    return(
        <div>
            <Navbar />  
        <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}>
                
                <div className='main'>
                    <h1>Postar Vagas</h1>
                    <h3>Esta página serve para disponibilizar vagas de emprego para os demais</h3>

                    <button onClick={() => setShowForm(true)}>Abrir Formulário</button>
                    {showForm && AtivarForm()}

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
                        </div>
                        </div>
                    ))}
                </div>
                </div>
            </motion.div>
            <Footer />
        </div>
        
    )
}

export default Vagas;