import React, {useState, useEffect} from "react";
const Search = ({ onSearch }) => {
    const [dataSearch, setDataSearch] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setDataSearch(value);
    onSearch(value); // Filtra mientras escribes
  };

  return (
    <form className="flex items-center pr-2 max-w-full dark:text-white " onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={dataSearch}
        onChange={handleChange}
        className="border border-gray-300 p-4 rounded bg-white max-w-full dark:bg-gray-900 "
        placeholder="Buscar paciente..."
      />
    </form>
  );
};
export default Search;
