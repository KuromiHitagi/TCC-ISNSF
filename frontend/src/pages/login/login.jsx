import NavBar from '../../components/NavBar/navBar.jsx';
import { Link, useNavigate } from 'react-router-dom'
import './login.scss';
import Footer from '../../components/Footer/index.jsx';
import { useEffect, useState } from 'react';
import api from '../../api.js';

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const Navigate = useNavigate();

    useEffect(() => {
        const verify = localStorage.getItem("EMAIL");

        if(verify != null || verify != undefined && verify != "") {
            Navigate('/')
        }
    })

    async function login() {
        try{
            const body = {
                "email": email,
                "senha": senha
            }

            const response = await api.post('/gerarToken', body)
            const userEmail = response.data.email;
            const userToken = response.data.token;

            localStorage.setItem("EMAIL", userEmail);
            localStorage.setItem("TOKEN", userToken);

            alert(userEmail, userToken)
        }
        catch (error) {
            alert("Error", error)
        }
    }

    return (
        <div>
            <NavBar />

            <div className="main">

                <h2>Login</h2>

                <form onSubmit={login} className='login-form'>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-mail: " required />
                    <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" placeholder="Senha: " required />
                    <button className="butão" type="submit">Entrar</button>
                </form>

                <p>Ou entre com o</p>
                <button className='google-button'>
                    <img src="/img/" alt="google-button" />
                </button>
                
                <Link className="butão" to="/register">Cadastrar-se</Link>  
            </div>

            <Footer />
        </div>
    )
}
