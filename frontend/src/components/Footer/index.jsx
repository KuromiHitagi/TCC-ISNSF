import './index.scss'
import { FaHome, FaUserEdit, FaClipboardList, FaBriefcase, FaFileAlt, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
    let enable = false;
    const userEmail = localStorage.getItem("EMAIL")
    if(userEmail != undefined && userEmail != null&& userEmail != "") {
        enable = true;
    }

    return (
        <div className="Footer">
            <div className={`info1 ${enable ? "logged" : ""}`}>
                <p>Junte-se a nós e transforme sua carreira</p>
            </div>
            <div className="info2">
                <p>Política de privacidade</p>
                <p>Termos de Uso</p>
                <div className="social">
                    <p>Siga-nos em nossas redes sociais</p>
                    <div className="logo">
                        <a target='_blank' href="#"><FaFacebook className="logo-icon" /></a>
                        <a target='_blank' href="#"><FaInstagram className="logo-icon" /></a>
                        <a target='_blank' href="#"><FaLinkedin className="logo-icon" /></a>
                        <a target='_blank' href="#"><FaTwitter className="logo-icon" /></a>                        
                    </div>
                </div>
            </div>
        </div>
    );
}