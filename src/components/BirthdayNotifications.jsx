import { useEffect, useState } from "react";
import dayjs from "dayjs"; // librería para manejar fechas
import { FaWhatsapp } from "react-icons/fa";
import pacientes from "../helpers/pacientes_pediatricos.json";

const BirthdayNotifications = () => {
  const [cumpleanosMes, setCumpleanosMes] = useState([]);

  useEffect(() => {    
    const mesActual = dayjs().month() + 1; // dayjs: 0=enero, 1=febrero...
    
    const filtrados = pacientes.filter((paciente) => {
      if (!paciente.fecha_nacimiento) return false;
      const mesNacimiento = dayjs(paciente.fecha_nacimiento).month() + 1;
      return mesNacimiento === mesActual;
    });

    setCumpleanosMes(filtrados);
  }, [pacientes]);

  if (cumpleanosMes.length === 0) {
    return <div>No hay cumpleaños este mes 🎉</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Cumpleaños del mes 🥳</h2>
      <ul>
        {cumpleanosMes.map((paciente) => (
          <div key={paciente.id} className="mb-1">
            <div className="flex items-center gap-5">
            {paciente.nombre} {paciente.apellido} -{" "}
            {dayjs(paciente.fecha_nacimiento).format("DD/MM")}
            <button className="hover:text-green-400 hover:cursor-pointer"><FaWhatsapp className="text-3xl"/></button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default BirthdayNotifications;
