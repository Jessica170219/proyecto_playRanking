import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../Stylesheets/DashBoard.css';


const UserDashBoard = () => {
  const navigate = useNavigate();

  //Recuperamos el usuario guardado en localStorage
  const storedUser = localStorage.getItem('user');
  const usuario = storedUser ? JSON.parse(storedUser) : {}; 

  const nombre = usuario.nombre; 
  const email = usuario.email; 

  
  
    return (
        <div className="dashboard-container">
          <aside className="sidebar">
            <div className="sidebar-header">
              <span className="sidebar-logo" role="img" aria-label="tenis y pelota">🎾</span>
              <span className="sidebar-title">PlayRanking</span>
            </div>
          
            <nav className="sidebar-menu">
              <a href="/calendario" className="sidebar-link active"><span>📅</span> Calendario</a>
              <a href="/estadisticas" className="sidebar-link"><span>⭐</span> Estadísticas</a>
              <a href="/partidos" className="sidebar-link"><span>🏓</span> Partidos</a>
             <a href="/perfil" className="sidebar-link"><span>👤</span> Perfil</a>
            </nav>
          
            {/*Perfil */}
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
        

      {/* PANEL PRINCIPAL */}
        <main className="dashboard-main">
            <section className='profile'>
                 <h2> Hola, {nombre}</h2>   
            </section>   
        
        <section className="next-match-card">
          <h2>Próximo partido</h2>
          <div className="next-match-info">
            <p><strong>Fecha:</strong> 05/11/2025</p>
            <p><strong>Hora:</strong> 18:00</p>
            <p><strong>Rival:</strong> Club XYZ</p>
            <button className="btn-edit-match">Modificar</button>
          </div>
        </section>
        
     
        <section className="stats-summary-card">
          <h2>Resumen de estadísticas</h2>
          <div className="stats-summary-content">
            <div>Partidos jugados: <strong>22</strong></div>
            <div>Ganados: <strong>14</strong></div>
            <div>Perdidos: <strong>8</strong></div>
            <div>Ranking: <strong>8º</strong></div>
          </div>
        </section>

       
        <section className="calendar-card">
          <h2>Calendario</h2>
          {/* Aquí iría un calendario react (react-calendar, fullcalendar o personalizado) */}
          <div className="calendar-placeholder">[Calendario aquí]</div>
        </section>
      </main>
    </div>
  );
};

            
export default UserDashBoard;