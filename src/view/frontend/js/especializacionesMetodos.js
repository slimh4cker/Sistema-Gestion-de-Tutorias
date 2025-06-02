// lista de especializaciones disponibles

export const materias = {
  1: "Administración de Bases de Datos",
  2: "Álgebra",
  3: "Álgebra lineal",
  4: "Álgebra/Precálculo",
  5: "Cálculo Diferencial",
  6: "Cálculo Integral",
  7: "Cálculo Vectorial",
  8: "Contabilidad",
  9: "Dibujo Asistido",
  10: "Dibujo en SolidWorks",
  11: "Dinámica",
  12: "Electromagnetismo",
  13: "Electrónica Básica",
  14: "Estadística",
  15: "Estática",
  16: "Física",
  17: "Fundamentos de Bases de Datos",
  18: "Fundamentos de Investigación",
  19: "Programación Básica",
  20: "Química",
  21: "Taller de Bases de Datos",
  22: "Taller de Investigación 1",
  23: "Taller de Investigación 2",
  24: "Vibraciones mecánicas"
};

/**
 * Genera un elemento <select> con las materias, colocando una opción inicial si se indica.
 * Si la opción inicial ya está en la lista, se mueve al inicio y no se repite.
 *
 * @param {string} [opcionInicial] - Texto que se mostrará como la primera opción.
 * @returns {HTMLSelectElement} El elemento <select> con las opciones generadas.
 */
export function crearSelectMaterias(opcionInicial = null) {
  const select = document.createElement('select');

  // Crea un array de objetos { id, nombre }
  let listaMaterias = Object.entries(materias).map(([id, nombre]) => ({
    id,
    nombre
  }));

  // Si hay una opción inicial y ya existe en la lista, la sacamos para evitar duplicados
  if (opcionInicial) {
    const index = listaMaterias.findIndex(m => m.nombre === opcionInicial);
    if (index !== -1) {
      listaMaterias.splice(index, 1); // Remover duplicado
    }

    // Agregar la opción inicial al inicio
    const opcion = document.createElement('option');
    opcion.value = '';
    opcion.textContent = opcionInicial;
    select.appendChild(opcion);
  }

  // Agregar el resto de las materias
  listaMaterias.forEach(({ id, nombre }) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = nombre;
    select.appendChild(option);
  });

  return select;
}
