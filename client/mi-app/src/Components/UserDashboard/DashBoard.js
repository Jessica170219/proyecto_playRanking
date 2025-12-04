import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../../Stylesheets/DashBoard.css';


const UserDashBoard = () => {
  const navigate = useNavigate();

  //Recuperamos el usuario guardado en localStorage
  const storedUser = localStorage.getItem('user');
  const usuario = storedUser ? JSON.parse(storedUser) : null; 

  const usuarioId = usuario?._id;

  const nombre = usuario.nombre; 
  const email = usuario.email; 

  //MOstramos los rankings, partidos y parejas
  const [ranking, setRanking] = useState(null); 
  const [partidos, setPartidos] = useState([]);
  const [parejaUsuarioId, setParejaUsuarioId] = useState(null);
  

  useEffect(() => {
    if(!usuarioId) return; 
    const fetchParejayRanking =async () => {
      try{
        //traemos la pareja donde esta el usuario
        const res = await fetch(`http://localhost:4000/api/parejas/usuario/${usuarioId}`);
        if(!res.ok){
          throw new Error(`Error al obtener la pareja del usuario: ${res.statusText}`);
        }
      
        const pareja = await res.json();

        if (pareja){
          setParejaUsuarioId(pareja._id); //guardamos el id de la pareja
        }

          if(pareja && pareja.ranking){
            //cargamos el ranking
            const rankingRes = await fetch(`http://localhost:4000/api/rankings/${pareja.ranking}`);

            if(!rankingRes.ok){
              throw new Error(`Error al obtener el ranking: ${rankingRes.statusText}`);
            }
            
            const rankingData = await rankingRes.json();
              setRanking(rankingData);
          } 
        } catch (error){
          console.error('Error al obtener la pareja y el ranking:', error); 
        }
      }; 
        fetchParejayRanking();
      }, [usuarioId]);

      //Traemos los partidos del usuario
      useEffect(() => {
        if(!usuarioId) return; 
        const fetchPartidos = async () => {
          try{
          
            const res = await fetch(`http://localhost:4000/api/partidos/usuario/${usuarioId}`);

            if (!res.ok) {
              throw new Error(`Error al obtener los partidos del usuario: ${res.statusText}`);
            } 

            const partidosData = await res.json();
            setPartidos(partidosData);
            
          }catch (error){
            console.error('Error al obtener los partidos del usuario:', error);
          }
        };

        fetchPartidos();
      }, [usuarioId]);


      //CALCULO DE ESTADISTICAS BASICAS
      const partidosJugados = partidos.filter(
        (p) =>
          p.resultado && Array.isArray(p.resultado.local) &&
          Array.isArray(p.resultado.visitante) &&
          p.resultado.local.length >0 &&
          p.resultado.visitante.length >0 
      );
      const jugados = partidosJugados.length;   

      //funcion calcular victoria para la pareja del usuario
      const calcularVictorias = (partido) => {
        if(!parejaUsuarioId || !partido.resultado) return false;

        const setsLocal = partido.resultado.local; 
        const setsVisitante = partido.resultado.visitante; 
        let juegosGanadosLocal = 0;
        let juegosGanadosVisitante = 0;

        for (let i =0; i<setsLocal.length; i++){
          juegosGanadosLocal += setsLocal[i];
          juegosGanadosVisitante += setsVisitante[i];
        }

        const esLocal = String(partido.pareja1._id) === String(parejaUsuarioId);

        const esVisitante = String(partido.pareja2._id) === String(parejaUsuarioId);

        if (!esLocal && !esVisitante) return false;

        if (esLocal) return juegosGanadosLocal > juegosGanadosVisitante;
        if (esVisitante) return juegosGanadosVisitante > juegosGanadosLocal;

        return false; 

      };

      const ganados = partidosJugados.filter((p)=>
        calcularVictorias(p)).length;

      const perdidos = jugados - ganados;

      const porcentaje = jugados > 0 ? Math.round((ganados / jugados) * 100) : 0; 

      
     
  
    return (
        <div className="dashboard-container">
          <aside className="sidebar">
            <div className="sidebar-header">
              <span className="sidebar-logo" role="img" aria-label="tenis y pelota">🎾</span>
              <span className="sidebar-title">PlayRanking</span>
            </div>
          
          <nav className="sidebar-menu">
            <Link to="/dashboard" className="sidebar-link active"><span>🏠</span> Home</Link>
            <Link to="/calendario" className="sidebar-link active"><span>📅</span> Calendario</Link>
             <Link to="/perfil" className="sidebar-link"><span>👤</span> Perfil</Link>
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
          <h2>Mis Rankings</h2>
            {ranking ? (
          <div>
            <p><strong><span>🏅</span>{ranking.nombreRanking} : </strong>

           
            Desde {new Date(ranking.fechaInicio).toLocaleDateString()} hasta{" "}
            {new Date(ranking.fechaFin).toLocaleDateString()}
            </p>
          </div>
          ) : (
          <p>No estás inscrito en ningún ranking.</p>
        )}

         <h3>Mis partidos</h3>
            {partidos.length === 0 ? (
          <p>No tienes partidos programados.</p>
          ) : (
          <ul>
          {partidos.map((p) => (
            <li key={p._id}>
              <span> ⚔️</span>
              {/* nombres de las parejas */}
              {p.pareja1.nombres
                ? p.pareja1.nombres.join(" y ")
                : p.pareja1.usuarios.map(u => u.nombre).join(" y ")}
              {" "}vs{" "}
              {p.pareja2.nombres
                ? p.pareja2.nombres.join(" y ")
                : p.pareja2.usuarios.map(u => u.nombre).join(" y ")}
              {" "} - {new Date(p.fecha).toLocaleString()}

              {/* si hay resultado, lo mostramos */}
              
              {p.resultado &&
               Array.isArray(p.resultado.local) &&
                Array.isArray(p.resultado.visitante) &&
                p.resultado.local.length > 0 &&
                p.resultado.visitante.length > 0 && (
                  <>
                    {" "}
                    ✅ | L: {p.resultado.local.join("-")}
                    {" "}V: {p.resultado.visitante.join("-")}
                  </>
              )}
            </li>
          ))}
        </ul>
      )}
               
        </section>
        
     
        <section className="stats-summary-card">
          <h2>Resumen de estadísticas</h2>
          <div className="stats-summary-content">
            <div>Partidos jugados: <strong>{jugados}</strong></div>
            <div>Ganados: <strong>{ganados}</strong></div>
            <div>Perdidos: <strong>{perdidos}</strong></div>
            <div>Porcentaje: <strong>{porcentaje}%</strong></div>
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