import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children, initialData = [] }) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [configName, setConfigName] = useState("");
  const [configNames, setConfigNames] = useState([]);
  const [isSelectConfigFromList, setIsSelectConfigFromList] = useState(false);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        isLoading,
        setIsLoading,
        configName,
        setConfigName,
        error,
        setError,
        configNames,
        setConfigNames,
        isSelectConfigFromList,
        setIsSelectConfigFromList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
