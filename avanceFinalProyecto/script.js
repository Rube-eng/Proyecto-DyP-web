const form = document.getElementById("formCarrera");
const nombreInput = document.getElementById("nombreCarrera");
const descripcionInput = document.getElementById("descripcion");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  // Validaciones
  if (nombreInput.value.trim() === "") {
    alert("El nombre de la carrera es obligatorio.");
    return;
  }

  // Crear objeto
  const carrera = {
    nombre: nombreInput.value.trim(),
    descripcion: descripcionInput.value.trim()
  };

  // Obtener lista existente
  let carreras = JSON.parse(localStorage.getItem("carreras")) || [];

  // Agregar nueva carrera
  carreras.push(carrera);

  // Guardar en Local Storage
  localStorage.setItem("carreras", JSON.stringify(carreras));

  // Limpiar formulario
  form.reset();

  // Mostrar en consola
  console.log("Lista de carreras:", carreras);
});
