import NavBar from '../../components/NavBar/navBar.jsx';
import Footer from '../../components/Footer/index.jsx'
import './register.scss';


export default function Register() {
  return (
    <div className="pagina-cadastro">

      <NavBar />

      <section className="cadastro">
        <h2>Cadastro</h2>
        <form>
          <input type="text" placeholder="Nome" required />
          <input type="text" placeholder="Idade" required />
          <input type="text" placeholder="CPF" required />
          <input type="text" placeholder="Área de Interesse" required />
          <input type="email" placeholder="E-mail" required />
          <input tupe="text" placeholder='Senha'required/>
          <button type="submit">Junte-se à TEC.VAGAS</button>
        </form>
      </section>

      <Footer />
    </div>
  );
}
