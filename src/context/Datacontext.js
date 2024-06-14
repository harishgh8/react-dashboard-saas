import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children, initialData = [] }) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <DataContext.Provider
      value={{ data, setData, isLoading, setIsLoading, error, setError }}
    >
      {children}
    </DataContext.Provider>
  );
};
