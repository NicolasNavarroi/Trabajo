// Muestra catálogo pero bloquea checkout
import '../catalogo.js';
// Al cargar, si detecta token redirige:
if (localStorage.getItem('token')) {
  window.location.href = '/pages/dashboard/cliente.html';
}