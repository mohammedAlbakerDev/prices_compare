// src/components/NewCompanyForm.js
import React, { useState, useContext } from 'react';
import { LocalStorageContext } from '../context/localStorageContext';
import { Button, Input } from 'antd';

const NewCompanyForm = () => {
  const { addCompany } = useContext(LocalStorageContext);
  const [companyName, setCompanyName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [items, setItems] = useState([]);

  const handleSubmit = () => {
    const newCompany = { companyName, companyId, items };
    addCompany(newCompany);
    setCompanyName('');
    setCompanyId('');
  };

  return (
    <div>
      <Input
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <Input
        placeholder="Company ID"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
      />
      <Button onClick={handleSubmit}>Add Company</Button>
    </div>
  );
};

export default NewCompanyForm;
