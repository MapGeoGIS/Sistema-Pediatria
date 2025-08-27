import React, { useState, useEffect } from "react";
import { FaChild } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import {
  calcularEdadString,
  formatearFecha,
  getUltimaConsulta,
} from "../helpers/functions";

const PacientesCard = ({ paciente, onClick }) => {
  const [ultimaConsulta, setUltimaConsulta] = useState({});

  useEffect(() => {
    const ultima = getUltimaConsulta(paciente.consultas);
    setUltimaConsulta(ultima);
  }, [paciente]);

  return (
    <div
      onClick={onClick}
      className="p-4 rounded m-2 shadow-lg border border-gray-300 cursor-pointer dark:bg-gray-900"
    >
      <div className="flex justify-between items-center rounded">
        <div className="flex items-center">
          <FaChild className="text-2xl p-1 m-2 bg-gray-300 rounded-full" />
          <span className="text-shadow-lg">
            {`${paciente.apellido} ${paciente.nombre}, ` +
              calcularEdadString(`${paciente.fecha_nacimiento}`)}
          </span>
        </div>
        <FaAngleRight className="text-xl m-2" />
      </div>
      <div className="text-xs p-1">
        {ultimaConsulta
          ? `Última consulta: ` + formatearFecha(ultimaConsulta.fecha_consulta)
          : `Última consulta: Sin datos`}
      </div>
      <div className="text-xs p-1">
        {ultimaConsulta ? `Conducta: ${ultimaConsulta.conducta}` : ""}
      </div>
    </div>
  );
};

export default PacientesCard;
