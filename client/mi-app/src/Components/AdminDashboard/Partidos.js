import { useNavigate } from 'react-router-dom';

const Partidos = () => {
    
    const navigate = useNavigate();

  //Recuperamos el usuario guardado en localStorage
    const storedUser = localStorage.getItem('user');
    const usuario = storedUser ? JSON.parse(storedUser) : {}; 

    const nombre = usuario.nombre; 
    const email = usuario.email; 


    return (
        <div className="dashboard-container">
           {/* Lateral igual al usuario normal */}
            <aside className="sidebar">
              <div className="sidebar-header">
              <span className="sidebar-logo" role="img" aria-label="tenis y pelota">🎾</span>
              <span className="sidebar-title">PlayRanking</span>
              </div>

              <nav className="sidebar-menu">
                <a href="/admin-dashboard" className="sidebar-link active"><span>🏠</span> Home</a>
                <a href="/admin/partidos" className="sidebar-link"><span>🏓</span> Partidos</a>
                <a href="/admin/rankings" className="sidebar-link"><span>⭐</span> Rankings</a>
                <a href="/admin/gestion" className="sidebar-link"><span>⚙️</span> Gestión</a>
              </nav>

              <div className='sidebar-profile'>
                <div className='sidebar-profile-row'>
                    <div>
                    <div className="sidebar-username">{nombre}</div>
                    <div className="sidebar-email">{email}</div>
                    </div>
                    <button
                    className="logout-btn"
                    onClick={() => {
                        localStorage.removeItem('user');
                        navigate('/login');
                    }}>...</button>
                </div>
                </div>
        </aside>
      </div>
    );
};

export default Partidos; 