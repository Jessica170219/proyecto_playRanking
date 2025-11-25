import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'; 
import '../../Stylesheets/AdminDashboard/AdminPartidos.css';

const RankingGestion = () => {
    
  const navigate = useNavigate();

  //Recuperamos el usuario guardado en localStorage
  const storedUser = localStorage.getItem('user');
  const usuario = storedUser ? JSON.parse(storedUser) : {};

  const nombre = usuario.nombre;
  const email = usuario.email;
  
  //Estados del formulario

  const { id } = useParams(); //id del ranking
  const [usuarios, setUsuarios] = useState([]);
  const [parejas, setParejas] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [ranking, setRanking] = useState(null);
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {

    //cargamos los usuarios 
    fetch('http://localhost:4000/api/usuarios')
      .then(res => res.json()
        .then(setUsuarios))
      .catch(error => console.error('Error al cargar usuarios', error));
    
    //cargamos los datos del ranking
    fetch(`http://localhost:4000/api/rankings/${id}`)
      .then(res => res.json()
        .then(setRanking))
      .catch(error => console.error('Error al cargar rankings', error));
    
    
    
    //Cargamos las parejas ya creadas si las hay

    fetch(`http://localhost:4000/api/parejas/rankings/${id}`)
      .then(res => res.json())
      .then(setParejas)
      .catch(error => console.error('Error al cargar parejas', error));;
    
    //cargamos los partidos creados
    cargarPartidos();
    
    
  }, [id]);


  //Funcion de seleccion de usuarios 
  const handleSelectUsuario = (userId) => {
    setSeleccionados((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : prev.length < 2 ? [...prev, userId] : prev)
  };
  

  //Crear pareja 
  const handleCrearPareja = async () => {
    if (seleccionados.length !== 2) {
      alert('Selecciona dos usuarios para crear la pareja');
      return;
    }
    if (parejas.length > 10) {
      alert('Ya tienes un máximo de 10 parejas');
      return;
    }
    
    const response = await fetch(`http://localhost:4000/api/parejas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ranking: id,
        usuarios: seleccionados
      })
    })

    const nuevaPareja = await response.json();
    const parejasConNombres = {
      ...nuevaPareja,
      nombres: nuevaPareja.usuarios.map(u => u.nombre)
    };
    setParejas([...parejas,parejasConNombres]);
    setSeleccionados([]);

  }
  

  //Borrar pareja 
  const handleEliminarPareja = async (parejaId) => {
    await fetch(`http://localhost:4000/api/parejas/${parejaId}`, { method: 'DELETE' });

    setParejas(parejas.filter((p) => p._id !== parejaId));
  };


  //Generar partidos

  const handleGenerarPartidos = async () => {
    const inicio = new Date(ranking.fechaInicio);
    const fin = new Date(ranking.fechaFin);
    const partidos = [];

    const parejasValidas = parejas.filter(
  p => Array.isArray(p.usuarios) && p.usuarios.length === 2
  );


    for (let i = 0; i < parejasValidas.length; i++) {
      for (let j = i + 1; j < parejasValidas.length; j++) {

        //Calculamos fecha aleatoria
        const mesRango = fin.getTime() - inicio.getTime();
        const fechaAleatoria = new Date(inicio.getTime() + Math.random()*mesRango);
        //Hora aleatoria entre las 15:00 y 23:00
        const hora = 15 + Math.floor(Math.random() * 9);
        fechaAleatoria.setHours(hora, 0, 0, 0);

        partidos.push({
          pareja1: parejas[i]._id,
          pareja2: parejas[j]._id,
          fecha: fechaAleatoria,
          ranking: ranking._id
        });
      }
    }


      // Llama al backend para guardar los partidos
      const response = await fetch('http://localhost:4000/api/partidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partidos })
      });

      if (response.ok) {
        alert('¡Partidos generados!');
        cargarPartidos();
      } else {
        alert('Error generando partidos');
      }
    };

  

    //Cargar los partidos 
  const cargarPartidos = async () => {
      
      const response = await fetch(`http://localhost:4000/api/partidos/rankings/${id}`);

      if (response.ok) {
        const data = await response.json();
        setPartidos(data);
      }
  };
  
  //Borrar partido
  const handleEliminarPartido = async (partidoId) => {
    await fetch(`http://localhost:4000/api/partidos/${partidoId}`, { method: 'DELETE' });
    setPartidos(partidos.filter((p) => p._id !== partidoId));
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
        {/* Contenido principal, dos columnas */}
        <main className="dashboard-main ranking-main">
          <div>
            <h2>Gestionar parejas para {ranking?.nombreRanking}</h2>
            <section className='parejas-lista'>
            <h3>Usuarios disponibles</h3>
              <div className='usuarios-grid'>
                {(() => {
                  const COLUMN_SIZE = 10;
                  const columnasUsuarios = [];
                  for (let i = 0; i < usuarios.length; i += COLUMN_SIZE) {
                    columnasUsuarios.push(usuarios.slice(i, i + COLUMN_SIZE));
                  }
                  return columnasUsuarios.map((col, idx) => (
                    <ul key={idx} className="usuarios-columna">
                      {col.map(u => (
                        <li key={u._id}>
                          <input
                            type="checkbox"
                            checked={seleccionados.includes(u._id)}
                            onChange={() => handleSelectUsuario(u._id)}
                            disabled={
                              seleccionados.length === 2 && !seleccionados.includes(u._id)
                            }
                          />
                          {u.nombre} ({u.email})
                        </li>))}
                    </ul>
                  ));
                })()}
                </div>
            <button className ='btn-crear' disabled={seleccionados.length !== 2 || parejas.length >= 10}
              onClick={handleCrearPareja}
            > Crear pareja
            </button>
            </section>
            <section className='listado-parejas-creadas'>
            <h3>Parejas creadas ({parejas.length}/10)</h3>
            <ul>
              {parejas.map((p) => (
                <li className='parejas-row' key={p._id}>
                  
                  {p.nombres ? p.nombres.join(' y ') : 'Pareja'}
                 
                <div className='botonera'>
                    <button className='btn-delete' onClick={() => handleEliminarPareja(p._id)}>Borrar</button>
                    </div>
                </li>
              ))}
            </ul>

            {/*Creacion de partidos*/}
            {parejas.length >= 4 && (
              <button className='btn-crear' onClick={handleGenerarPartidos}>
                Generar partidos automáticamente
              </button>
              )}
            </section>
            <section className='partidos-generados'>
            {partidos.length > 0 && (
              <div>
                <h3>Partidos generados</h3>
                <ul>
                  {partidos.map((p) => (
                  <li className='parejas-row' key={p._id}>
                    {(p.pareja1 && p.pareja1.usuarios)
                      ? p.pareja1.usuarios.map(u => u.nombre).join(' y ')
                      : 'Sin pareja 1'}
                     <span className="separator">vs</span>
                    {(p.pareja2 && p.pareja2.usuarios)
                      ? p.pareja2.usuarios.map(u => u.nombre).join(' y ')
                      : 'Sin pareja 2'}
                     <span className="separator"> </span>
                    {p.fecha
                      ? new Date(p.fecha).toLocaleDateString() +
                        ' ' +
                        new Date(p.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : ''}
                     <div className='botonera'> 
                      <button
                          className="btn-delete"
                          onClick={() => handleEliminarPartido(p._id)}
                        >Borrar</button>
                        </div> 
                  </li>
                    ))}

                </ul>
                </div>
                
            )}
            </section>

              
          </div>
        </main>
      </div>
      

     
    );
  };


export default RankingGestion; 