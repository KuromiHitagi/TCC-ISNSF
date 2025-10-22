import Footer from '../../components/Footer/index.jsx';
import Navbar from '../../components/NavBar/navBar.jsx';
import './about.scss';

export default function About() {
    return(
        <div className="About">
            <Navbar />
            <h1>Sobre Nós</h1>

            <div className="info">
            <p>
            Em um mundo em constante transformação, a busca por empregos e talentos nunca foi tão desafiadora. Em 2023, surgiu o Tec Vagas, uma plataforma inovadora criada para conectar profissionais a oportunidades em diversas áreas.
            <br /><br />A ideia nasceu quando um grupo de amigos, com experiências variadas em recrutamento e tecnologia, percebeu que muitos candidatos enfrentavam dificuldades para encontrar vagas que realmente se alinhavam às suas habilidades e interesses. Eles sonhavam com um espaço onde pessoas de todas as profissões pudessem encontrar seu lugar no mercado de trabalho.
            <br /><br />Desde o início, a missão do Tec Vagas foi clara: democratizar o acesso a oportunidades de emprego, promovendo o crescimento profissional e a inclusão. Com uma interface intuitiva e recursos personalizados, a plataforma rapidamente se destacou, permitindo que usuários buscassem vagas em tempo real, além de oferecer dicas e conteúdos valiosos para aprimorar suas habilidades.
            </p>
            </div>

            <div className="info2">
                <div className="missoes">
                    <h2>Missão</h2>
                    <p>
                        <ul>
                            <li>
                                A TecVagas tem como objetivo preparar para o mercado de trabalho e novas oportunidades.
                            </li>
                            <li>
                                Promover novas experiências para o crescimento profissional e pessoal do candidato. 
                            </li>
                            <li>
                                E ajudar empresas a encontrar o profissional correto com rapidez e transparência.
                            </li>
                        </ul>
                   </p>
                </div>
                <div className="normas">
                    <h2>Normas</h2>
                    <p>
                        A TecVagas trabalha com transparência e honestidade. 
                        <br /><br />Valorizamos a diversidade e acreditamos que todos <br />devem ter oportunidades.
                        <br /><br />Para isso, buscamos compreender as necessidades <br />de cada profissional.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}