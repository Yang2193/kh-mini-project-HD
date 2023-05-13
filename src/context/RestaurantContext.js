import React, { createContext, useState } from "react";

export const RestaurantContext = createContext();

const RestaurantContexts = ({ children }) => {
  const [restValue, setRestValue] = useState({ 
    memId: "",
    restId: "",
    restName: "",
    restDate: "",
    isAvailable: "",
    category: "",
  });

  return (
    <RestaurantContext.Provider value={{ restValue, setRestValue }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContexts;
