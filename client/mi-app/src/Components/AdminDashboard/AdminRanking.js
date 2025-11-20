import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../Stylesheets/AdminDashboard/AdminRanking.css';


const AdminRanking = () => {
    
  const navigate = useNavigate();

  //Recuperamos el usuario guardado en localStorage
  const storedUser = localStorage.getItem('user');
  const usuario = storedUser ? JSON.parse(storedUser) : {};

  const nombre = usuario.nombre;
  const email = usuario.email;

  
  //Estados del formulario
  const [rankings, setRankings] = useState([]);
  const [nombreRanking, setNombreRanking] = useState('');
  const [parejas, setParejas] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  useEffect(() => {
    fetch('http://localhost:4000/api/rankings')
      .then(res => res.json())
      .then(data => setRankings(data))
      .catch(error => console.log('Error al cargar rankings: ', error));
  
  }, []); 
  
  //Validamos que la fecha de fin no sea anterior a la fecha de inicio
  if (new Date(fechaFin) < new Date(fechaInicio)) {
    alert('La fecha de fin no puede ser anterior a la fecha de inicio');
    
  }

  //Crear ranking nuevo

  const handleCrearRanking = async (e) => {
    e.preventDefault();

    // Validar campos (simple)
    if (!nombreRanking || !parejas || !fechaInicio || !fechaFin) {
      alert("Completa todos los campos");
      return;
    }
    

    const nuevoRanking = {
      nombreRanking,
      parejas: parseInt(parejas),
      fechaInicio,
      fechaFin,
    };

    try {
      const response = await fetch('http://localhost:4000/api/rankings', {
        method: "POST" ,
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(nuevoRanking),
      })

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Detalle del error', errorData);
        alert(errorData.message || "Error al crear ranking (frontend)"); 
        return;
      }

      const rankingCreado = await response.json(); 
       setRankings([...rankings, rankingCreado]);


      // Limpiar formulario
      setNombreRanking("");
      setParejas("");
      setFechaInicio("");
      setFechaFin("");

    } catch (error) {
      alert('Error en la conexión con el servidor'); 
      console.log(error);
    }
   

    
  };
  //Eliminar ranking
  const handleEliminarRanking = async (id) => {
    if (!id) {
      alert('ID no valido');
      return;
    }
    if (!window.confirm('¿Seguro que deseas eliminar este ranking?')) return; 

    try {
      const response = await fetch(`http://localhost:4000/api/rankings/${id}`, {
        method: "DELETE"
      }); 
      if (response.ok) {
        setRankings(rankings.filter(r => (r._id || r.id) !== id)); 
      } else {
        alert('No se puedo eliminar el ranking'); 
        }
    } catch (error) {
      alert('Error de conexión'); 
      }
    }


  
  

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


            {/* Contenido principal, dos columnas */}
      <main className="dashboard-main ranking-main">

        {/* Columna lista de rankings */}
        <section className="ranking-list">
          <h2>Lista de Rankings</h2>
          {rankings.length === 0 ? (
            <p>No hay rankings creados.</p>
          ) : (
            <ul>
              {rankings.map(r => (
                <li key={r._id || r.id} className='ranking-row'>
                  <span>
                    <strong>{r.nombreRanking}</strong> — {r.parejas} parejas — {r.estado}
                  </span>
                  <div>
                    <button className='btn-modify'
                      onClick={()=> navigate(`/admin/rankings/${r._id || r.id}`)}>Modificar</button>
                    <button className='btn-delete'
                      onClick={()=> handleEliminarRanking(r._id || r.id)}> Eliminar </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Columna formulario creación ranking */}
        <section className="ranking-form">
          <h2>Crear nuevo Ranking</h2>
          <form onSubmit={handleCrearRanking}>
            <label>
              Nombre del ranking:
              <input type="text" value={nombreRanking} onChange={e => setNombreRanking(e.target.value)} placeholder="Ej: Ranking Enero 2025" />
            </label>
            <label>
              Número de parejas permitidas:
              <input type="number" value={parejas} onChange={e => setParejas(e.target.value)} placeholder="10" min="4"  max="10" />
            </label>
            <label>
              Fecha de inicio:
              <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
            </label>
            <label>
              Fecha de fin:
              <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
            </label>
            <button type="submit" className="btn-green">Crear ranking</button>
          </form>
        </section>

      </main>
    </div>
  );
};

export default AdminRanking; 