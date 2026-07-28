const form = document.getElementById("formProyecto");
const tablaBody = document.querySelector("#tablaProyectos tbody");

const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const anio = document.getElementById("anio").value;
  const mes = document.getElementById("mes").value;
  const dia = document.getElementById("dia").value;
  const estado = document.getElementById("estado").value;

  let valido = true;

  // Validación nombre
  if (nombre === "" || !regexNombre.test(nombre)) {
    document.getElementById("errorNombre").textContent = "Nombre inválido.";
    valido = false;
  } else {
    document.getElementById("errorNombre").textContent = "";
  }

  // Validación fecha
  if (anio === "" || mes === "" || dia === "") {
    document.getElementById("errorFecha").textContent = "Debe ingresar año, mes y día.";
    valido = false;
  } else {
    document.getElementById("errorFecha").textContent = "";
  }

  // Construir fecha en formato YYYY-MM-DD
  const fecha_inicio = `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;

  // Validación estado
  if (estado === "") {
    document.getElementById("errorEstado").textContent = "Debe seleccionar un estado.";
    valido = false;
  } else {
    document.getElementById("errorEstado").textContent = "";
  }

  if (valido) {
    const proyecto = { nombre, fecha_inicio, estado };

    try {
      const response = await fetch("http://localhost:3000/proyectos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proyecto)
      });

      if (response.ok) {
        alert("Proyecto registrado correctamente.");
        form.reset();
        consultarProyectos();
      } else {
        alert("Error al registrar el proyecto.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  }
});

async function consultarProyectos() {
  try {
    const response = await fetch("http://localhost:3000/proyectos");
    const proyectos = await response.json();

    tablaBody.innerHTML = "";

    proyectos.forEach(p => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${p.nombre}</td>
        <td>${p.fecha_inicio}</td>
        <td>${p.estado}</td>
      `;
      tablaBody.appendChild(fila);
    });

    console.log("Lista de proyectos:", proyectos);
  } catch (error) {
    console.error("Error al consultar proyectos:", error);
  }
}

consultarProyectos();
