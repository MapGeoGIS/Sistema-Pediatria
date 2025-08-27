function calcularEdadString(fechaNacimientoStr) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimientoStr);

  let años = hoy.getFullYear() - nacimiento.getFullYear();
  let meses = hoy.getMonth() - nacimiento.getMonth();

  if (hoy.getDate() < nacimiento.getDate()) {
    meses--; // No cumplió el mes aún
  }

  if (meses < 0) {
    años--;
    meses += 12;
  }

  if (años > 0) {
    return años === 1 ? "1 año" : `${años} años`;
  } else {
    return meses === 1 ? "1 mes" : `${meses} meses`;
  }
}

function formatearFecha(fechaStr) {
  const diasSemana = [
    "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
  ];

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const fecha = new Date(fechaStr);

  const diaSemana = diasSemana[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const anio = fecha.getFullYear();

  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');

  return `${diaSemana} ${dia} de ${mes} de ${anio}`;
}

function getUltimaConsulta(consultas) {
  if (!consultas.length) return null;

  return consultas.reduce((prev, curr) =>
    new Date(curr.fecha_consulta) > new Date(prev.fecha_consulta) ? curr : prev
  );
}

export {calcularEdadString, formatearFecha, getUltimaConsulta}
