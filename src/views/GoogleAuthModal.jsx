import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const GoogleAuthModal = ({ onLoginSuccess }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h2 className="mb-4 text-xl font-semibold">Iniciar sesión con Google</h2>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential);
          onLoginSuccess(decoded);
        }}
        onError={() => {
          console.log("Error al iniciar sesión");
        }}
        useOneTap={false} // Evita FedCM
      />
    </div>
  );
};

export default GoogleAuthModal;
