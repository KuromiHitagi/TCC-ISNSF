import Footer from '../../components/Footer/index.jsx';
import Navbar from '../../components/NavBar/navBar.jsx';
import './about.scss';

export default function About() {
    return(
        <div className="About">
            <Navbar />
            <h1>Sobre Nós</h1>

            <div className="info">
            <pre>
            Em um mundo em constante transformação, a busca por empregos e talentos nunca foi tão desafiadora. Em 2023, surgiu o Tec Vagas, <br />uma plataforma inovadora criada para conectar profissionais a oportunidades em diversas áreas.
            <br /><br />A ideia nasceu quando um grupo de amigos, com experiências variadas em recrutamento e tecnologia, percebeu que muitos candidatos <br />enfrentavam dificuldades para encontrar vagas que realmente se alinhavam às suas habilidades e interesses. Eles sonhavam com um <br />espaço onde pessoas de todas as profissões pudessem encontrar seu lugar no mercado de trabalho.
            <br /><br />Desde o início, a missão do Tec Vagas foi clara: democratizar o acesso a oportunidades de emprego, promovendo o crescimento <br />profissional e a inclusão. Com uma interface intuitiva e recursos personalizados, a plataforma rapidamente se destacou, <br />permitindo que usuários buscassem vagas em tempo real, além de oferecer dicas e conteúdos valiosos para aprimorar suas habilidades.
            </pre>
            </div>

            <div className="info2">
                <div className="missoes">
                    <h2>Missão</h2>
                    <pre>
                        A TecVagas tem como objetivo preparar para o <br />mercado de trabalho e novas oportunidades.
                        <br /><br />Promover novas experiências para o <br />crescimento profissional e pessoal do <br />candidato. 
                        <br /><br />E ajudar empresas a encontrar <br />o profissional correto com rapidez e <br />transparência.
                    </pre>
                </div>
                <div className="normas">
                    <h2>Normas</h2>
                    <pre>
                        A TecVagas trabalha com transparência e honestidade. 
                        <br /><br />Valorizamos a diversidade e acreditamos que todos <br />devem ter oportunidades.
                        <br /><br />Para isso, buscamos compreender as necessidades <br />de cada profissional.
                    </pre>
                </div>
            </div>
            <Footer />
        </div>
    )
}