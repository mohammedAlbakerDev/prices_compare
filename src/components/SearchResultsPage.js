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
              <h3 className="mobile-card-title">{item.itemName}</h3>
              <Divider />
              <div className="mobile-card-content">
        <p><span className="label"> رقم او رمز المنتج &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;  </span> <span style={{color:'blue'}}>{item.itemNumber}</span></p>
        <p><spna style={{color:'red'}}>&yen; </spna>{item.priceInRmb}<span className="label"> :  السعر الصيني RMB </span> </p>
        <p><span style={{color:'Highlight'}}>&#13221; </span>{item.cbm}<span className="label"> : &nbsp;&nbsp;&nbsp;CBM(متر مكعب)</span> </p>
        <p><span className="label">عدد داخل الصندوق &nbsp;&nbsp;&nbsp;: </span> {item.countInCarton}</p>
        <p><span style={{color:'green'}}>$</span><span className="label">السعر بالدولار &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span> {item.priceInDollar}</p>
        <p><span style={{color:'#b87e13'}}>{item.notes}</span><span className="label"> : ملاحظات</span> </p>
      </div>
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
