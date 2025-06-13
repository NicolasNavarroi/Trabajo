document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('carritoContainer');
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let total = 0;

  if (!carrito.length) {
    container.innerHTML = '<p>Tu carrito está vacío.</p>';
  } else {
    // Limpio el container para evitar duplicados
    container.innerHTML = '';

    carrito.forEach((item, i) => {
      total += item.precio;
      const itemDiv = document.createElement('div');
      itemDiv.className = 'carrito-item';
      itemDiv.innerHTML = `
        <span>${item.nombre} — $${item.precio.toLocaleString()}</span>
        <button onclick="quitar(${i})">✕</button>
      `;
      container.appendChild(itemDiv);
    });

    // Agrega el botón de pago al final del carrito
    const pagarDiv = document.createElement('div');
    pagarDiv.style.marginTop = '20px';
    pagarDiv.innerHTML = `
      <button onclick="iniciarPago(${total})" style="padding: 10px 20px; font-size: 16px;">
        Pagar ahora
      </button>
    `;
    container.appendChild(pagarDiv);
  }

  document.getElementById('total').textContent = `Total: $${total.toLocaleString()}`;
});

function quitar(idx) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(idx, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  location.reload();
}

// Función para iniciar el pago con Webpay
async function iniciarPago(montoTotal) {
  try {
    const respuesta = await fetch('/api/webpay/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: montoTotal,
        buy_order: 'orden_' + Date.now(),
        session_id: 'sesion_' + Date.now(),
        return_url: 'http://localhost:3000/pago-exitoso.html' // Cambia la URL según tu configuración
      })
    });

    const data = await respuesta.json();

    if (data.url && data.token) {
      // Crear y enviar automáticamente un formulario POST
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = data.url;

      const inputToken = document.createElement('input');
      inputToken.type = 'hidden';
      inputToken.name = 'token_ws';
      inputToken.value = data.token;

      form.appendChild(inputToken);
      document.body.appendChild(form);
      form.submit();
    } else {
      alert('No se pudo iniciar el pago.');
    }

  } catch (error) {
    console.error('Error al iniciar pago:', error);
    alert('Hubo un error al conectar con Transbank.');
  }
}
