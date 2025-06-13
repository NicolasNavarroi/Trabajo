// Obtener info de usuario y mostrar vista según posición
(async () => {
  const res = await fetch('/api/auth/me', { headers: { 'Authorization': localStorage.getItem('token') }});
  if (!res.ok) return window.location.href = '/pages/login.html';
  const user = await res.json();
  const cont = document.getElementById('empleadoVista');
  switch (user.position) {
    case 'Vendedor':
      cont.innerHTML = `
        <h3>Pedidos para Asesorar</h3>
        <!-- Lista de pedidos: fetch '/api/pedidos?status=pendiente' -->
      `;
      break;
    case 'Bodeguero':
      cont.innerHTML = `
        <h3>Órdenes por Preparar</h3>
        <!-- Lista de órdenes: fetch '/api/ordenes?status=aprobada' -->
      `;
      break;
    case 'Contador':
      cont.innerHTML = `
        <h3>Pagos por Confirmar</h3>
        <!-- Lista de pagos: fetch '/api/pagos?status=pendiente' -->
      `;
      break;
    default:
      cont.textContent = 'Rol no reconocido';
  }
})();