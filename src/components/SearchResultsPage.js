import React,{useContext} from 'react';
import { Button, Typography, Divider, Card } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import { LocalStorageContext } from '../context/localStorageContext';

const { Title, Text } = Typography;

const EXCHANGE_RATE = 7.22; // Define your exchange rate for USD to RMB conversion

const SearchResultsPage = ({ searchResults, onSelectSearchResult,  }) => {
  const { companies } = useContext(LocalStorageContext);

  // Helper function to get the price in RMB for sorting
  const getPriceInRmb = (item) => {
    const company = companies.find(company => company.companyId === item.companyId);
    if (company && company.currency === 'USD') {
      return (item.priceInDollar * EXCHANGE_RATE);
    } else {
      return item.priceInRmb;
    }
  };

  // Helper function to get price after costs in RMB
  const getPriceAfterCostsInRmb = (item) => {
    const company = companies.find(company => company.companyId === item.companyId);
    if (company && company.currency === 'USD') {
      return item.calculatedPriceAfterCosts; // Use the pre-calculated price after costs for USD
    } else {
      return item.calculatedPriceAfterCosts; // Use the pre-calculated price after costs for RMB
    }
  };

  // Sort search results by price in RMB after costs
  const sortedResults = [...searchResults].sort((a, b) => getPriceAfterCostsInRmb(a) - getPriceAfterCostsInRmb(b));

  // Helper function to display prices with proper conversions
  const displayPrices = (item) => {
    const company = companies.find(company => company.companyId === item.companyId);
    const currency = company ? company.currency : 'RMB'; // Default to RMB if no company found

    if (currency === 'USD') {
      // For USD, display the original price in USD and converted price in RMB
      return (
        <>
          <p><span style={{ color: 'green' }}>$</span> {item.priceInDollar} <span className="label">: السعر بالدولار</span></p>
          <p><span style={{ color: 'red' }}>&yen;</span> {(item.priceInDollar * EXCHANGE_RATE).toFixed(2)} <span className="label">: السعر الصيني RMB (محوّل)</span></p>
          <p><span style={{ color: 'green' }}>$</span> {item.calculatedPriceAfterCosts} <span className="label">: السعر بالدولار بعد التكاليف</span></p>
        </>
      );
    } else {
      // For RMB, display only the RMB price and the RMB price after costs
      return (
        <>
          <p><span style={{ color: 'red' }}>&yen;</span> {item.priceInRmb} <span className="label">: السعر الصيني RMB </span></p>
          <p><span style={{ color: 'green' }}>$</span> {(item.calculatedPriceAfterCosts).toFixed(2)} <span className="label">: السعر دولار بعد التكاليف</span></p>
        </>
      );
    }
  };

  return (
    <div className="search-results">
      <Title level={2} style={{ marginBottom: '20px' }}>نتائج البحث</Title>
      <Text style={{ display: 'block', marginBottom: '20px' }}>
        النتائج مرتبة من الأرخص إلى الأغلى
      </Text>
      {sortedResults.map(item => (
        <Card key={item.itemNumber} className="search-result-card">
          <h3 className="mobile-card-title">{item.itemName}</h3>
          <Divider />
          <div className="mobile-card-content">
            <p><span className="label"> رقم او رمز المنتج &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;  </span> <span style={{ color: 'blue' }}>{item.itemNumber}</span></p>
            {displayPrices(item)}
            <p><span style={{ color: 'Highlight' }}>&#13221; </span>{item.cbm}<span className="label"> : &nbsp;&nbsp;&nbsp;CBM(متر مكعب)</span></p>
            <p><span className="label">عدد داخل الصندوق &nbsp;&nbsp;&nbsp;: </span> {item.countInCarton}</p>
            <p><span style={{ color: '#b87e13' }}>{item.notes}</span><span className="label"> : ملاحظات</span></p>
            <p><span className="label">رقم الشركة &nbsp;&nbsp;&nbsp;: </span> {item.companyId}</p>
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
  );
};

export default SearchResultsPage;