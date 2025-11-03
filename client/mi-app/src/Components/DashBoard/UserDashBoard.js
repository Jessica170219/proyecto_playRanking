import { React, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../../Stylesheets/DashBoard/UserDashBoard.css';


const UserDashBoard = () => {
    const navigate = useNavigate();
    return (
        <div className="dashboard-container">
          
            <nav className="dashboard-nav">
                <div className="dashboard-logo">PlayRanking </div>
                <ul>
                    <li className="nav-item active">
                    
                        <span>Calendario</span>
                    </li>
                    <li className="nav-item">
                        
                        <span>Estadísticas</span>
                    </li>
                    
                    <li className="nav-item">
                        
                        <span>Partidos</span>
                    </li>
                    <li className="nav-item">
                        
                        <span>Perfil</span>
                    </li>
                    
                </ul>
                <li className="nav-item logout-item"
                        onClick={() => {
                            localStorage.removeItem('user');
                            navigate('/login');
                        }}>
                        
                        <span>Cerrar sesión</span>
                    </li>
            </nav>

      {/* PANEL PRINCIPAL */}
        <main className="dashboard-main">
            <section className='profile'>
                 <h2> Hola, [nombre]</h2>   
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