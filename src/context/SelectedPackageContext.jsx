import React, { createContext, useState, useContext } from 'react';

export const SelectedPackageContext = createContext();

export const SelectedPackageProvider = ({ children }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <SelectedPackageContext.Provider value={{ selectedPackage, setSelectedPackage }}>
      {children}
    </SelectedPackageContext.Provider>
  );
};

export const useSelectedPackage = () => {
  const context = useContext(SelectedPackageContext);
  if (!context) {
    throw new Error('useSelectedPackage must be used within SelectedPackageProvider');
  }
  return context;
};
