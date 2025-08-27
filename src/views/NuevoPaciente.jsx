import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
const NuevoPaciente = ({ isOpen, onClose, onForm}) => {
  const [formData, setFormData] = useState({});
  if (!isOpen) return null; // No renderizar si el modal no está abierto

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [property]: value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    //console.log(event.target.files[0]);

    if (selectedFile && selectedFile.type === "application/pdf") {
      setDocData({ ...docData, file: selectedFile });
    } else {
      alert.error("Solo se permiten archivos PDF.");
      event.target.value = null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await postForm(formData);
      onForm(response);
      setFormData({});
      onClose();
    } catch (error) {
      console.error("Error al subir:", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 dark:bg-opacity-70">
      <form
        onSubmit={handleSubmit}
        className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-10"
      >
        <div
          className="bg-white dark:bg-gray-900 p-4 rounded shadow-lg w-full max-w-md dark:border dark:border-white"
          data-aos="zoom-out"
        >
          <div className="">
            <button
              className="float-right text-2xl text-gray-900 hover:text-gray-900 rounded dark:text-white"
              onClick={onClose}
            >
              &times;
            </button>
            <div className="flex flex-col">
              <h2 className="flex justify-center underline-offset-2 underline text-xl p-4">
                Subir documento
              </h2>
              <div className="p-2 space-y-2">
                <div className="flex items-center justify-start">
                  <span className="p-2 cursor-default justify-end min-w-fit">
                    Título
                  </span>
                  <input
                    type="text"
                    name="titulo"
                    className="p-2 my-2 w-full rounded border focus:outline-indigo-600 sm:text-sm dark:bg-gray-900"
                    value={docData.titulo}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex justify-center p-2 space-y-2">
                <div className="flex items-center justify-start">
                  <input
                    type="file"
                    accept=".pdf"
                    name="file"
                    className="p-2 my-2 w-full rounded border focus:outline-indigo-600 sm:text-sm dark:bg-gray-900 hover:cursor-pointer"
                    required
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-white hover:bg-gray-300 border px-4 py-2 rounded m-2 transition duration-300 dark:bg-gray-900"
              type="submit"
            >
              <FaFileUpload className="text-2xl mr-2" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default NuevoPaciente;
