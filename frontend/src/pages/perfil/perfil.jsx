import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../../components/NavBar/navBar.jsx'
import Footer from '../../components/Footer/index.jsx';
import api from '../../services/api.js';
import './perfil.scss'
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Perfil = () => {
    const Navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPhotoModal, setShowPhotoModal] = useState(false);

    useEffect(() => {
        const userEmail = localStorage.getItem("EMAIL");
        const userType = localStorage.getItem("USER_TYPE");
        if(userEmail == null || userEmail == undefined || userEmail == "") {
            Navigate('/');
            return;
        }

        // Carregar dados do perfil
        loadProfile(userType, userEmail);
    }, [Navigate]);

    const loadProfile = async (userType, userEmail) => {
        try {
            const endpoint = userType === "usuario" ? "/usuario/perfil" : "/empresa/perfil";
            const response = await api.get(`${endpoint}?email=${userEmail}`);
            if (response.status === 200) {
                setUserProfile(response.data);
            }
        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
        }
    };

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
            const userType = localStorage.getItem("USER_TYPE");
            const formData = new FormData();
            formData.append(userType === "usuario" ? "foto_usuario" : "foto_empresa", selectedFile);

            const endpoint = userType === "usuario" ? "/usuario/foto" : "/empresa/foto";
            const response = await api.post(endpoint, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                alert("Foto de perfil atualizada com sucesso!");
                setShowPhotoModal(false);
                setSelectedFile(null);
                setPreview(null);
                // Recarregar perfil
                const userEmail = localStorage.getItem("EMAIL");
                loadProfile(userType, userEmail);
                window.location.reload();
            }
        } catch (error) {
            console.error("Erro ao fazer upload:", error);
            alert("Erro ao fazer upload da foto. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const sair = () => {
        window.location.reload();
        localStorage.removeItem("EMAIL");
        localStorage.removeItem("NOME")
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("USER_TYPE");
    };

    return(
        <div>
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="main">
                <div className="profile-container">
                    <div className="profile-header">
                        <div className="profile-photo">
                            {userProfile?.user_foto || userProfile?.empresa_foto ? (
                                <img src={`${api.defaults.baseURL}/storage/${userProfile.user_foto || userProfile.empresa_foto}`} alt="Foto de perfil" className="profile-image" />
                            ) : (
                                <div className="photo-placeholder">
                                    <span>👤</span>
                                </div>
                            )}
                        </div>
                        <div className="profile-info">
                            <h2>{userProfile?.nome || "Nome não disponível"}</h2>
                            <p>{userProfile?.email || "Email não disponível"}</p>
                            <p>Tipo: {localStorage.getItem("USER_TYPE") === "usuario" ? "Usuário" : "Empresa"}</p>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button onClick={() => setShowPhotoModal(true)} className="photo-button">
                            {userProfile?.user_foto || userProfile?.empresa_foto ? "Alterar Foto de Perfil" : "Adicionar Foto de Perfil"}
                        </button>
                        <button onClick={sair} className="logout-button">Sair</button>
                    </div>
                </div>

                {showPhotoModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>{userProfile?.user_foto || userProfile?.empresa_foto ? "Alterar" : "Adicionar"} Foto de Perfil</h3>

                            <div className="photo-upload">
                                <div className="photo-preview">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="preview-image" />
                                    ) : userProfile?.user_foto || userProfile?.empresa_foto ? (
                                        <img src={`${api.defaults.baseURL}/storage/${userProfile.user_foto || userProfile.empresa_foto}`} alt="Foto atual" className="preview-image" />
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
                                    id="photo-input-modal"
                                    style={{ display: "none" }}
                                />
                                <label htmlFor="photo-input-modal" className="file-button">
                                    Escolher Foto
                                </label>

                                <div className="modal-buttons">
                                    <button
                                        onClick={handleUpload}
                                        disabled={loading || !selectedFile}
                                        className="upload-button"
                                    >
                                        {loading ? "Enviando..." : "Confirmar"}
                                    </button>
                                    <button onClick={() => setShowPhotoModal(false)} className="cancel-button">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
            <Footer />
        </div>
    )
}

export default Perfil;
