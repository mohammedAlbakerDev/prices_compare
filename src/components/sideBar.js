// import React, { useState, useContext } from 'react';
// import { Layout, Menu, Button, Modal, Input, Form } from 'antd';
// import { LocalStorageContext } from '../context/localStorageContext';
// import ListOfItems from './List';
// import { PlusOutlined } from '@ant-design/icons';

// const { Header, Content, Footer, Sider } = Layout;

// const SideBar = () => {
//   const { companies, addCompany, deleteCompany, addItemToCompany, updateItemInCompany, deleteItemFromCompany } = useContext(LocalStorageContext);
//   const [collapsed, setCollapsed] = useState(false);
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);

//   const handleAddCompany = (values) => {
//     addCompany({
//       companyName: values.companyName,
//       companyId: values.companyId,
//       items: [],
//     });
//     setIsModalVisible(false);
//   };

//   const handleAddItem = (values) => {
//     if (selectedCompany) {
//       addItemToCompany(selectedCompany.companyId, values);
//       setSelectedCompany({
//         ...selectedCompany,
//         items: [
//           ...selectedCompany.items,
//           {
//             ...values,
//             priceInDollar: (((values.priceInRmb / 7.22) * values.countInCarton) + 15) / values.countInCarton,
//             itemId: Date.now().toString(),
//           },
//         ],
//       });
//       setIsAddItemModalVisible(false);
//     }
//   };

//   const handleEditItem = (updatedItem) => {
//     if (selectedCompany) {
//       const updatedItems = selectedCompany.items.map((item) =>
//         item.itemId === updatedItem.itemId ? { ...updatedItem, priceInDollar: (((updatedItem.priceInRmb / 7.22) * updatedItem.countInCarton) + 15) / updatedItem.countInCarton, } : item
//       );
  
//       setSelectedCompany({
//         ...selectedCompany,
//         items: updatedItems,
//       });
  
//       updateItemInCompany(selectedCompany.companyId, updatedItem);
//       setEditingItem(null);
//       setIsEditing(false); // Ensure the correct modal is closed
//     }
//   };
  
  

//   const handleDeleteItem = (itemId) => {
//     if (selectedCompany) {
//       deleteItemFromCompany(selectedCompany.companyId, itemId);
//       setSelectedCompany({
//         ...selectedCompany,
//         items: selectedCompany.items.filter((item) => item.itemId !== itemId),
//       });
//     }
//   };

//   const handleDeleteCompany = (companyId) => {
//     Modal.confirm({
//       title: 'هل انت متاكد من حذف كل المعلومات من هذه الشركة',
//       onOk: () => {
//         deleteCompany(companyId);
//         setSelectedCompany(null);
//       },
//     });
//   };

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
//         <div className="logo" />
//         <Menu
//           theme="dark"
//           defaultSelectedKeys={['1']}
//           mode="inline"
//           onSelect={({ key }) => setSelectedCompany(companies.find((company) => company.companyId === key))}
//         >
//           {companies.map((company) => (
//             <Menu.Item key={company.companyId} onClick={() => setSelectedCompany(company)}>
//               {company.companyName}
//             </Menu.Item>
//           ))}
//         </Menu>
//         <div style={{ padding: '10px', textAlign: 'center' }}>
//           <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
//             {collapsed ? '' : 'اضف شركة جديدة'}
//           </Button>
//         </div>
//       </Sider>
//       <Layout className="site-layout">
//         <Header style={{ padding: 0, backgroundColor: 'white' }}  >
//         <div style={{display:'flex',justifyContent:'center'}}>
//     {selectedCompany &&
//     <>
//     <h1 style={{textAlign:'center',marginRight:"50px"}}>{selectedCompany?.companyName} : اسم الشركة</h1>
//     <h1 style={{textAlign:'center'}}> {selectedCompany?.companyId}   : رقم الشركة </h1>
//     </>
//     }
//     </div>
//         </Header>
//         <Content style={{ margin: '0 16px' }}>
//           <div style={{ padding: 24, minHeight: 360 }}>
//             {selectedCompany ? (
//               <>
//                 <ListOfItems company={selectedCompany} onEditItem={handleEditItem} onDeleteItem={handleDeleteItem} />
//                 <Button type="primary" onClick={() => setIsAddItemModalVisible(true)}>
//                   اضف بضاعة او منتج جديد
//                 </Button>
//                 <Button danger onClick={() => handleDeleteCompany(selectedCompany.companyId)}>
//                   حذف الشركة
//                 </Button>
//               </>
//             ) : (
//               <div style={{color:'orange',textAlign:'center'}}>اختر شركة لعرض بياناتها</div>
//             )}
//           </div>
//         </Content>
//         <Footer style={{ textAlign: 'center' }}>Mohammed Albaker ©{new Date().getFullYear()} Created by dev mohammed</Footer>
//       </Layout>

//       <Modal
//         title="اضف شركة جديد"
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         <Form onFinish={handleAddCompany}>
//           <Form.Item
//             label="اسم الشركة"
//             name="companyName"
//             rules={[{ required: true, message: 'ادخل اسم الشركة!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="رقم الشركة"
//             name="companyId"
//             rules={[{ required: true, message: 'ادخل رقم او رمز الشركة!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               اضف الشركة
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       <Modal
//         title="اضف بضاعة او منتج جديد"
//         visible={isAddItemModalVisible}
//         onCancel={() => setIsAddItemModalVisible(false)}
//         footer={null}
//       >
//         <Form onFinish={handleAddItem}>
//           <Form.Item
//             label="اسم المنتج"
//             name="itemName"
//             rules={[{ required: true, message: 'ادخل اسم البضاعة!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="رقم او رمز المنتج"
//             name="itemNumber"
//             rules={[{ required: true, message: 'ادخل رقم او رمز المنتج!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="السعر الصيني RMB"
//             name="priceInRmb"
//             rules={[{ required: true, message: 'ادخل السعر RMB!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//           name="cbm"
//           label="CBM"
//           rules={[{ required: true, message: 'ادخل CBM!' }]}
//         >
//           <Input />
//         </Form.Item>
//           <Form.Item
//             label="عدد المنتج داخل الصندوق"
//             name="countInCarton"
//             rules={[{ required: true, message: 'Please input the count in carton!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="ملاحظات عن المنتج"
//             name="notes"
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               اضف
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </Layout>
//   );
// };

// export default SideBar;
import React, { useState, useContext, useRef } from 'react';
import { Layout, Menu, Button, Modal, Input, Form } from 'antd';
import { LocalStorageContext } from '../context/localStorageContext';
import ListOfItems from './List';
import { PlusOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const SideBar = () => {
  const { companies, addCompany, deleteCompany, addItemToCompany, updateItemInCompany, deleteItemFromCompany } = useContext(LocalStorageContext);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const addItemFormRef = useRef(null); // Add a ref for the add item form

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
            priceInDollar: ((((values.priceInRmb / 7.22) * values.countInCarton) + 15) / values.countInCarton).toFixed(1),
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
        item.itemId === updatedItem.itemId ? { ...updatedItem, priceInDollar: ((((updatedItem.priceInRmb / 7.22) * updatedItem.countInCarton) + 15) / updatedItem.countInCarton).toFixed(1), } : item
      );

      setSelectedCompany({
        ...selectedCompany,
        items: updatedItems,
      });

      updateItemInCompany(selectedCompany.companyId, updatedItem);
      setEditingItem(null);
      setIsEditing(false); // Ensure the correct modal is closed
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
      addItemFormRef.current.resetFields(); // Reset the form fields
    }
    setIsAddItemModalVisible(true);
  };

  return (
    <Layout style={{ minHeight: '100vh',marginTop:'-8px',marginLeft:'-8px' }}>
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
        <Header style={{ padding: 0, backgroundColor: 'white' }}  >
        <div style={{display:'flex',justifyContent:'center'}}>
    {selectedCompany &&
    <>
    <h1 style={{textAlign:'center',marginRight:"50px",marginTop:'0px'}}>{selectedCompany?.companyName} : اسم الشركة</h1>
    <h1 style={{textAlign:'center',marginTop:'0px'}}> {selectedCompany?.companyId}   : رقم الشركة </h1>
    </>
    }
    </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            {selectedCompany ? (
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
              <div style={{color:'orange',textAlign:'center'}}>اختر شركة لعرض بياناتها</div>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Mohammed Albaker ©{new Date().getFullYear()} Created by dev mohammed</Footer>
      </Layout>

      <Modal
        title="اضف شركة جديد"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddCompany}>
          <Form.Item
            label="اسم الشركة"
            name="companyName"
            rules={[{ required: true, message: 'ادخل اسم الشركة!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="رقم الشركة"
            name="companyId"
            rules={[{ required: true, message: 'ادخل رقم او رمز الشركة!' }]}
          >
            <Input />
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
            rules={[{ required: true, message: 'Please input the count in carton!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ملاحظات عن المنتج"
            name="notes"
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              اضف
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default SideBar;
