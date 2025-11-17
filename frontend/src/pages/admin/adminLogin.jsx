import NavBar from '../../components/NavBar/navBar.jsx';
import Footer from '../../components/Footer/index.jsx';
import api from '../../services/api.js';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import './adminLogin.scss';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const Navigate = useNavigate();

    useEffect(() => {
        const verify = localStorage.getItem("EMAIL");
        const userType = localStorage.getItem("USER_TYPE");

        if(verify && userType === "admin") {
            Navigate('/admin')
        }
    })

    async function login() {
        try{
            const body = {
                "email": email,
                "senha": senha
            }

            const response = await api.post('/login/admin', body)
            const userEmail = email;
            const userName = response.data.admin.nome;
            const userToken = response.data.token;

            localStorage.setItem("EMAIL", userEmail);
            localStorage.setItem("NOME", userName)
            localStorage.setItem("TOKEN", userToken);
            localStorage.setItem("USER_TYPE", "admin");

            Navigate('/admin');
        }
        catch {
            alert("Credenciais inválidas para administrador");
        }
    }

    return (
        <div>
            <NavBar />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                id="mainL">

                <h2>Login Administrador</h2>

                <form onSubmit={(e) => { e.preventDefault(); login(); }} className='login-form'>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="E-mail: " required />
                    <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" placeholder="Senha: " required />
                    <button className="butão-submit" type="submit">Entrar</button>
                </form>
            </motion.div>

            <Footer />
        </div>
    )
}

export default AdminLogin;
