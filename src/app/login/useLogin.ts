"use client";

// Importa las implementaciones de la capa de Infraestructura y Aplicación
import { AuthApi } from "@/infrastructure/repositories/AuthApi";
import { AuthCases } from "@/application/useCases/AuthCases";
// Hooks de React (para estado, efectos y referencias)
import { useEffect, useRef, useState } from "react";
// Hook de Next.js para la navegación
import { useRouter } from "next/navigation";

interface User {
  username: string;
  password: string;
}

const useLogin = () => {
  // --- A. ESTADO DE LA ENTRADA DEL USUARIO ---
  // Almacena las credenciales introducidas en el formulario.
  const [user, setUser] = useState<User>({ username: "", password: "" });
  
  // --- B. ESTADO DE LA RETROALIMENTACION DE LA UI (MENSAJES) ---
  // Controla la visibilidad y el contenido del mensaje informativo (DSInfo).
  const [error, setError] = useState(false);
  const [textInfo, setTextInfo] = useState("");
  const [colorInfo, setColorInfo] = useState("success");

  // --- C. ESTADO DE CONTROL DEL FLUJO DE EJECUCION ---
  // Controla el estado del botón y la navegación.
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();

  // --- D. REFERENCIA DEL DOM ---
  // Permite acceder al elemento input del usuario para manipular el foco.
  const inputRef = useRef<HTMLInputElement>(null);

  // Efecto que se ejecuta solo al montar el componente para inicialización
  useEffect(() => {
    // Inicializa las credenciales con valores por defecto ("ivan", "admin")
    setUser({ username: "ivan", password: "admin" });
    // Establece el foco en el campo de entrada (usando la referencia)
    inputRef.current?.focus();
  }, []);

  // Función principal para manejar el intento de inicio de sesión
  const handleLogin = async (username: string, password: string) => {
    // Deshabilita el botón para evitar múltiples envíos
    setButtonDisabled(true);
    // Reinicia el estado de error/mensaje antes del intento
    setError(false);
    setTextInfo("");

    try {
      // --- 1. Validaciones básicas de campos vacíos (Lógica de Presentación) ---
      if (!username && !password) {
        setError(true);
        setTextInfo("Ingrese su usuario y contraseña");
        setColorInfo("warning");
        return; // Detiene el proceso y muestra el warning
      }

      if (!username) {
        setError(true);
        setTextInfo("Ingrese su usuario");
        setColorInfo("warning");
        return;
      }

      if (!password) {
        setError(true);
        setTextInfo("Ingrese su contraseña");
        setColorInfo("warning");
        return;
      }

      // --- 2. Ejecución del Caso de Uso (Lógica de Negocio) ---
      // Instanciamos la clase 'AuthCases' (Capa de Aplicación)
      // Inyectamos 'AuthApi' (Capa de Infraestructura)
      const authCases = new AuthCases(new AuthApi());
      const isLoginSuccess = await authCases.login(username, password);

      // --- 3. Manejo de Respuesta Exitosa (Status 200/204) ---
      if (isLoginSuccess.status === 200 || isLoginSuccess.status === 204) {
        // Limpia el formulario
        setUser({ username: "", password: "" });
        
        // Muestra un mensaje de éxito
        setError(true);
        setTextInfo("success");
        setColorInfo("success");

        // Almacena la información de sesión en LocalStorage
        if ("response" in isLoginSuccess) {
          localStorage.setItem("token", isLoginSuccess.response.accessToken);
          localStorage.setItem("username", isLoginSuccess.response.username);
          localStorage.setItem("email", isLoginSuccess.response.email);
          localStorage.setItem("firstName", isLoginSuccess.response.firstName);
          localStorage.setItem("lastName", isLoginSuccess.response.lastName);
          
          // Redirige al usuario al listado de productos
          router.push("/listado");
        }
      } 
      // --- 4. Manejo de Respuesta Fallida (Credenciales Incorrectas) ---
      else {
        inputRef.current?.focus(); 
        setError(true);
        setTextInfo("Credenciales incorrectas");
        setColorInfo("error");
      }
    } catch (error) {
      // --- 5. Manejo de Errores de Red o Excepciones Inesperadas ---
      console.error(error);
      setError(true);
      setTextInfo("Error de servidor");
      setColorInfo("error");
      inputRef.current?.focus();
    } finally {
      // Siempre se ejecuta, re-habilita el botón
      setButtonDisabled(false);
    }
  };

  // Función que se llama cada vez que el usuario teclea en un input
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    // Actualiza el estado del usuario fusionando el campo modificado
    setUser({ ...user, [field]: e.target.value });
  };

  return {
    // ENTRADA DE FORMULARIO
    user,
    onChange,
    // ACCIONES DE USUARIO
    handleLogin,
    // MENSAJES DE UI
    error,
    textInfo,
    colorInfo,
    // CONTROLES DE UI
    buttonDisabled,
    inputRef,
  };
};

export default useLogin;