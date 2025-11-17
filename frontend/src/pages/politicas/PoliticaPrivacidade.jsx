import React from "react";
import './politicatermos.scss'
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Footer from "../../components/Footer/index.jsx";
import Navbar from "../../components/NavBar/navBar.jsx";

const PoliticaPrivacidade= () => {
  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="politica-container"
      >
      <h1>Política de Privacidade – TecVagas</h1>
      <p>
        A <strong>TecVagas</strong> valoriza a sua privacidade e está comprometida com a proteção dos dados pessoais de todos os usuários da plataforma, sejam candidatos ou empresas.
        Esta Política explica, de forma clara e transparente, como coletamos, utilizamos, armazenamos e protegemos suas informações, em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/18)</strong>.
      </p>

      <h2>1. Dados Pessoais Coletados</h2>
      <h3>1.1. Candidatos</h3>
      <ul>
        <li>Dados de identificação: nome, e-mail, telefone, endereço, data de nascimento.</li>
        <li>Dados profissionais: histórico profissional, formação, qualificações e currículo.</li>
        <li>Interações com a plataforma: candidaturas e preferências de vagas.</li>
      </ul>

      <h3>1.2. Empresas</h3>
      <ul>
        <li>Dados da empresa: razão social, CNPJ, e-mail, telefone, endereço comercial.</li>
        <li>Dados de representantes: nome, cargo e e-mail de contato.</li>
        <li>Dados de vagas: título, descrição, requisitos e benefícios.</li>
      </ul>

      <h3>1.3. Dados de Navegação</h3>
      <p>
        Coletamos automaticamente informações como IP, tipo de navegador, sistema operacional e cookies, utilizados para melhorar sua experiência.
      </p>

      <h2>2. Finalidades do Tratamento</h2>
      <ul>
        <li>Gerenciar cadastros e perfis de usuários;</li>
        <li>Permitir candidaturas e comunicação entre candidatos e empresas;</li>
        <li>Melhorar a experiência e segurança da plataforma;</li>
        <li>Cumprir obrigações legais e contratuais.</li>
      </ul>

      <h2>3. Base Legal</h2>
      <p>
        O tratamento é realizado com base nas seguintes hipóteses: execução de contrato, cumprimento de obrigação legal, legítimo interesse e consentimento do titular.
      </p>

      <h2>4. Armazenamento e Segurança</h2>
      <p>
        A TecVagas adota medidas de segurança técnicas e administrativas para proteger seus dados contra acessos não autorizados, perdas ou vazamentos.
      </p>

      <h2>5. Compartilhamento de Dados</h2>
      <ul>
        <li>Com empresas recrutadoras, para análise de candidaturas;</li>
        <li>Com prestadores de serviços que auxiliam na operação da plataforma;</li>
        <li>Para cumprimento de obrigações legais, quando necessário.</li>
      </ul>

      <h2>6. Direitos dos Titulares</h2>
      <p>
        Você pode solicitar acesso, correção, exclusão ou portabilidade dos seus dados, além de revogar o consentimento a qualquer momento.
        Para isso, entre em contato pelo e-mail <a href="mailto:TecVagas076@gmail.com">tecvagas076@gmail.com</a>.
      </p>

      <h2>7. Retenção e Exclusão de Dados</h2>
      <p>
        Os dados são armazenados apenas pelo tempo necessário ao cumprimento das finalidades desta Política ou conforme exigido por lei.
      </p>

      <h2>8. Cookies</h2>
      <p>
        Utilizamos cookies para melhorar sua navegação e personalizar conteúdos. Você pode desativá-los nas configurações do navegador.
      </p>

      <h2>9. Alterações na Política</h2>
      <p>
        Esta Política pode ser atualizada periodicamente. Recomendamos que a consulte regularmente nesta página.
      </p>

      <h2>10. Contato</h2>
      <p>
        Em caso de dúvidas, entre em contato pelo e-mail{" "}
        <a href="mailto:TecVagas076@gmail.com">tecvagas076@gmail.com</a>.
      </p>

      <p><strong>Última atualização:</strong> 31 de Outubro de 2025</p>
    </motion.div>
      <Footer />
    </div>
  );
}

export default PoliticaPrivacidade;