// CRUD Empleados
enableSection('gestionEmpleados', '/api/empleados', ['nombre','email','position']);
// CRUD Clientes
enableSection('gestionClientes', '/api/clientes', ['nombre','email']);

function enableSection(sectionId, apiPath, fields) {
  const container = document.getElementById(sectionId);
  // Listar
  (async () => {
    const { data } = await (await fetch(apiPath)).json();
    container.append(createTable(data, fields));
  })();
  // Crear/Editar/Eliminar: implementar formularios y fetch POST/PUT/DELETE
}

function createTable(items, fields) {
  const tbl = document.createElement('table');
  const thead = document.createElement('thead');
  thead.innerHTML = '<tr>' + fields.map(f=>`<th>${f}</th>`).join('') + '<th>Acciones</th></tr>';
  tbl.appendChild(thead);
  const tbody = document.createElement('tbody');
  items.forEach(item => {
    const tr = document.createElement('tr');
    fields.forEach(f => tr.appendChild(td(item[f])));
    const actions = document.createElement('td');
    actions.innerHTML = `
      <button onclick="editItem('${apiPath}',${item.id})">✏️</button>
      <button onclick="deleteItem('${apiPath}',${item.id})">🗑️</button>
    `;
    tr.appendChild(actions);
    tbody.appendChild(tr);
  });
  tbl.appendChild(tbody);
  return tbl;
}

function td(text) { const el = document.createElement('td'); el.textContent = text; return el; }