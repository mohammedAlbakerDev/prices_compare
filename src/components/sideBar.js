import React, { useState, useContext, useRef } from 'react';
import { Layout, Menu, Button, Modal, Input, Form, Radio } from 'antd';
import { LocalStorageContext } from '../context/localStorageContext';
import ListOfItems from './List';
import { PlusOutlined } from '@ant-design/icons';
import SearchResultsPage from './SearchResultsPage';
const { Header, Content, Footer, Sider } = Layout;

const SideBar = () => {
  const { companies, addCompany, deleteCompany, addItemToCompany, updateItemInCompany, deleteItemFromCompany } = useContext(LocalStorageContext);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchPage, setIsSearchPage] = useState(false);
  const addItemFormRef = useRef(null);

  // Handle adding a company with a currency (RMB or USD)
  const handleAddCompany = (values) => {
    addCompany({
      companyName: values.companyName,
      companyId: values.companyId,
      currency: values.currency, // Add currency field
      items: [],
    });
    setIsModalVisible(false);
  };

  // Handle adding an item and calculate the price in Dollar or RMB
  const handleAddItem = (values) => {
    if (selectedCompany) {
      const item = {
        ...values,
        itemId: Date.now().toString(),
        // If company uses RMB, calculate price in Dollar. If USD, use the price in USD and also calculate total costs.
        priceInDollar: selectedCompany.currency === 'RMB'
          ? ((((values.priceInRmb / 7.22) * values.countInCarton) + (values.cbm * 160)) / values.countInCarton).toFixed(2)
          : values.priceInUsd,
        //   : ((((values.priceInUsd) * values.countInCarton) + (values.cbm * 160)) / values.countInCarton).toFixed(2),
      };

      addItemToCompany(selectedCompany.companyId, item);

      // Update the selected company with the new item
      setSelectedCompany({
        ...selectedCompany,
        items: [
          ...selectedCompany.items,
          item,
        ],
      });

      setIsAddItemModalVisible(false);
    }
  };

  // Handle editing item logic
  const handleEditItem = (updatedItem) => {
    if (selectedCompany) {
      const updatedItems = selectedCompany.items.map((item) =>
        item.itemId === updatedItem.itemId
          ? {
              ...updatedItem,
              priceInDollar: selectedCompany.currency === 'RMB'
                ? ((((updatedItem.priceInRmb / 7.22) * updatedItem.countInCarton) + (updatedItem.cbm * 160)) / updatedItem.countInCarton).toFixed(2)
                : updatedItem.priceInUsd,
                // : ((((updatedItem.priceInUsd) * updatedItem.countInCarton) + (updatedItem.cbm * 160)) / updatedItem.countInCarton).toFixed(2),
            }
          : item
      );

      setSelectedCompany({
        ...selectedCompany,
        items: updatedItems,
      });

      updateItemInCompany(selectedCompany.companyId, updatedItem);
      setEditingItem(null);
      setIsEditing(false);
    }
  };

  const handleDeleteItem = (itemId) => {
    if (selectedCompany) {
      deleteItemFromCompany(selectedCompany.companyId, itemId);
      setSelectedCompany({
        ...selectedCompany,
        items: selectedCompany.items.filter((item) => item.itemId !== itemId),
      });
    }
  };

  const handleDeleteCompany = (companyId) => {
    Modal.confirm({
      title: 'هل انت متاكد من حذف كل المعلومات من هذه الشركة',
      onOk: () => {
        deleteCompany(companyId);
        setSelectedCompany(null);
      },
    });
  };

  const openAddItemModal = () => {
    if (addItemFormRef.current) {
      addItemFormRef.current.resetFields();
    }
    setIsAddItemModalVisible(true);
  };

  const handleSearch = (value) => {
    const results = [];
    companies.forEach((company) => {
      company.items.forEach((item) => {
        if (item.itemName.includes(value) || item.itemNumber.includes(value)) {
          results.push({ ...item, companyName: company.companyName, companyId: company.companyId });
        }
      });
    });
    setSearchResults(results);
    if (value) {
      setIsSearchPage(true);
    } else {
      setIsSearchPage(false);
    }
  };

  const handleSelectSearchResult = (companyId) => {
    const company = companies.find((company) => company.companyId === companyId);
    setSelectedCompany(company);
    setSearchResults([]);
    setIsSearchPage(false);
  };


return (
    <Layout style={{ minHeight: '100vh', marginTop: '-8px', marginLeft: '-8px' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          onSelect={({ key }) => setSelectedCompany(companies.find((company) => company.companyId === key))}
        >
          {companies.map((company) => (
            <Menu.Item key={company.companyId} onClick={() => setSelectedCompany(company)}>
              {company.companyName}
            </Menu.Item>
          ))}
        </Menu>
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            {collapsed ? '' : 'اضف شركة جديدة'}
          </Button>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            {selectedCompany && (
              <>
                <h1 className="company-name" style={{ margin: '0 40px 0 0' }}>{selectedCompany?.companyName} : اسم الشركة</h1>
                <h2 className="company-id" style={{ margin: '0' }}>{selectedCompany?.companyId} : رقم الشركة</h2>
                <h2 className="company-currency" style={{ margin: '0', marginLeft: '30px', color: 'green' }}>
                  {selectedCompany?.currency === 'USD' ? '$ نوع العملة : دولار ' : ' صيني RMB : نوع العملة'}
                </h2>
              </>
            )}
          </div>
          <Input.Search
            placeholder="ابحث عن منتج"
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: '100%', borderRadius: '5px', border: 'none', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', marginTop: '-10px' }}
          />
        </Header>

        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            {isSearchPage ? (
              <SearchResultsPage
                searchResults={searchResults}
                onSelectSearchResult={handleSelectSearchResult}
              />
            ) : (
              selectedCompany ? (
                <>
                  <ListOfItems company={selectedCompany} onEditItem={handleEditItem} onDeleteItem={handleDeleteItem} />
                  <Button type="primary" onClick={openAddItemModal}>
                    اضف بضاعة او منتج جديد
                  </Button>
                  <Button danger onClick={() => handleDeleteCompany(selectedCompany.companyId)}>
                    حذف الشركة
                  </Button>
                </>
              ) : (
                <div style={{ color: 'orange', textAlign: 'center' }}>اختر شركة لعرض بياناتها</div>
              )
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Mohammed Albaker ©{new Date().getFullYear()} Created by dev mohammed ismael</Footer>
      </Layout>

      <Modal
        title="اضف شركة جديدة"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddCompany}>
          <Form.Item
            label="اسم الشركة"
            name="companyName"
            rules={[{ required: true, message: 'يرجى إدخال اسم الشركة' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="رقم الشركة"
            name="companyId"
            rules={[{ required: true, message: 'يرجى إدخال رقم الشركة' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="العملة"
            name="currency"
            rules={[{ required: true, message: 'يرجى اختيار العملة' }]}
          >
            <Radio.Group>
              <Radio value="RMB">صيني RMB</Radio>
              <Radio value="USD">دولار $</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="ملاحظات"
            name="notes"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              اضف الشركة
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="اضف بضاعة او منتج جديد"
        visible={isAddItemModalVisible}
        onCancel={() => setIsAddItemModalVisible(false)}
        footer={null}
      >
        <Form ref={addItemFormRef} onFinish={handleAddItem}>
          <Form.Item
            label="اسم البضاعة"
            name="itemName"
            rules={[{ required: true, message: 'يرجى إدخال اسم البضاعة' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="رقم البضاعة"
            name="itemNumber"
            rules={[{ required: true, message: 'يرجى إدخال رقم البضاعة' }]}
          >
            <Input />
          </Form.Item>
          {selectedCompany?.currency === 'RMB' ? (
            <Form.Item
              label="السعر (RMB)"
              name="priceInRmb"
              rules={[{ required: true, message: 'يرجى إدخال السعر  RMB' }]}
            >
              <Input />
            </Form.Item>
          ) : (
            <Form.Item
              label="السعر (بالدولار)"
              name="priceInUsd"
              rules={[{ required: true, message: 'يرجى إدخال السعر بالدولار' }]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            label="CBM"
            name="cbm"
            rules={[{ required: true, message: 'يرجى إدخال CBM' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="العدد في الكرتون"
            name="countInCarton"
            rules={[{ required: true, message: 'يرجى إدخال العدد في الكرتون' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ملاحظات"
            name="notes"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              اضف البضاعة
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default SideBar;