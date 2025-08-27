import { useState, useEffect } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import GoogleAuthModal from "./views/GoogleAuthModal";
import NavBar from "./components/NavBar";
import BottomNavBar from "./components/BottomNavBar";
import Landing from "./views/Landing";
import Notifications from "./views/Notifications";
import GoogleCalendarEmbed from "./views/Calendar";
import NuevoPaciente from "./views/NuevoPaciente";
import Share from "./views/Share";
import Detail from "./views/Detail";
import { toast } from "react-toastify";

const ALLOWED_EMAILS = ["mapgeo.gis@gmail.com", "martin.gette.5@gmail.com"];

function App() {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Check user in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("google_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (payload) => {
    if (!ALLOWED_EMAILS.includes(payload.email)) {
      toast.error("Tu cuenta no tiene permisos para acceder al sistema!");
      return;
    }

    const userData = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };

    setUser(userData);
    localStorage.setItem("google_user", JSON.stringify(userData));
    toast.success(`Bienvenido, ${userData.name}`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("google_user");
    navigate("/");
  };

  const handleSearch = (data) => {
    if (location.pathname !== "/") navigate("/");
    setSearchData(data);
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const submitForm = (formData) => {
    console.log("Nuevo paciente:", formData);
  };

  const clearSearch = () => {
    setSearchData(null);
    console.log("Search cleared");
    
  };
  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
      {!user ? (
        <GoogleAuthModal onLoginSuccess={handleLogin} />
      ) : (
        <>
          <NavBar
            user={user}
            onLogout={handleLogout}
            onSearch={handleSearch}
            darkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />

          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <Landing searchData={searchData} clearSearch={clearSearch} />
                }
              />
              <Route path="/share" element={<Share />} />
              <Route path="/paciente/:id" element={<Detail />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route
                path="/calendar"
                element={<GoogleCalendarEmbed user={user} />}
              />
            </Routes>
          </main>

          <BottomNavBar location={location} />

          {showForm && (
            <NuevoPaciente
              isOpen={showForm}
              onClose={() => setShowForm(false)}
              onForm={submitForm}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
