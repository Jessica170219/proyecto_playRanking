import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../Stylesheets/DashBoard.css';
//Importamos FullCalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';


const AdminDashBoard = () => {
    const navigate = useNavigate();
    
  //Recuperamos el usuario guardado en localStorage
    const storedUser = localStorage.getItem('user');
    const usuario = storedUser ? JSON.parse(storedUser) : {}; 

    const nombre = usuario.nombre; 
    const email = usuario.email; 
  
  //Mostramos los rankings en el dashboard
  const [rankings, setRankings] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  
  useEffect(() => {
    fetch('http://localhost:4000/api/rankings')
      .then(res => res.json())
      .then(data => setRankings(data))
      .catch(error => console.log('Error al cargar ranking', error))
  }, []); 

  useEffect(() => {
  const fetchTodosPartidos = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/partidos'); 

      if (!res.ok) {
        throw new Error(`Error al obtener todos los partidos: ${res.statusText}`);
      }

      const partidosData = await res.json();
      setPartidos(partidosData);

      const eventos = partidosData.map((partido) => {
        const pareja1 =
          partido.pareja1.nombres?.join(' y ') ||
          partido.pareja1.usuarios.map((u) => u.nombre).join(' y ');
        const pareja2 =
          partido.pareja2.nombres?.join(' y ') ||
          partido.pareja2.usuarios.map((u) => u.nombre).join(' y ');

        return {
          id: partido._id,
          title: `${pareja1} vs ${pareja2}`,
          start: new Date(partido.fecha),
          end: new Date(new Date(partido.fecha).getTime() + 90 * 60 * 1000),
        };
      });

      setCalendarEvents(eventos);
    } catch (error) {
      console.error('Error al obtener todos los partidos:', error);
    }
  };

  fetchTodosPartidos();
}, []);
  

//Manejador de click en evento del calendario
      const handleEventClick = (clickInfo) => {
        alert(`Partido: ${clickInfo.event.title}\nFecha: ${clickInfo.event.start.toLocaleString()}`);
      };

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
                  <strong>{r.nombreRanking}</strong> : {r.parejas} parejas.
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
          <FullCalendar 
            plugins={[ dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            events= {calendarEvents}
            eventClick= {handleEventClick}
            headerToolbar= {{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek'
            }}
            height= 'auto'
            locale='es'
            buttonText ={{
              today: 'Hoy',
              month: 'Mes',
              week: 'Semana'
            }}
            />
        </section>
      </main>
    </div>
  );
};

export default AdminDashBoard;
