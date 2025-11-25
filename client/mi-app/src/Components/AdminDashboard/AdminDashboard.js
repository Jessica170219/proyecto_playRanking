import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../Stylesheets/DashBoard.css';

const AdminDashBoard = () => {
    const navigate = useNavigate();

  //Recuperamos el usuario guardado en localStorage
    const storedUser = localStorage.getItem('user');
    const usuario = storedUser ? JSON.parse(storedUser) : {}; 

    const nombre = usuario.nombre; 
  const email = usuario.email; 
  
  //Mostramos los rankings en el dashboard
  const [rankings, setRankings] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:4000/api/rankings')
      .then(res => res.json())
      .then(data => setRankings(data))
      .catch(error => console.log('Error al cargar ranking', error))
  }, []); 



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
          <a href="/admin/rankings" className="sidebar-link"><span>⭐</span> Rankings</a>
          
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

      {/* PANEL PRINCIPAL ADMIN */}
      <main className="dashboard-main">
        <section className='profile'>
          <h2>Hola, {nombre}. (Administrador)</h2>
        </section>

        {/* Rankings activos */}
        <section className="stats-summary-card admin-rankings-card">
          <h2>Rankings activos</h2>
          <div className='ranking-activos-list'>
            {rankings.length === 0 ? (
              <div>No hay rankings activos.</div>
            ) : (
              rankings.map(r => (
                <div key={r._id || r.id}>
                  <strong>{r.nombreRanking}</strong> : {r.parejas} parejas : {r.estado}
                </div>
              ))
            )}
            </div>
            <button
              className="btn-edit-match"
              onClick={()=> navigate('/admin/rankings')}>Crear nuevo ranking</button>

        </section>

        

        {/* Calendario partidos */}
        <section className="calendar-card admin-calendar-card">
          <h2>Calendario de partidos</h2>
          {/* Aquí iría tu componente calendario */}
          <div className="calendar-placeholder">[Calendario aquí]</div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashBoard;
