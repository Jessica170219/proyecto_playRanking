import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Stylesheets/Usesrprofile.css'; 


const UserProfile = () => {
  const navigate = useNavigate();

  // Recuperamos el usuario guardado en localStorage
  const storedUser = localStorage.getItem('user');
  const usuario = storedUser ? JSON.parse(storedUser) : null;
  
  
  const nombre = usuario.nombre;
  const email = usuario.email;

  //datos del perfil
  const [formData, setFormData] = useState({
    nombre: usuario?.nombre || '',
    apellido: usuario?.apellido || '',
    email: usuario?.email || '',
    telefono: usuario?.telefono || '',
  });

  const [verContraseña, setverContraseña] = useState(false);
  const [contraseñaForm, setContraseñaForm] = useState({
    actual: '',
    nueva: '',
    repetir: '',
  });

  const [editando, setEditando] = useState(false);

  if (!usuario) return <p>No hay usuario cargado</p>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/api/usuarios/${usuario._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error al actualizar usuario');

      const updatedUser = await res.json();

      // actualizar localStorage
      localStorage.setItem('user', JSON.stringify({
        ...usuario,
        ...updatedUser,
      }));

      setEditando(false);
    } catch (err) {
      console.error(err);
    }
  };

  
  //Funcion de cambiar contraseña 
  const handleChangeContraseña = async (e) => {
    e.preventDefault();

    if (contraseñaForm.nueva !== contraseñaForm.repetir) {
      alert('Las contraseñas deben coincidir');
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/api/usuarios/${usuario._id}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          actual: contraseñaForm.actual,
          nueva: contraseñaForm.nueva,
        }),
      }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Erorr al camiar contraseña');
        return;
      }

      alert('Contraseña cambiada correctamente');
      setContraseñaForm({ actual: '', nueva: '', repetir: '' });
      navigate('/dashboard');

    } catch (error) {
      console.error(error);
      alert('Error al cambiar la contraseña');
    }
  }


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

      {/*Panel principal */}
      
      <main className="dashboard-main">
        <section className='profile-card'>
          <h2>Mi perfil</h2>

        {!editando ? (
          <div className="profile-summary">
            <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Teléfono:</strong> {usuario.telefono}</p>
            <p><strong>Rol:</strong> {usuario.role}</p>
            <button onClick={() => setEditando(true)}>Editar perfil</button>
          </div>
          ) : (
              <>
                
           {/*Formulario de datos del perfil */}
          <form className="profile-form" onSubmit={handleSubmit}>
            <label>
              Nombre:
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </label>
            <label>
              Apellido:
              <input
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Teléfono:
              <input
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />  
              </label>
              
                
            <button type="submit">Guardar cambios</button>
            <button type="button" onClick={() => setEditando(false)}>Cancelar cambios </button>
          </form>
          
          {/* Bloque cambio de contraseña */}
             
          <h3>Cambiar contraseña</h3>
          <form className="profile-form" onSubmit={handleChangeContraseña}>
                <label>
                  Contraseña actual:
                  <div >
                    <input
                      type={verContraseña ? 'text' : 'password'}
                      name="actual"
                      value={contraseñaForm.actual}
                      onChange={(e) =>
                        setContraseñaForm({
                          ...contraseñaForm,
                          actual: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      className='btn-ver-ocultar'
                      onClick={() => setverContraseña((v) => !v)}
                    >
                      {verContraseña ? 'Ocultar' : 'Ver'}
                    </button>
                  </div>
                </label>

                <label>
                  Nueva contraseña:
                  <input
                    type="password"
                    name="nueva"
                    value={contraseñaForm.nueva}
                    onChange={(e) =>
                      setContraseñaForm({
                        ...contraseñaForm,
                        nueva: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Repetir nueva contraseña:
                  <input
                    type="password"
                    name="repetir"
                    value={contraseñaForm.repetir}
                    onChange={(e) =>
                      setContraseñaForm({
                        ...contraseñaForm,
                        repetir: e.target.value,
                      })
                    }
                  />
                </label>

                <button type="submit">Cambiar contraseña</button>
          </form>
        </>
          
          )}
        </section>
      </main>
    </div>
  );
}   

export default UserProfile;