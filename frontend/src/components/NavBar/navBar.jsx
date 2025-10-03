import './navBar.scss';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return(
        <div className="NavBar">
            <div className="navImg">
                <Link to="/"><img className="linkImg" src="" alt="TecVagasLogo" /></Link>
            </div>
            <div className="navLinks">
                <Link to="/">Home</Link>
                <Link to="/about">Sobre</Link>
            </div>
        </div>
    )
}