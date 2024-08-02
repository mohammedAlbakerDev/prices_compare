import React from 'react';
import { List, Button, Typography, Divider, Card, Tag } from 'antd';
import { DollarCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const SearchResultsPage = ({ searchResults, onSelectSearchResult }) => {
  // Sort search results by price in RMB
  const sortedResults = [...searchResults].sort((a, b) => a.priceInRmb - b.priceInRmb);

  // Helper function to get items with the same price
  const getGroupedByPrice = (items) => {
    const grouped = {};
    items.forEach(item => {
      if (!grouped[item.priceInRmb]) {
        grouped[item.priceInRmb] = [];
      }
      grouped[item.priceInRmb].push(item);
    });
    return grouped;
  };

  const groupedResults = getGroupedByPrice(sortedResults);

  return (
    <div className="search-results">
      <Title level={2} style={{ marginBottom: '20px' }}>نتائج البحث</Title>
      <Text style={{ display: 'block', marginBottom: '20px' }}>
        النتائج مرتبة من الأرخص إلى الأغلى
      </Text>
      {Object.keys(groupedResults).map(price => (
        <div key={price} style={{ marginBottom: '16px' }}>
          {groupedResults[price].length > 1 && (
            <Tag color="blue" icon={<InfoCircleOutlined />}>
              {groupedResults[price].length} منتجات بنفس السعر
            </Tag>
          )}
          {groupedResults[price].map(item => (
            <Card key={item.itemNumber} className="search-result-card">
              <Title level={5}>{item.itemName}</Title>
              <Divider />
              <Text strong>رقم المنتج:</Text> {item.itemNumber} <br />
              <Text strong>سعر RMB:</Text> {item.priceInRmb} <br />
              <Text strong>سعر الدولار:</Text> {item.priceInDollar} <br />
              <Text strong>اسم الشركة:</Text> {item.companyName} <br />
              <Text strong>رقم الشركة:</Text> {item.companyId} <br />
              <Text strong>ملاحظات:</Text> {item.notes} <br />
              <Text strong>عدد الكرتونات:</Text> {item.countInCarton} <br />
              <Button
                type="primary"
                icon={<DollarCircleOutlined />}
                block
                onClick={() => onSelectSearchResult(item.companyId)}
              >
                عرض الشركة
              </Button>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SearchResultsPage;
