import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import About from "./pages/about/about.jsx";
import Form from "./pages/form/form.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import CompleteRegister from "./pages/register/complete-register.jsx";
import Vagas from "./pages/vagas/postVagas.jsx";
import SearchVagas from "./pages/vagas/Searchvagas.jsx";
import CompleteGoogleRegistration from "./pages/register/complete-google.jsx";
import Curriculo from "./pages/curriculo/curriculo.jsx";
import Perfil from "./pages/perfil/perfil.jsx";

const elements = document.querySelectorAll('.fade-in');

window.addEventListener('scroll', () => {
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('show');
    } else {
      el.classList.remove('show');
    }
  });
});

createRoot(document.getElementById('root')).render(
<StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<CompleteRegister />} />
        <Route
          path="/register/complete-google"
          element={<CompleteGoogleRegistration />}
        />
        <Route path="/postar_vagas" element={<Vagas />} />
        <Route path="/buscar_vagas" element={<SearchVagas />} />
        <Route path="/curriculo" element={<Curriculo />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
