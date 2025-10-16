import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.scss'
import Home from './pages/home/home.jsx';
import About from './pages/about/about.jsx';
import NavBar from './components/NavBar/navBar.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path='/form' element={<Form/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/guia' element={<Guia/>}/>
            <Route path='/curriculo' element={<Curriculo/>}/>
            </Routes>
            </BrowserRouter >
)
