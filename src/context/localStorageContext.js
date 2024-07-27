import React, { createContext, useState, useEffect } from 'react';

export const LocalStorageContext = createContext();

const LocalStorageProvider = ({ children }) => {
  const [companies, setCompanies] = useState(() => {
    const storedCompanies = localStorage.getItem('companies');
    return storedCompanies ? JSON.parse(storedCompanies) : [];
  });

  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  const addCompany = (newCompany) => {
    setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
  };

  const addItemToCompany = (companyId, item) => {
    setCompanies((prevCompanies) => {
      const updatedCompanies = prevCompanies.map((company) => {
        if (company.companyId === companyId) {
          const newItem = {
            ...item,
            priceInDollar: ((((item.priceInRmb / 7.22) * item.countInCarton) + 15)/item.countInCarton).toFixed(1),
            itemId: Date.now().toString(),
          };
          return { ...company, items: [...company.items, newItem] };
        }
        return company;
      });
      return updatedCompanies;
    });
  };

  const updateItemInCompany = (companyId, updatedItem) => {
    setCompanies((prevCompanies) => {
      return prevCompanies.map((company) => {
        if (company.companyId === companyId) {
          const updatedItems = company.items.map((item) =>
            item.itemId === updatedItem.itemId ? { ...updatedItem, priceInDollar:((((updatedItem.priceInRmb / 7.22) * updatedItem.countInCarton) + 15)/updatedItem.countInCarton).toFixed(1) } : item
          );
          return { ...company, items: updatedItems };
        }
        return company;
      });
    });
  };
  

  const deleteItemFromCompany = (companyId, itemId) => {
    setCompanies((prevCompanies) => {
      return prevCompanies.map((company) => {
        if (company.companyId === companyId) {
          const updatedItems = company.items.filter((item) => item.itemId !== itemId);
          return { ...company, items: updatedItems };
        }
        return company;
      });
    });
  };

  const deleteCompany = (companyId) => {
    const updatedCompanies = companies.filter((company) => company.companyId !== companyId);
    setCompanies(updatedCompanies);
  };

  return (
    <LocalStorageContext.Provider
      value={{
        companies,
        addCompany,
        addItemToCompany,
        updateItemInCompany,
        deleteItemFromCompany,
        deleteCompany,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

export default LocalStorageProvider;