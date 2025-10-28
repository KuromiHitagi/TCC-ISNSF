import './index.scss'
import { FaHome, FaUserEdit, FaClipboardList, FaBriefcase, FaFileAlt, FaFacebook, FaInstagram,FaYoutube } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Footer() {
    let enable = false;
    const userEmail = localStorage.getItem("EMAIL")
    if(userEmail != undefined && userEmail != null&& userEmail != "") {
        enable = true;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
           className="Footer">
            <div className={`info1 ${enable ? "logged" : ""}`}>
                <p>Junte-se a nós e transforme sua carreira</p>
            </div>
            <div className="info2">
                <p>Política de privacidade</p>
                <p>Termos de Uso</p>
                <div className="social">
                    <p>Siga-nos em nossas redes sociais</p>
                    <div className="logo">
                        <a target='_blank' href="https://web.facebook.com/profile.php?id=61583085595766"><FaFacebook className="logo-icon" /></a>
                        <a target='_blank' href="https://www.instagram.com/tec.vagas/"><FaInstagram className="logo-icon" /></a>
                        <a target='_blank' href="https://www.youtube.com/@tecvagas"><FaYoutube className="logo-icon" /></a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}