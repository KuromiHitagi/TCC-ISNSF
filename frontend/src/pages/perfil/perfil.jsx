import { useEffect } from 'react';
import Navbar from '../../components/NavBar/navBar.jsx'
import './perfil.scss'
import { useNavigate } from 'react-router';
import Footer from '../../components/Footer/index.jsx';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Perfil = () => {
    const Navigate = useNavigate()
    
    useEffect(() => {
        const userEmail = localStorage.getItem("EMAIL");
        if(userEmail == null || userEmail == undefined || userEmail == "") {
            Navigate('/')
        }
    })
    
    async function sair() {
        window.location.reload();
        localStorage.removeItem("EMAIL");
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("USER_TYPE");
    }

    return(
        <div>
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="main">
                <button onClick={sair}>Sair :D</button>
            </motion.div>
            <Footer />
        </div>
    )
}

export default Perfil;