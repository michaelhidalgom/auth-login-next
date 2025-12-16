"use client";

// Importamos los componentes de nuestro Design System (DS) para la UI
import { DSButton, DSInfo, DSInput, DSLabel } from "@/presentation/components";
import React from "react";
import "./styles.css";
// Importamos el Custom Hook que contiene toda la lógica y estado
import useLogin from "./useLogin";

const LoginPage = () => {
  
  // 1. Obtiene toda la lógica reactiva y estados del Custom Hook, organizados por función:
  const {
    // ENTRADA DE FORMULARIO
    user,           // Estado: Contiene {username, password}
    onChange,       // Función: Actualiza el estado 'user' al escribir
    // ACCIONES DE USUARIO
    handleLogin,    // Función: Maneja el intento de inicio de sesión
    // MENSAJES DE UI
    error,          // Estado: ¿Hay un error o mensaje activo?
    textInfo,       // Estado: Texto del mensaje (éxito, error, advertencia)
    colorInfo,      // Estado: Tipo de color para el mensaje (controla el estilo)
    // CONTROLES DE UI
    buttonDisabled, // Estado: Controla si el botón debe estar deshabilitado
    inputRef,       // Referencia al input de usuario (para autofocus)
  } = useLogin();

  return (
    // Contenedor principal para centrar el formulario
    <div className="div__login">
      {/* Título del formulario */}
      <DSLabel
        size="large"
        className="underline"
        text="Ingrese sus credenciales"
      />
      <div>
        {/* Campo de entrada para el usuario */}
        <DSLabel text="Usuario" />
        <DSInput
          value={user.username} // Muestra el valor actual del estado 'user'
          ref={inputRef}        // Asigna la referencia para el foco
          onChange={(e) => onChange(e, "username")} // Llama a la función de actualización de estado
          placeholder="Ingrese su usuario"
        />
        {/* Campo de entrada para la contraseña */}
        <DSLabel text="Contraseña" />
        <DSInput
          value={user.password} // Muestra el valor actual del estado 'user'
          onChange={(e) => onChange(e, "password")} // Llama a la función de actualización de estado
          placeholder="Ingrese su contraseña"
          type="password"
        />
      </div>
      
      {/* Muestra el mensaje DSInfo solo si el estado 'error' es true */}
      {error ? (
        <DSInfo type={colorInfo as "success"} text={textInfo}></DSInfo>
      ) : (
        <></> // Si no hay error, no muestra nada
      )}
      
      {/* Botón de ingreso */}
      <DSButton
        // Al hacer clic, llama a handleLogin con las credenciales actuales
        onClick={() => handleLogin(user.username, user.password)}
        variant="success"
        text="Ingresar"
        disabled={buttonDisabled} // Controlado por el estado del hook
      ></DSButton>
    </div>
  );
};

export default LoginPage;