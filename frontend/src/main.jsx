import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.scss'
import Home from './pages/home/home.jsx';
import About from './pages/about/about.jsx';
import Form from './pages/form/form.jsx';
import Login from './pages/login/login.jsx';
import Register from './pages/register/register.jsx'
import Search from './pages/search/search.jsx';
import Guia from './pages/guia/guia.jsx';
import Curriculo from './pages/curriculo/curriculo.jsx';


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path='/form' element={<Form/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/guia' element={<Guia/>}/>
            <Route path='/curriculo' element={<Curriculo/>}/>
        </Routes>
    </BrowserRouter >
)
