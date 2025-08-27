import PacientesList from "../components/PacientesList";

const Landing = ({searchData, clearSearch}) => {
  return (
    <>
      <PacientesList searchData={searchData} clearSearch={clearSearch}/>
    </>
  );
};
export default Landing;
