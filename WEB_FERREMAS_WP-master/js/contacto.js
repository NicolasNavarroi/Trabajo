document.getElementById('contactoForm') &&
  document.getElementById('contactoForm').addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;
    const data = {
      nombre: form.nombre.value,
      email: form.email.value,
      mensaje: form.mensaje.value
    };
    try {
      const res = await fetch('http://localhost:3000/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        alert('Mensaje enviado 👍');
        form.reset();
      } else {
        const errData = await res.json();
        throw new Error(errData.message || 'Error en el servidor');
      }
    } catch (err) {
      alert('No se pudo enviar: ' + err.message);
    }
  });