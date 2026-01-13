import React, { createContext, useState } from 'react';

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
  const context = React.useContext(SelectedPackageContext);
  if (!context) {
    throw new Error('useSelectedPackage must be used within SelectedPackageProvider');
  }
  return context;
};
