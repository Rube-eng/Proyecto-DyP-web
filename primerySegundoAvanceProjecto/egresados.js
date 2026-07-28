const form = document.getElementById("formEgresado");
const tablaBody = document.querySelector("#tablaEgresados tbody");

const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTelefono = /^[0-9]{8}$/; // ejemplo: 8 dígitos

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  let valido = true;

  // Validaciones
  if (nombre === "" || !regexNombre.test(nombre)) {
    document.getElementById("errorNombre").textContent = "Nombre inválido.";
    valido = false;
  } else {
    document.getElementById("errorNombre").textContent = "";
  }

  if (correo === "" || !regexCorreo.test(correo)) {
    document.getElementById("errorCorreo").textContent = "Correo inválido.";
    valido = false;
  } else {
    document.getElementById("errorCorreo").textContent = "";
  }

  if (telefono === "" || !regexTelefono.test(telefono)) {
    document.getElementById("errorTelefono").textContent = "Teléfono inválido (8 dígitos).";
    valido = false;
  } else {
    document.getElementById("errorTelefono").textContent = "";
  }

  if (valido) {
    const egresado = { nombre, correo, telefono };

    let egresados = JSON.parse(localStorage.getItem("egresados")) || [];
    egresados.push(egresado);
    localStorage.setItem("egresados", JSON.stringify(egresados));

    form.reset();
    mostrarEgresados();
  }
});

function mostrarEgresados() {
  let egresados = JSON.parse(localStorage.getItem("egresados")) || [];
  tablaBody.innerHTML = "";

  egresados.forEach((e, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${e.nombre}</td>
      <td>${e.correo}</td>
      <td>${e.telefono}</td>
      <td class="actions">
        <button onclick="editarEgresado(${index})">Editar</button>
        <button onclick="eliminarEgresado(${index})">Eliminar</button>
      </td>
    `;
    tablaBody.appendChild(fila);
  });
}

function eliminarEgresado(index) {
  let egresados = JSON.parse(localStorage.getItem("egresados")) || [];
  egresados.splice(index, 1);
  localStorage.setItem("egresados", JSON.stringify(egresados));
  mostrarEgresados();
}

function editarEgresado(index) {
  let egresados = JSON.parse(localStorage.getItem("egresados")) || [];
  const egresado = egresados[index];

  document.getElementById("nombre").value = egresado.nombre;
  document.getElementById("correo").value = egresado.correo;
  document.getElementById("telefono").value = egresado.telefono;

  eliminarEgresado(index); // se elimina temporalmente y se vuelve a guardar al enviar
}

mostrarEgresados();
