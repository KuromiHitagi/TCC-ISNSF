import './index.scss'
import { FaHome, FaUserEdit, FaClipboardList, FaBriefcase, FaFileAlt, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
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
                        <a target='_blank' href="#"><FaFacebook className="logo-icon" /></a>
                        <a target='_blank' href="#"><FaInstagram className="logo-icon" /></a>
                        <a target='_blank' href="#"><FaLinkedin className="logo-icon" /></a>
                        <a target='_blank' href="#"><FaTwitter className="logo-icon" /></a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}