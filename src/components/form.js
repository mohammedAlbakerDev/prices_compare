import React, { useState, useContext } from 'react';
import { localStorageContext } from '../context/localStorageContext';

const Form = () => {
  const { addCompany } = useContext(localStorageContext);
  const [companyName, setCompanyName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [items, setItems] = useState([{ itemName: '', priceRMB: '', cbm: '', priceUSD: '', price: '' }]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { itemName: '', priceRMB: '', cbm: '', priceUSD: '', price: '' }]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCompany = { companyName, companyId, items };
    addCompany(newCompany);
    setCompanyName('');
    setCompanyId('');
    setItems([{ itemName: '', priceRMB: '', cbm: '', priceUSD: '', price: '' }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Company ID"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
        required
      />
      {items.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Item Name"
            value={item.itemName}
            onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price RMB"
            value={item.priceRMB}
            onChange={(e) => handleItemChange(index, 'priceRMB', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="CBM"
            value={item.cbm}
            onChange={(e) => handleItemChange(index, 'cbm', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price USD"
            value={item.priceUSD}
            onChange={(e) => handleItemChange(index, 'priceUSD', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
            required
          />
          <button type="button" onClick={() => handleRemoveItem(index)}>Remove Item</button>
        </div>
      ))}
      <button type="button" onClick={handleAddItem}>Add Item</button>
      <button type="submit">Save Company</button>
    </form>
  );
};

export default Form;