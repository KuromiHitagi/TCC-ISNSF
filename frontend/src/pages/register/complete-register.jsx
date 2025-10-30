import "./register.scss";
import NavBar from "../../components/NavBar/navBar.jsx";
import Footer from "../../components/Footer/index.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const CompleteRegister = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar tipo de usuário e token do localStorage
    const type = localStorage.getItem("USER_TYPE");
    const token = localStorage.getItem("TOKEN");
    if (!type || !token) {
      navigate("/register");
      return;
    }
    setUserType(type);
  }, [navigate]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Por favor, selecione uma foto primeiro.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append(userType === "usuario" ? "foto_usuario" : "foto_empresa", selectedFile);

      const endpoint = userType === "usuario" ? "/usuario/foto" : "/empresa/foto";
      const response = await api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": localStorage.getItem("TOKEN"),
        },
      });

      if (response.status === 200) {
        alert("Foto de perfil atualizada com sucesso!");
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      alert("Erro ao fazer upload da foto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const skipUpload = () => {
    navigate("/");
  };

  return (
    <div>
      <NavBar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="main">
          <div className="complete-register">
            <h2>Complete seu Cadastro</h2>
            <p>Adicione uma foto de perfil para personalizar sua conta.</p>

            <div className="photo-upload">
              <div className="photo-preview">
                {preview ? (
                  <img src={preview} alt="Preview" className="preview-image" />
                ) : (
                  <div className="placeholder">
                    <span>📷</span>
                    <p>Nenhuma foto selecionada</p>
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                id="photo-input"
                style={{ display: "none" }}
              />
              <label htmlFor="photo-input" className="file-button">
                <button>
                Escolher Foto
                </button>
              </label>

              <div className="buttons">
                <button
                  onClick={handleUpload}
                  disabled={loading || !selectedFile}
                  className="upload-button"
                >
                  {loading ? "Enviando..." : "Confirmar Foto"}
                </button>
                <button onClick={skipUpload} className="skip-button">
                  Colocar Foto de Perfil Depois
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default CompleteRegister;
