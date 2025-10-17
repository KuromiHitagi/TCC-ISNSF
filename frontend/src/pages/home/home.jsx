import NavBar from '../../components/NavBar/navBar.jsx'
import Footer from '../../components/Footer/index.jsx'
import './home.scss'

export default function Home() {
    return(
        <div className="Home">
            <NavBar/>
            <h1>Bem-Vindo ao teste Vocacional</h1>
            <Footer/>
        </div>
    )
}