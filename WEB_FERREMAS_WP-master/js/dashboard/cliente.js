// Mostrar catálogo y carrito, habilitar checkout
import '../catalogo.js';
import '../carrito.js';

// Checkout -> POST /api/pedidos con carrito
document.getElementById('checkoutBtn').addEventListener('click', async () => {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (!carrito.length) return alert('Carrito vacío');
  const res = await fetch('/api/pedidos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
    body: JSON.stringify({ items: carrito })
  });
  if (res.ok) {
    alert('Pedido enviado');
    localStorage.removeItem('carrito');
    window.location.reload();
  } else alert('Error al enviar pedido');
});