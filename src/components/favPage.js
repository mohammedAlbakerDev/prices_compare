// src/components/FavoritesPage.js
import React from 'react';
import { Button, List } from 'antd';
import { LocalStorageContext } from '../context/localStorageContext';

const FavoritesPage = ({ onSelectCompany }) => {
  const { favorites, companies } = React.useContext(LocalStorageContext);

  const handleSelectCompany = (companyId) => {
    const company = companies.find(company => company.companyId === companyId);
    onSelectCompany(company);
  };

  const handleSelectItem = (item) => {
    const company = companies.find(company => company.companyId === item.companyId);
    onSelectCompany(company);
  };

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={favorites}
        renderItem={item => (
          <List.Item
            actions={[
              <Button onClick={() => handleSelectItem(item)}>عرض الشركة</Button>,
            ]}
          >
            <List.Item.Meta
              title={item.itemName}
              description={`رقم المنتج: ${item.itemNumber} - السعر بالدولار: ${item.priceInDollar}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default FavoritesPage;
