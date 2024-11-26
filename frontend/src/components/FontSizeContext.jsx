import React, { createContext, useState, useEffect } from 'react';

export const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(() => {
    // Recuperar el tamaño de la fuente desde localStorage o usar 20px por defecto
    const savedSize = localStorage.getItem('fontSize');
    // Me pregunto si hay uno guardado desde antes y si no se usa el 20
    return savedSize ? parseInt(savedSize, 10) : 20;
  });

  useEffect(() => {
    // Guardar el tamaño de la fuente en localStorage cuando cambie
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);
  // Se hará del 36 el máximo y del 20 el minimo
  const increaseFontSize = () => setFontSize((prevSize) => Math.min( 40, 40));
  const decreaseFontSize = () => setFontSize((prevSize) => Math.max( 25, 25));
  const midsetFontsize = () => setFontSize(() => 30)

  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize, midsetFontsize }}>
      {children}
    </FontSizeContext.Provider>
  );
};
