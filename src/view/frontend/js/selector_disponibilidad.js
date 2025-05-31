


/*
aqui se contiene el selector de disponibilidad encontrado en
registro de asesor, aqui se almacena el html, script y estilo que le pertenece a este
*/

// Definir los días y horas
const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
const horas = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];

// Crear el HTML del selector de disponibilidad
export function crearSelectorDeDisponibilidad(containerId) {
  // Generar estilos si existen
  if (!document.getElementById('estilosDisponibilidad')) {
    const style = document.createElement('style');
    style.id = 'estilosDisponibilidad';
    style.textContent = ''; // Establecido mas abajo en el documento
    document.head.appendChild(style);
  }

  // Crear el contenedor del modal
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`No se encontró el contenedor con ID: ${containerId}`);
    return;
  }
  const horarioSeleccionado = {};

  diasSemana.forEach(dia => {
   horarioSeleccionado[dia] = [];

   const seccion = document.createElement("div");
   seccion.innerHTML = `<h4>${dia.charAt(0).toUpperCase() + dia.slice(1)}</h4>`;
   


   horas.forEach(hora => {
      const label = document.createElement("label");
      label.style.marginRight = "8px";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.dataset.dia = dia;
      checkbox.value = hora;

      checkbox.addEventListener("change", function () {
          const dia = this.dataset.dia;
          const hora = parseInt(this.value);
          if (this.checked) {
              if (!horarioSeleccionado[dia].includes(hora)) {
                  horarioSeleccionado[dia].push(hora);
              }
          } else {
              horarioSeleccionado[dia] = horarioSeleccionado[dia].filter(h => h !== hora);
          }
          horarioSeleccionado[dia].sort((a, b) => a - b);  // Opcional: ordenar
      });

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(` ${hora}:00`));
      seccion.appendChild(label);
   });


    container.appendChild(seccion);
    container.appendChild(document.createElement("hr"));
  });

  // Retorna una función para obtener el JSON cuando se necesite
  return () => {
    const json = JSON.stringify(horarioSeleccionado, null, 2);
    console.log(json)
    return json;
  };

}



// Estilos básicos para el selector
const estilo = `
.selector-container {
  width: 100%;
  max-width: 600px;
  height: 300px;
  border: 1px solid #ccc;
  overflow-y: auto;
  padding: 10px;
}

.selector-container h4 {
  margin-top: 10px;
  margin-bottom: 5px;
}

.selector-container label {
  display: inline-block;
  margin: 2px 4px;
}
    `;