import NavBar from '../../components/NavBar/navBar.jsx';
import './login.scss';

export default function Login() {
    return (
        <div className="Login">
            <NavBar />

            <section className="cadastro">
                <h2>Cadastro</h2>
                <form>
                    <input type="text" placeholder="Nome" required />
                    <input type="text" placeholder="Idade" required />
                    <input type="text" placeholder="CPF" required />
                    <input type="text" placeholder="Área de Interesse" required />
                    <input type="email" placeholder="E-mail" required />
                    <button type="submit">Junte-se à TEC.VAGAS</button>
                </form>
            </section>

        </div>
    )
}