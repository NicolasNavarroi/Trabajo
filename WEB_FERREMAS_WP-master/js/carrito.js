function obtenerCarrito() {
  const carritoJSON = localStorage.getItem('carrito');
  return carritoJSON ? JSON.parse(carritoJSON) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio, cantidad) {
  const carrito = obtenerCarrito();
  const productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, cantidad });
  }

  guardarCarrito(carrito);
  alert(`Se agregó ${nombre} al carrito.`);

  if (document.getElementById('carritoContainer')) {
    mostrarCarrito();
  }
}

function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const contenedor = document.getElementById('carritoContainer');
  const totalElem = document.getElementById('total');

  if (!contenedor || !totalElem) return;

  contenedor.innerHTML = '';

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
    totalElem.textContent = '';
    return;
  }

  let total = 0;

  carrito.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.className = 'producto-carrito';

    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    productoDiv.innerHTML = `
      <span><strong>${producto.nombre}</strong></span>
      <span>Precio: $${producto.precio.toLocaleString()}</span>
      <span>Cantidad: ${producto.cantidad}</span>
      <span>Subtotal: $${subtotal.toLocaleString()}</span>
      <button class="btn-eliminar" data-nombre="${producto.nombre}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>
      </button>
    `;

    contenedor.appendChild(productoDiv);
  });

  totalElem.textContent = `Total: $${total.toLocaleString()}`;

  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', () => {
      eliminarDelCarrito(btn.dataset.nombre);
    });
  });
}

function eliminarDelCarrito(nombre) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(p => p.nombre !== nombre);
  guardarCarrito(carrito);
  mostrarCarrito();
}

// 🔽 ESTA ES LA ÚNICA FUNCIÓN CON CAMBIOS
async function iniciarPago(montoTotal) {
  if (montoTotal <= 0) {
    alert('El monto debe ser mayor a cero para iniciar el pago.');
    return;
  }

  try {
    const respuesta = await fetch('http://localhost:3000/api/webpay/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: montoTotal,
        buy_order: 'orden_' + Date.now(),
        session_id: 'sesion_' + Date.now(),
        return_url: 'http://localhost:5500/pagoExitoso.html'
      })
    });

    const data = await respuesta.json();

    if (data.success && data.url && data.token) {
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
      console.error('Respuesta inesperada:', data);
      alert('No se pudo iniciar el pago. Verifica los datos del carrito o el servidor.');
    }

  } catch (error) {
    console.error('Error al iniciar pago:', error);
    alert('Hubo un error al conectar con Transbank. Revisa la consola.');
  }
}

function setupCheckout() {
  const btn = document.getElementById('checkoutBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const total = carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    iniciarPago(total);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarCarrito();
  setupCheckout();
});
