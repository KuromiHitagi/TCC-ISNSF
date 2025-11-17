import React from "react";
import './politicatermos.scss'
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Footer from "../../components/Footer/index.jsx";
import Navbar from "../../components/NavBar/navBar.jsx";

const TermosDeUso = () => {
  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="termos-container"
      >
      <h1>Termos de Uso – TecVagas</h1>
      <p>
        Estes Termos de Uso regulam a utilização da plataforma <strong>TecVagas</strong>, que conecta empresas e candidatos para fins de recrutamento e seleção.
        Ao acessar e utilizar nossos serviços, você concorda integralmente com as condições aqui descritas.
      </p>

      <h2>1. Objeto</h2>
      <p>
        A TecVagas oferece uma plataforma digital onde empresas podem publicar vagas e candidatos podem se inscrever nelas,
        permitindo a intermediação do contato entre as partes.
      </p>

      <h2>2. Cadastro e Responsabilidade dos Usuários</h2>
      <ul>
        <li>O uso da plataforma requer o fornecimento de informações verdadeiras, completas e atualizadas;</li>
        <li>É proibido o uso de dados falsos ou de terceiros sem autorização;</li>
        <li>O usuário é responsável por manter a confidencialidade de seu login e senha;</li>
        <li>A TecVagas não se responsabiliza por informações incorretas fornecidas por candidatos ou empresas.</li>
      </ul>

      <h2>3. Obrigações da TecVagas</h2>
      <p>
        A TecVagas compromete-se a manter a plataforma disponível, segura e em conformidade com a LGPD.
        Contudo, não garante contratações ou resultados específicos entre empresas e candidatos.
      </p>

      <h2>4. Direitos de Propriedade Intelectual</h2>
      <p>
        Todo o conteúdo da plataforma (layout, marca, design e código) é de propriedade da TecVagas. 
        É proibida a reprodução ou cópia sem autorização expressa.
      </p>

      <h2>5. Privacidade e Proteção de Dados</h2>
      <p>
        O tratamento de dados pessoais segue as regras descritas em nossa{" "}
        <a href="/politica-de-privacidade">Política de Privacidade</a>.
      </p>

      <h2>6. Limitação de Responsabilidade</h2>
      <p>
        A TecVagas atua apenas como intermediadora tecnológica e não se responsabiliza por decisões de contratação,
        veracidade de informações publicadas ou condutas de usuários.
      </p>

      <h2>7. Alterações nos Termos</h2>
      <p>
        A TecVagas pode alterar estes Termos a qualquer momento. As atualizações entrarão em vigor a partir da data de publicação.
      </p>

      <h2>8. Disposições Finais</h2>
      <p>
        Qualquer disputa relacionada a estes Termos será resolvida conforme as leis brasileiras,
        sendo o foro da comarca de residência do usuário o competente para dirimir controvérsias.
      </p>

      <p><strong>Última atualização:</strong> 31 de Outubro de 2025</p>
    </motion.div>
      <Footer />
    </div>
  );
}

export default TermosDeUso;