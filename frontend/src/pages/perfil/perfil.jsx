import { useEffect } from 'react';
import Navbar from '../../components/NavBar/navBar.jsx'
import './perfil.scss'
import { useNavigate } from 'react-router';
import Footer from '../../components/Footer/index.jsx';

export default function Perfil() {
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
            <div className="main">
                <button onClick={sair}>Sair :D</button>
            </div>
            <Footer />
        </div>    
    )
}