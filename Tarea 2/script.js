// Selección de elementos
const form = document.getElementById("formCarrera");
const nombreInput = document.getElementById("nombreCarrera");
const descripcionInput = document.getElementById("descripcion");

const errorNombre = document.getElementById("errorNombre");
const errorDescripcion = document.getElementById("errorDescripcion");

// Expresión regular: solo letras y espacios
const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

form.addEventListener("submit", function(event) {
  event.preventDefault(); // Evita recargar la página

  let valido = true;

  // Validación nombre
  if (nombreInput.value.trim() === "") {
    errorNombre.textContent = "El nombre es obligatorio.";
    valido = false;
  } else if (!regexNombre.test(nombreInput.value.trim())) {
    errorNombre.textContent = "El nombre solo puede contener letras y espacios.";
    valido = false;
  } else {
    errorNombre.textContent = "";
  }

  // Validación descripción
  if (descripcionInput.value.trim() === "") {
    errorDescripcion.textContent = "La descripción es obligatoria.";
    valido = false;
  } else {
    errorDescripcion.textContent = "";
  }

  // Si pasa validaciones
  if (valido) {
    // Crear objeto
    const carrera = {
      nombre: nombreInput.value.trim(),
      descripcion: descripcionInput.value.trim()
    };

    // Obtener lista existente de Local Storage
    let carreras = JSON.parse(localStorage.getItem("carreras")) || [];

    // Agregar nueva carrera
    carreras.push(carrera);

    // Guardar en Local Storage
    localStorage.setItem("carreras", JSON.stringify(carreras));

    // Limpiar formulario
    form.reset();

    // Mostrar en consola
    console.log("Lista de carreras:", carreras);
    alert("Carrera registrada correctamente.");
  }
});
