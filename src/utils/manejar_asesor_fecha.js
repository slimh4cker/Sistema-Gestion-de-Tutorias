
/**
 * Verifica si un asesor está disponible en un día y hora específicos según su horario.
 *
 * @function
 * @param {Object} horario_asesor - Objeto que representa el horario del asesor. Las claves son los días de la semana (en minúsculas) y los valores son arrays de horas disponibles.
 * @param {string} diaSemana - Día de la semana a consultar (por ejemplo, 'lunes', 'martes', etc.). No distingue mayúsculas/minúsculas.
 * @param {number|null} [hora=null] - Hora específica a consultar (opcional). Si se omite, solo se verifica la disponibilidad en el día.
 * @returns {boolean} Retorna `true` si el asesor está disponible en el día y hora especificados, o solo en el día si no se especifica la hora. Retorna `false` si no está disponible.
 *
 * @tooltip
 * Este método permite comprobar si un asesor tiene disponibilidad en un día y hora determinados, basándose en su horario configurado. Si solo se indica el día, verifica si el asesor tiene algún horario ese día. Si se indica también la hora, verifica si esa hora está dentro de las horas disponibles para ese día.
 */
export function verSiEstaDisponible(horario_asesor, diaSemana, hora = null){
  diaSemana = diaSemana.toLowerCase();  

  // ver si se encuentra diaSemana dentro de horario_asesor y que tenga un horario dentro de ese dia
  if (diaSemana in horario_asesor || horario_asesor[diaSemana].length === 0) {
     
    // Si no se especifica hora, basta con tener el dia disponible
    if (hora !== null) {
      // la hora debe ser un numero simple
      if (typeof hora != 'integer' && typeof hora != 'number') {
        console.error("La hora debe ser un número entero");
        return true
      }  

      // ver si la hora esta dentro del horario del dia
      if (horario_asesor[diaSemana].includes(hora)) {
        return true;
      } else {
        return false;
      }

    } else{
      return true
    }
  } else {
    // Si no se encuentra el diaSemana, retornar false
    return false;
  }
}

/*  PARA TESTEO
const horario_prueba = {
    "lunes": [8,9,10,11,12,15,16,17,18],
    "martes": [8,9,10,11,12,13,14,15,16,17,18],
    "miercoles": [15,16,17,18],
    "jueves": [8,9,10,11,12,15,16,17,18,19,20,21],
    "viernes": [8,9,10,11,12,15,16,17,18,19,20,21],
    "sabado": []
}


console.log(verSiEstaDisponible(horario_prueba, "lunes", 15) )// true
 
*/