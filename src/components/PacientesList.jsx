import React, { useEffect, useState } from "react";
import pacientes from "../helpers/pacientes_pediatricos.json";
import consultas from "../helpers/consultas.json";
import PacientesCard from "./PacientesCard";
import { useNavigate } from "react-router-dom";

const PacientesList = ({ searchData, clearSearch }) => {
  const [pacientesConConsultas, setPacientesConConsultas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dataUnida = pacientes.map((paciente) => {
      const consultasPaciente = consultas.filter(
        (consulta) => consulta.id_paciente === paciente.id
      );
      return { ...paciente, consultas: consultasPaciente };
    });
    setPacientesConConsultas(dataUnida);
  }, []);

  const filteredPacientes = pacientesConConsultas.filter((p) => {
    const nombreCompleto = `${p.nombre} ${p.apellido}`.toLowerCase();
    return nombreCompleto.includes(searchData.toLowerCase());
  });
  const onDetail = (id) => {
    navigate(`/paciente/${id}`);
    clearSearch();
  };

  return (
    <div className="flex flex-col w-full justify-center dark:bg-gray-900 mt-30 mb-24 bg-white">
      {filteredPacientes.length > 0 ? (
        filteredPacientes.map((paciente) => (
          <PacientesCard
            key={paciente.id}
            paciente={paciente}
            onClick={() => onDetail(paciente.id)}
          />
        ))
      ) : (
        <span className="p-4">
          No se encontraron pacientes que coincidan con la búsqueda.
        </span>
      )}
    </div>
  );
};
export default PacientesList;
