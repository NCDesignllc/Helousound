import React, { createContext, useState, useContext } from 'react';

export const SelectedPackageContext = createContext();

export const SelectedPackageProvider = ({ children }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [cart, setCart] = useState({});

  // Helper to clear cart when needed
  const clearCart = () => setCart({});

  return (
    <SelectedPackageContext.Provider value={{ 
      selectedPackage, 
      setSelectedPackage,
      cart,
      setCart,
      clearCart
    }}>
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
