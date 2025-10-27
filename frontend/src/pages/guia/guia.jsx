import NavBar from '../../components/NavBar/navBar.jsx';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import './guia.scss';

const Guia = () => {
    return(
        <div>
            <NavBar/>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
               className="Guia">
                <h1>Guia</h1>
            </motion.div>
        </div>
    )
}

export default Guia;