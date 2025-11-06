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
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({});
    const [enableuser, setEnableuser] = useState(false);
    const [enableInc, setEnableInc] = useState(false);
    const [candidaturas, setCandidaturas] = useState([]);
    const [showCandidaturas, setShowCandidaturas] = useState(false);
    const [vagas, setVagas] = useState([]);
    const [showVagas, setShowVagas] = useState(false);
    const [selectedVaga, setSelectedVaga] = useState(null);

    useEffect(() => {
        const userEmail = localStorage.getItem("EMAIL");
        const userType = localStorage.getItem("USER_TYPE");
        if(userEmail == null || userEmail == undefined || userEmail == "") {
            Navigate('/');
            return;
        }

        // Definir tipo de usuário
        if(userType === "usuario") {
            setEnableuser(true);
            setEnableInc(false);
        } 
        if(userType === "empresa") {
            setEnableuser(false);
            setEnableInc(true);
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
        const confirmLogout = window.confirm("Tem certeza que deseja sair?");
        if (confirmLogout) {
            window.location.reload();
            localStorage.removeItem("EMAIL");
            localStorage.removeItem("NOME")
            localStorage.removeItem("TOKEN");
            localStorage.removeItem("USER_TYPE");
        }
    };

    async function exibirCandidaturas() {
        try {
            const response = await api.get('/candidatura/usuario/minhas');
            setCandidaturas(response.data);
            setShowCandidaturas(true);
            console.log('Candidaturas:', response.data);
        } catch (error) {
            console.error('Erro ao carregar candidaturas:', error);
            alert('Erro ao carregar candidaturas. Tente novamente.');
        }
    }

    async function exibirVagas() {
        try {
            const response = await api.get('/vaga/empresa/minhas');
            setVagas(response.data);
            setShowVagas(true);
            console.log('Vagas:', response.data);
        } catch (error) {
            console.error('Erro ao carregar vagas:', error);
            alert('Erro ao carregar vagas. Tente novamente.');
        }
    }

    async function verDetalhesVaga(idVaga) {
        try {
            const response = await api.get(`/candidatura/vaga/detalhes/${idVaga}`);
            setSelectedVaga(response.data);
            console.log('Detalhes da vaga:', response.data);
        } catch (error) {
            console.error('Erro ao carregar detalhes da vaga:', error);
            alert('Erro ao carregar detalhes da vaga. Tente novamente.');
        }
    }

    const handleSaveProfile = async () => {
        try {
            const userType = localStorage.getItem("USER_TYPE");
            const endpoint = userType === "usuario" ? "/usuario/perfil" : "/empresa/perfil";

            const response = await api.put(endpoint, editFormData);
            if (response.status === 200) {
                alert("Perfil atualizado com sucesso!");
                setShowEditModal(false);
                // Recarregar perfil
                const userEmail = localStorage.getItem("EMAIL");
                loadProfile(userType, userEmail);
                // Atualizar localStorage se o email mudou
                if (editFormData.email !== userProfile.email) {
                    localStorage.setItem("EMAIL", editFormData.email);
                }
                if (editFormData.nome !== userProfile.nome) {
                    localStorage.setItem("NOME", editFormData.nome);
                }
            }
        } catch (error) {
            console.error("Erro ao salvar perfil:", error);
            alert("Erro ao salvar perfil. Tente novamente.");
        }
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
                        <button onClick={() => { setEditFormData(userProfile); setShowEditModal(true); }} className="edit-button">Editar Perfil</button>
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

                {showEditModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Editar Perfil</h3>
                            <div className="edit-form">
                                <div className="form-group">
                                    <label htmlFor="nome">Nome:</label>
                                    <input
                                        type="text"
                                        id="nome"
                                        value={editFormData?.nome || ''}
                                        onChange={(e) => setEditFormData({ ...editFormData, nome: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={editFormData?.email || ''}
                                        onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                    />
                                </div>
                                {enableuser && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="cidade">Cidade:</label>
                                            <input
                                                type="text"
                                                id="cidade"
                                                value={editFormData?.cidade || ''}
                                                onChange={(e) => setEditFormData({ ...editFormData, cidade: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="telefone">Telefone:</label>
                                            <input
                                                type="text"
                                                id="telefone"
                                                value={editFormData?.telefone || ''}
                                                onChange={(e) => setEditFormData({ ...editFormData, telefone: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="area_interesse">Área de Interesse:</label>
                                            <input
                                                type="text"
                                                id="area_interesse"
                                                value={editFormData?.area_interesse || ''}
                                                onChange={(e) => setEditFormData({ ...editFormData, area_interesse: e.target.value })}
                                            />
                                        </div>
                                    </>
                                )}
                                {enableInc && (
                                    <div className="form-group">
                                        <label htmlFor="area_profissional">Área Profissional:</label>
                                        <input
                                            type="text"
                                            id="area_profissional"
                                            value={editFormData?.area_profissional || ''}
                                            onChange={(e) => setEditFormData({ ...editFormData, area_profissional: e.target.value })}
                                        />
                                    </div>
                                )}
                                <div className="modal-buttons">
                                    <button onClick={handleSaveProfile} className="upload-button">Salvar</button>
                                    <button onClick={() => setShowEditModal(false)} className="cancel-button">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {enableuser && (
                    <button className="exibir-Candidaturas logged" onClick={exibirCandidaturas}>Exibir Candidaturas</button>
                )}
                {enableInc && (
                    <button className="exibir-minhasVagas logged" onClick={exibirVagas}>Exibir minhas Vagas</button>
                )}

                {showCandidaturas && candidaturas.length > 0 && (
                    <div className="candidaturas-list">
                        <div className="titulo">
                            <h3>Minhas Candidaturas</h3>
                        </div>
                        {candidaturas.map((candidatura) => (
                            <div key={candidatura.id} className="candidatura-item">
                                <div className="info">
                                    <p><strong>Vaga:</strong> {candidatura.vaga_titulo}</p>
                                    <p><strong>Empresa:</strong> {candidatura.empresa}</p>
                                    <p><strong>Localização:</strong> {candidatura.localizacao}</p>
                                    <p><strong>Status:</strong> {candidatura.status}</p>
                                    <p><strong>Data da Candidatura:</strong> {new Date(candidatura.data_candidatura).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showCandidaturas && candidaturas.length === 0 && (
                    <p>Você ainda não se candidatou a nenhuma vaga.</p>
                )}

                {showVagas && vagas.length > 0 && (
                    <div className="vagas-list">
                        <h3>Minhas Vagas</h3>
                        {vagas.map((vaga) => (
                            <div key={vaga.id} className="vaga-item">
                                <div className="titulo">
                                    <h4>{vaga.titulo}</h4>
                                </div>
                                <div className="info">
                                    <p><strong>Descrição:</strong> {vaga.descricao}</p>
                                    <p><strong>Localização:</strong> {vaga.localizacao}</p>
                                    <p><strong>Salário:</strong> R$ {vaga.salario}</p>
                                    <p><strong>Data de Publicação:</strong> {new Date(vaga.data_publicacao).toLocaleDateString()}</p>
                                    <div className="btn">
                                        <button className="btn-cand" onClick={() => verDetalhesVaga(vaga.id)}>Ver Candidatos</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showVagas && vagas.length === 0 && (
                    <p>Você ainda não criou nenhuma vaga.</p>
                )}

                {selectedVaga && (
                    <div className="modal-overlay" onClick={() => setSelectedVaga(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>Detalhes da Vaga: {selectedVaga.vaga.titulo}</h3>
                            <div className="vaga-details">
                                <p><strong>Descrição:</strong> {selectedVaga.vaga.descricao}</p>
                                <p><strong>Localização:</strong> {selectedVaga.vaga.localizacao}</p>
                                <p><strong>Salário:</strong> R$ {selectedVaga.vaga.salario}</p>
                                <p><strong>Data de Publicação:</strong> {new Date(selectedVaga.vaga.data_publicacao).toLocaleDateString()}</p>
                            </div>
                            <h4>Candidatos:</h4>
                            {selectedVaga.candidatos.length > 0 ? (
                                <div className="candidatos-list-modal">
                                    {selectedVaga.candidatos.map((candidato) => (
                                        <div key={candidato.candidatura_id} className="candidato-item">
                                            <div className="candidato-photo">
                                                {candidato.user_foto ? (
                                                    <img src={`${api.defaults.baseURL}/storage/${candidato.user_foto}`} alt="Foto do candidato" />
                                                ) : (
                                                    <span>👤</span>
                                                )}
                                            </div>
                                            <div className="candidato-info">
                                                <p><strong>Nome:</strong> {candidato.nome}</p>
                                                <p><strong>Email:</strong> {candidato.email}</p>
                                                <p><strong>Data de Nascimento:</strong> {new Date(candidato.data_nascimento).toLocaleDateString()}</p>
                                                <p><strong>Cidade:</strong> {candidato.cidade}</p>
                                                <p><strong>Telefone:</strong> {candidato.telefone}</p>
                                                <p><strong>Status:</strong> {candidato.status}</p>
                                                <p><strong>Data da Candidatura:</strong> {new Date(candidato.data_candidatura).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Nenhum candidato ainda.</p>
                            )}
                            <button onClick={() => setSelectedVaga(null)} className="cancel-button">Fechar</button>
                        </div>
                    </div>
                )}
            </motion.div>
            <Footer />
        </div>
    )
}

export default Perfil;
