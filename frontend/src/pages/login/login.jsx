import NavBar from '../../components/NavBar/navBar.jsx';
import { Link } from 'react-router-dom'
import './login.scss';

export default function Login() {
    return (
        <div className="Login">
            <NavBar />

            <section className="cadastro">
                <h2>Login</h2>
                <form>
                    <input type="email" placeholder="E-mail" required />
                    <input type="text" placeholder="Nome" required />
                    
                    
                    <button className="butão" type="submit">Entrar</button>
                    
                    <Link className="butão" to="/register">Cadastrar-se</Link>
                    
                </form>
            </section>

        </div>
    )
}
