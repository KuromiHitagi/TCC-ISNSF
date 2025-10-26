import NavBar from '../../components/NavBar/navBar.jsx';
import { Link, useNavigate } from 'react-router-dom'
import './login.scss';
import Footer from '../../components/Footer/index.jsx';
import { useEffect, useState } from 'react';
import api from '../../api.js';
import { signInWithGoogle } from '../../firebase.js';

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

            // Tentar login como usuário primeiro
            try {
                const response = await api.post('/usuario/login', body)
                const userEmail = email;
                const userToken = response.data.token;

                localStorage.setItem("EMAIL", userEmail);
                localStorage.setItem("TOKEN", userToken);
                localStorage.setItem("USER_TYPE", "usuario");

                Navigate('/');
                return;
            } catch {
                // Se falhar como usuário, tentar como empresa
                try {
                    const response = await api.post('/empresa/login', body)
                    const userEmail = email;
                    const userToken = response.data.token;

                    localStorage.setItem("EMAIL", userEmail);
                    localStorage.setItem("TOKEN", userToken);
                    localStorage.setItem("USER_TYPE", "empresa");

                    Navigate('/');
                    return;
                } catch {
                    alert("Credenciais inválidas para usuário ou empresa");
                }
            }
        }
        catch {
            alert("Erro no login");
        }
    }

    async function loginWithGoogle() {
        try {
            const result = await signInWithGoogle();

            if (result) {
                // Popup method succeeded
                const { token: idToken, user } = result;

                // Enviar o token para o backend para verificação
                const response = await api.post('/auth/google/verify', { idToken });

                const userEmail = user.email;
                const userToken = response.data.token;
                const userType = response.data.tipo; // Receber o tipo da conta

                localStorage.setItem("EMAIL", userEmail);
                localStorage.setItem("TOKEN", userToken);
                localStorage.setItem("USER_TYPE", userType); // Salvar o tipo da conta

                Navigate('/');
            } else {
                alert('Erro inesperado no login com Google.');
            }
        } catch (error) {
            console.error('Erro no login com Google:', error);

            if (error.code === 'auth/popup-blocked') {
                alert('Popups estão bloqueados. Permita popups e tente novamente.');
            } else if (error.code === 'auth/popup-closed-by-user') {
                alert('Autenticação cancelada. Tente novamente.');
            } else if (error.code === 'auth/cancelled-popup-request') {
                alert('Solicitação cancelada. Tente novamente.');
            } else {
                alert('Erro no login com Google. Tente novamente.');
            }
        }
    }

    return (
        <div>
            <NavBar />

            <div className="main">

                <h2>Login</h2>

                <form onSubmit={(e) => { e.preventDefault(); login(); }} className='login-form'>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-mail: " required />
                    <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" placeholder="Senha: " required />
                    <button className="butão" type="submit">Entrar</button>
                </form>

                <p>Ou entre com o</p>
                <button className='google-button' onClick={loginWithGoogle}>
                    <img src="/img/" alt="google-button" />
                </button>

                <Link className="butão" to="/register">Cadastrar-se</Link>
            </div>

            <Footer />
        </div>
    )
}
