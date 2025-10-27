import NavBar from '../../components/NavBar/navBar.jsx';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import './search.scss';

const Search = () => {
    return(
        <div>
            <NavBar/>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}>
            <div className="Search">
                <h1>Sobre</h1>
            </div>
            </motion.div>
        </div>
    )
}

export default Search;