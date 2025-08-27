import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegFilePdf } from "react-icons/fa6";
import { IoMdCalendar } from "react-icons/io";
import pacientes from "../helpers/pacientes_pediatricos.json";
import consultas from "../helpers/consultas.json";
import { formatearFecha, calcularEdadString } from "../helpers/functions";
import Swal from "sweetalert2";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [verConsultas, setVerConsultas] = useState(false);

  useEffect(() => {
    const pacienteData = pacientes.find((p) => p.id === id);
    if (pacienteData) {
      const consultasPaciente = consultas
        .filter((c) => c.id_paciente === pacienteData.id)
        .sort(
          (a, b) => new Date(b.fecha_consulta) - new Date(a.fecha_consulta)
        ); // Orden descendente
      setPaciente({ ...pacienteData, consultas: consultasPaciente });
    }
  }, [id]);

  if (!paciente) return <div>Paciente no encontrado</div>;

  const ultimaConsulta = paciente.consultas?.[0];

  const onClickDevTool = () => {
    Swal.fire({
      icon: "info",
      title: "Funcionalidad en desarrollo",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="p-4 m-2 border border-gray-300 rounded shadow-lg mt-30 mb-24 dark:bg-gray-900 bg-white overflow-hidden">
      <div className="flex gap-1">
        <button
          onClick={onClickDevTool}
          className="flex items-center gap-2 mb-4 px-2 py-1 bg-blue-500 text-white rounded cursor-pointer"
        >
          <FaRegFilePdf className="text-xl" /> Informe PDF
        </button>
        <button
          onClick={onClickDevTool}
          className="flex items-center gap-2 mb-4 px-2 py-1 bg-blue-500 text-white rounded cursor-pointer"
        >
          <IoMdCalendar className="text-xl" /> Nuevo turno
        </button>
      </div>

      <div className="border-b pb-2 mb-2">
        <h2 className="text-xl font-bold">
          {paciente.apellido} {paciente.nombre}
        </h2>
        <p>Edad: {calcularEdadString(paciente.fecha_nacimiento)}</p>
        <p>DNI: {paciente.numero_documento}</p>
        <div className="flex flex-col">
          <span>
            Obra Social:{" "}
            {`${paciente.obra_social} / ${paciente.numero_afiliado_obra_social}`}
          </span>
        </div>
        <div className="container mt-2 border border-gray-300 p-2 rounded bg-gray-100 dark:bg-gray-800">
          <p>Diagnósticon Inicial: {paciente.diagnostico}</p>
          <p>Antecedentes Perinatales: {paciente.antecedentes_perinatales}</p>
          <p>Antecedentes Familiares: {paciente.antecedentes_familiares}</p>
        </div>
      </div>
      <h3 className="mt-2 font-semibold italic">Consultas Realizadas</h3>
      {paciente.consultas?.length ? (
        <div className="space-y-2 mt-2">
          <div className="flex flex-col mt-2 py-2">
            <span>{`${formatearFecha(ultimaConsulta.fecha_consulta)}`}</span>
            <div className="flex flex-col border border-gray-300 p-2 rounded dark:bg-gray-800 my-2">
              <div className="flex gap-2 flex-wrap">
                <span>{`Peso: ${ultimaConsulta.peso_kg} kg.`}</span>
                <span>{`Talla: ${ultimaConsulta.talla_cm} cm.`}</span>
                <span>{`PC: ${ultimaConsulta.perimetro_cefalico} cm.`}</span>
                <span>{`IMC: ${(
                  ultimaConsulta.peso_kg /
                  (ultimaConsulta.talla_cm / 100) ** 2
                ).toFixed(2)}`}</span>
              </div>
              <button
                className="sm:w-fit mt-2 px-2 py-1 text-white bg-blue-500 rounded cursor-pointer"
                onClick={onClickDevTool}
              >
                Ver curvas
              </button>
            </div>

            <span className="text-xl">{`Motivo: ${ultimaConsulta.motivo_consulta}`}</span>
            <span className="text-xl">{`Conducta: ${ultimaConsulta.conducta}`}</span>
          </div>
          {verConsultas &&
            paciente.consultas.slice(1).map((c, index) => (
              <div className="flex flex-col border-t mt-2 py-2" key={index}>
                <span>{`${formatearFecha(c.fecha_consulta)}`}</span>
                <span>{`Motivo: ${c.motivo_consulta}`}</span>
                <span>{`Conducta: ${c.conducta}`}</span>
              </div>
            ))}
          {paciente.consultas.length > 1 && (
            <button
              onClick={() => setVerConsultas(!verConsultas)}
              className="mt-2 px-2 py-1 text-white bg-blue-500 dark:bg-gray-700 rounded cursor-pointer"
            >
              {verConsultas
                ? "Ver menos"
                : `Ver ${paciente.consultas.length - 1} más`}
            </button>
          )}
        </div>
      ) : (
        <p>Sin consultas registradas</p>
      )}
    </div>
  );
};

export default Detail;
