import React from "react";
import "./styles.css"; // Importamos el archivo CSS

type LabelProps = {
  text: string;
  size?: "small" | "medium" | "large"; // Tamaños predefinidos en el CSS
  color?: string; // Color personalizado
  className?: string; // Clases adicionales opcionales
};

const index: React.FC<LabelProps> = ({
  text,
  size = "medium",
  color,
  className = "",
}) => {
  return (
    <p className={`label ${size} ${className}`} style={{ color }}>
      {text}
    </p>
  );
};

export default index;
