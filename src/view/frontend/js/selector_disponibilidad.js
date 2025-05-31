/*
aqui se contiene el selector de disponibilidad encontrado en
registro de asesor, aqui se almacena el html, script y estilo que le pertenece a este
*/

// Definir los días y horas
const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
const horas = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];

/**
 * Crea un selector visual de disponibilidad horaria para los días de la semana dentro de un contenedor HTML.
 * 
 * @function
 * @export
 * @param {string} containerId - El ID del contenedor HTML donde se insertará el selector.
 * @param {Object|null|string} [horarioExistente=null] - Un objeto JSON o string que representa un horario 
 *     con días como claves (lunes, martes, etc.) y arrays de horas (números enteros entre 0 y 23) como valores.
 *     Si el formato es inválido o no se envia, se ignora.
 * 
 * @returns {Function} Una función que, al llamarse, devuelve el horario seleccionado en formato JSON (string).
 * 
 * @example
 * // HTML: <div id="miContenedor"></div>
 * const obtenerHorario = crearSelectorDeDisponibilidad("miContenedor", {
 *   lunes: [8, 9, 10],
 *   martes: [],
 *   miercoles: [15],
 *   jueves: [],
 *   viernes: [18, 19],
 *   sabado: []
 * });
 * 
 * // Luego, al querer obtener los datos seleccionados:
 * const horarioJSON = obtenerHorario();
 * console.log(horarioJSON);
*/

export function crearSelectorDeDisponibilidad(containerId, horarioExistente = null) {
  // ver si el horario esta en un formato JSON
  if( horarioExistente && !esHorarioValido(horarioExistente) ){
    console.error("El horario proporcionado no es válido. Debe ser un JSON con la estructura correcta.");
    horarioExistente = null; // Reseteamos a null si no es válido
  }
  

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
      // comprobar si el horario existe y marcar los checkboxes
      if (horarioExistente && horarioExistente[dia] && horarioExistente[dia].includes(hora)) {
          checkbox.checked = true;
      }

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
    const json = JSON.stringify(horarioSeleccionado, null, 0);
    console.log(json)
    return json;
  };
}


// Función para validar el horario dado esta en el formato correcto o no
function esHorarioValido(input) {
  const diasValidos = diasSemana;

  // Intentar convertir si es string
  let json;
  try {
    json = typeof input === "string" ? JSON.parse(input) : input;
  } catch (e) {
    return false; // No es JSON válido
  }

  // Verificar que solo están los días esperados
  const claves = Object.keys(json);
  if (claves.length !== diasValidos.length || !diasValidos.every(d => claves.includes(d))) {
    return false;
  }

  // Validar cada día
  for (const dia of diasValidos) {
    const horas = json[dia];
    if (!Array.isArray(horas)) return false;

    for (const h of horas) {
      if (typeof h !== "number" || !Number.isInteger(h) || h < 0 || h > 23) {
        return false;
      }
    }
  }

  return true;
}
