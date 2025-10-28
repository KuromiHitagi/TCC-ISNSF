import './postVagas.scss'
import Navbar from '../../components/NavBar/navBar.jsx';
import Footer from '../../components/Footer/index.jsx';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';


const Vagas = () => {
    return(
        <div>
            <Navbar />  
        <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}>
                
                <div className='main'>
                    <h1>Postar Vagas</h1>
                </div>
            </motion.div>
            <Footer />
        </div>
        
    )
}

export default Vagas;