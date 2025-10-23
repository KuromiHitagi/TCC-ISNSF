import NavBar from '../../components/NavBar/navBar.jsx';
import Footer from '../../components/Footer/index.jsx';
import './curriculo.scss';

export default function Curriculo() {
    return (
        <div>
            <NavBar />
            <div className="main">
                <h1>Crie o seu currículo</h1>

                <ol>
                    <li>Dados pessoais (nome, contato, cidade, links).</li>
                    <li>Objetivo profissional (tipo de vaga).</li>
                    <li>Resumo profissional (breve apresentação).</li>
                    <li>Formação acadêmica.</li>
                    <li>Experiência profissional.</li>
                    <li>Habilidades.</li>
                    <li>Cursos e certificações.</li>
                    <li>Idiomas.</li>
                    <li>Projetos e atividades extras (opcional).</li>
                </ol>
            </div>
            <Footer />
        </div>
    );
}
