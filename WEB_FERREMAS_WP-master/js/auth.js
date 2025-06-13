/**
 * auth.js - Manejo de inicio de sesión y registro adaptado al proyecto LosPlataformeros
 */

async function submitForm(e, url, isLogin = false) {
  e.preventDefault();
  const form = e.target;
  const body = {};

  // Construir payload según formulario
  Array.from(form.elements).forEach(el => {
    if (el.name) body[el.name] = el.value;
  });

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();

    if (res.ok) {
      if (isLogin) {
        // Login exitoso: guardar datos y redirigir según tipoUsuario
        localStorage.setItem('token', data.token || ''); // si se implementa token
        localStorage.setItem('idUsuario', data.idUsuario);
        switch (data.tipoUsuario) {
          case 1:
            window.location.href = '/pages/dashboard/admin.html';
            break;
          case 2:
            window.location.href = '/pages/dashboard/empleado.html';
            break;
          case 3:
            window.location.href = '/pages/dashboard/cliente.html';
            break;
          default:
            window.location.href = '/pages/dashboard/invitado.html';
        }
      } else {
        // Registro exitoso: redirigir a login de invitado
        alert('Registro exitoso. Por favor inicia sesión.');
        window.location.href = '/login.html';
      }
    } else {
      alert(data.mensaje || data.error || 'Error en la operación');
    }
  } catch (err) {
    alert('Error de red: ' + err.message);
  }
}

// Asociar formulario de login (ruta Verificador)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', e =>
    submitForm(e, 'http://localhost:3000/verificador/login', true)
  );
}

// Asociar formulario de registro (ruta Usuarios)
const registroForm = document.getElementById('registroForm');
if (registroForm) {
  registroForm.addEventListener('submit', e =>
    submitForm(e, 'http://localhost:3000/usuarios/crear')
  );
}