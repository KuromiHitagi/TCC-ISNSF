import './index.scss'
import { FaHome, FaUserEdit, FaClipboardList, FaBriefcase, FaFileAlt, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="Footer">
            <div className="info1">
                <p>Junte-se a nós e transforme sua carreira</p>
            </div>
            <div className="info2">
                <p>Política de privacidade</p>
                <p>Termos de Uso</p>
                <div className="social">
                    <p>Siga-nos em nossas redes sociais</p>
                    <FaFacebook />
                    <FaInstagram />
                    <FaLinkedin />
                    <FaTwitter />
                </div>
            </div>
        </div>
    );
}