import './postVagas.scss'
import Navbar from '../../components/NavBar/navBar.jsx';
import Footer from '../../components/Footer/index.jsx';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useState } from 'react';
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
        // Optionally, reset form or show success message
        setShowForm(false);
    }

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
                </div>
            </motion.div>
            <Footer />
        </div>
        
    )
}

export default Vagas;