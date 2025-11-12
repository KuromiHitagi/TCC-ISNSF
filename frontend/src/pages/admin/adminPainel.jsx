import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/navBar.jsx';
import Footer from '../../components/Footer/index.jsx';
import api from '../../services/api.js';
import './adminPainel.scss';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('usuarios');
    const [usuarios, setUsuarios] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [vagas, setVagas] = useState([]);
    const [candidaturas, setCandidaturas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAdmin = async () => {
            const email = localStorage.getItem("EMAIL");
            const userType = localStorage.getItem("USER_TYPE");

            if (userType !== "admin") {
                alert("Acesso negado. Apenas administradores podem acessar esta página.");
                window.location.href = "/";
                return;
            }

            try {
                const response = await api.get('/admin/verify', { params: { email } });
                if (!response.data.verified) {
                    alert("Acesso negado. Email não cadastrado como administrador.");
                    window.location.href = "/";
                } else {
                    fetchData();
                }
            } catch (error) {
                console.error("Erro ao verificar admin:", error);
                alert("Erro ao verificar permissões. Redirecionando para a página inicial.");
                window.location.href = "/";
            }
        };

        verifyAdmin();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usuariosRes, empresasRes, vagasRes, candidaturasRes] = await Promise.all([
                api.get('/admin/usuarios'),
                api.get('/admin/empresas'),
                api.get('/admin/vagas'),
                api.get('/admin/candidaturas')
            ]);
            setUsuarios(usuariosRes.data);
            setEmpresas(empresasRes.data);
            setVagas(vagasRes.data);
            setCandidaturas(candidaturasRes.data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (type, id) => {
        if (window.confirm(`Tem certeza que deseja deletar este ${type}?`)) {
            try {
                await api.delete(`/admin/${type}/${id}`);
                fetchData(); // Recarregar dados após deletar
            } catch (error) {
                console.error(`Erro ao deletar ${type}:`, error);
                alert(`Erro ao deletar ${type}`);
            }
        }
    };

    const renderTable = (data, columns, type) => (
        <table className="admin-table">
            <thead>
                <tr>
                    {columns.map(col => <th key={col.key}>{col.label}</th>)}
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id}>
                        {columns.map(col => <td key={col.key}>{item[col.key]}</td>)}
                        <td>
                            <button onClick={() => handleDelete(type, item.id)} className="delete-btn">Deletar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    if (loading) {
        return (
            <div>
                <NavBar />
                <div className="admin-container">
                    <h1>Painel de Administração</h1>
                    <p>Carregando...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            <div className="admin-container">
                <h1 className='titulo'>Painel de Administração</h1>
                <div className="admin-tabs">
                    <button onClick={() => setActiveTab('usuarios')} className={activeTab === 'usuarios' ? 'active' : ''}>Usuários</button>
                    <button onClick={() => setActiveTab('empresas')} className={activeTab === 'empresas' ? 'active' : ''}>Empresas</button>
                    <button onClick={() => setActiveTab('vagas')} className={activeTab === 'vagas' ? 'active' : ''}>Vagas</button>
                    <button onClick={() => setActiveTab('candidaturas')} className={activeTab === 'candidaturas' ? 'active' : ''}>Candidaturas</button>
                </div>
                <div className="admin-content">
                    {activeTab === 'usuarios' && renderTable(usuarios, [
                        { key: 'id', label: 'ID' },
                        { key: 'nome', label: 'Nome' },
                        { key: 'email', label: 'Email' },
                        { key: 'cpf', label: 'CPF' },
                        { key: 'cidade', label: 'Cidade' }
                    ], 'usuario')}
                    {activeTab === 'empresas' && renderTable(empresas, [
                        { key: 'id', label: 'ID' },
                        { key: 'nome', label: 'Nome' },
                        { key: 'email', label: 'Email' },
                        { key: 'cnpj', label: 'CNPJ' },
                        { key: 'area_profissional', label: 'Área' }
                    ], 'empresa')}
                    {activeTab === 'vagas' && renderTable(vagas, [
                        { key: 'id', label: 'ID' },
                        { key: 'titulo', label: 'Título' },
                        { key: 'empresa_nome', label: 'Empresa' },
                        { key: 'localizacao', label: 'Localização' },
                        { key: 'salario', label: 'Salário' }
                    ], 'vaga')}
                    {activeTab === 'candidaturas' && renderTable(candidaturas, [
                        { key: 'id', label: 'ID' },
                        { key: 'usuario_nome', label: 'Usuário' },
                        { key: 'vaga_titulo', label: 'Vaga' },
                        { key: 'status', label: 'Status' },
                        { key: 'data_candidatura', label: 'Data' }
                    ], 'candidatura')}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Admin;
