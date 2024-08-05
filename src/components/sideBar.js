import React, { useState, useContext, useRef } from 'react';
import { Layout, Menu, Button, Modal, Input, Form } from 'antd';
import { LocalStorageContext } from '../context/localStorageContext';
import ListOfItems from './List';
import { PlusOutlined } from '@ant-design/icons';
import SearchResultsPage from './SearchResultsPage';
import NewCompanyForm from './newCompanyForm'; // Import the new component

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

  const handleAddCompany = (values) => {
    addCompany({
      companyName: values.companyName,
      companyId: values.companyId,
      items: [],
    });
    setIsModalVisible(false);
  };

  const handleAddItem = (values) => {
    if (selectedCompany) {
      addItemToCompany(selectedCompany.companyId, values);
      setSelectedCompany({
        ...selectedCompany,
        items: [
          ...selectedCompany.items,
          {
            ...values,
            priceInDollar: ((((values.priceInRmb / 7.22) * values.countInCarton) + 15) / values.countInCarton).toFixed(2),
            itemId: Date.now().toString(),
          },
        ],
      });
      setIsAddItemModalVisible(false);
    }
  };

  const handleEditItem = (updatedItem) => {
    if (selectedCompany) {
      const updatedItems = selectedCompany.items.map((item) =>
        item.itemId === updatedItem.itemId ? { ...updatedItem, priceInDollar: ((((updatedItem.priceInRmb / 7.22) * updatedItem.countInCarton) + 15) / updatedItem.countInCarton).toFixed(2), } : item
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
        <Header
  style={{
    padding: '',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap', // Enable wrapping for smaller screens
  }}
>
  <div style={{ display: 'flex',justifyContent:'center', alignItems: 'center', flexWrap: 'wrap' }}>
    {selectedCompany && (
      <>
        <h1 className="company-name" style={{ margin: '0 40px 0 0' }}>{selectedCompany?.companyName} : اسم الشركة</h1>
        <h2 className="company-id" style={{ margin: '0' }}>{selectedCompany?.companyId} : رقم الشركة</h2>
      </>
    )}
  </div>
  <Input.Search
    placeholder="ابحث عن منتج"
    onChange={(e) => handleSearch(e.target.value)}
    style={{
      width: '200 px',
      borderRadius: '5px',
      border: 'none',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginTop: '-10px',
    }}
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
        <NewCompanyForm handleAddCompany={handleAddCompany} /> {/* Use the new component */}
      </Modal>

      <Modal
        title="اضف بضاعة او منتج جديد"
        visible={isAddItemModalVisible}
        onCancel={() => setIsAddItemModalVisible(false)}
        footer={null}
      >
        <Form ref={addItemFormRef} onFinish={handleAddItem}>
          <Form.Item
            label="اسم المنتج"
            name="itemName"
            rules={[{ required: true, message: 'ادخل اسم البضاعة!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="رقم او رمز المنتج"
            name="itemNumber"
            rules={[{ required: true, message: 'ادخل رقم او رمز المنتج!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="السعر الصيني RMB"
            name="priceInRmb"
            rules={[{ required: true, message: 'ادخل السعر RMB!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
          name="cbm"
          label="CBM"
          rules={[{ required: true, message: 'ادخل CBM!' }]}
        >
          <Input />
        </Form.Item>
          <Form.Item
            label="عدد المنتج داخل الصندوق"
            name="countInCarton"
            rules={[{ required: true, message: 'ادخل عدد المنتج داخل الصندوق' }]}
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
