function formatearFecha(fechaString) {
  const fecha = new Date(fechaString);
  const ahora = new Date();

  // Pasar ambas fechas a medianoche para comparar solo la fecha
  const fechaSinHora = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  const ahoraSinHora = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());

  const diferenciaDias = Math.floor((ahoraSinHora - fechaSinHora) / (1000 * 60 * 60 * 24));

  if (diferenciaDias === 0) {
    // Hoy
    return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diferenciaDias === 1) {
    // Ayer
    return `Ayer ${fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    // Otro día
    return `${fecha.toLocaleDateString([], { day: '2-digit', month: 'short' })} ${fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
}
