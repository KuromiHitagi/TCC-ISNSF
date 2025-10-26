import { useEffect } from 'react';
import Navbar from '../../components/NavBar/navBar.jsx'
import './perfil.scss'
import { useNavigate } from 'react-router';

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
        localStorage.removeItem("TOKEN")
    }

    return(
        <div>
            <Navbar />
            <div className="main">
                <button onClick={sair}>Sair :D</button>
            </div>
        </div>    
    )
}