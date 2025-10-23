import NavBar from '../../components/NavBar/navBar.jsx'
import Footer from '../../components/Footer/index.jsx'
import './home.scss'

export default function Home() {
    return(
        <div className="Home">
            <NavBar/>
            <div className="main">
                <h1>Bem-Vindo ao teste Vocacional</h1>
            </div>
            <Footer/>
        </div>
    )
}