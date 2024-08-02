// import React, { useEffect } from 'react';
// import { Table, Button, Modal, Input, Form } from 'antd';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


// const ListOfItems = ({ company, onEditItem, onDeleteItem }) => {
//   const [isEditing, setIsEditing] = React.useState(false);
//   const [editingItem, setEditingItem] = React.useState(null);
//   const [form] = Form.useForm();

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setIsEditing(true);
//   };

//   const handleDelete = (itemId) => {
//     Modal.confirm({
//       title: 'هل انت متاكد من حذف هذا المنتج',
//       onOk: () => onDeleteItem(itemId),
//     });
//   };

//   const handleEditSubmit = (values) => {
//     onEditItem({ ...editingItem, ...values });
//     setIsEditing(false);
//     form.resetFields();
//   };

//   useEffect(() => {
//     if (isEditing && editingItem) {
//       form.setFieldsValue(editingItem);
//     } else {
//       form.resetFields();
//     }
//   }, [isEditing, editingItem, form]);

//   const columns = [
//     { title: 'اسم المنتج', dataIndex: 'itemName', key: 'itemName' },
//     { title: 'رقم المنتج', dataIndex: 'itemNumber', key: 'itemNumber' },
//     { title: 'السعر الصيني RMB', dataIndex: 'priceInRmb', key: 'priceInRmb' },
//     { title: 'CBM', dataIndex: 'cbm', key: 'cbm' },
//     { title: 'عدد داخل الصندوق', dataIndex: 'countInCarton', key: 'countInCarton' },
//     { title: 'السعر بالدولار', dataIndex: 'priceInDollar', key: 'priceInDollar' },
//     { title: 'ملاحظات', dataIndex: 'notes', key: 'notes' },
//     {
//       title: 'العمليات',
//       key: 'actions',
//       render: (_, record) => (
//         <>
//           <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
//           <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.itemId)} />
//         </>
//       ),
//     },
//   ];

//   const renderMobileView = (item) => (
//     <div className="mobile-card" key={item.itemId}>
//       <h3 className="mobile-card-title">{item.itemName}</h3>
//       <div className="mobile-card-content">
//         <p><span className="label">رقم المنتج:</span> {item.itemNumber}</p>
//         <p><span className="label">السعر الصيني:</span> {item.priceInRmb}</p>
//         <p><span className="label">RMB:</span> {item.priceInRmb}</p>
//         <p><span className="label">CBM:</span> {item.cbm}</p>
//         <p><span className="label">عدد داخل الصندوق:</span> {item.countInCarton}</p>
//         <p><span className="label">السعر بالدولار:</span> {item.priceInDollar}</p>
//         <p><span className="label">ملاحظات:</span> {item.notes}</p>
//       </div>
//       <div className="mobile-card-actions">
//         <button className="edit-button" onClick={() => handleEdit(item)}>
//           <EditOutlined className="action-icon" />
//         </button>
//         <button className="delete-button" onClick={() => handleDelete(item.itemId)}>
//           <DeleteOutlined className="action-icon" />
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <div className="table-container">
//         <Table
//           dataSource={company.items}
//           columns={columns}
//           rowKey="itemId"
//           pagination={false}
//           className="desktop-table"
//         />
//         <div className="mobile-grid">
//           {company.items.map((item) => renderMobileView(item))}
//         </div>
//       </div>

//       <Modal
//         title="تعديل المنتج"
//         visible={isEditing}
//         onCancel={() => {
//           setIsEditing(false);
//           form.resetFields();
//         }}
//         footer={null}
//       >
//         <Form form={form} onFinish={handleEditSubmit}>
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
//             label="CBM"
//             name="cbm"
//             rules={[{ required: true, message: 'ادخل CBM!' }]}
//           >
//             <Input />
//           </Form.Item>
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
//               حفظ التعديلات
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default ListOfItems;
import React, { useContext, useEffect } from 'react';
import { Table, Button, Modal, Input, Form } from 'antd';
import { EditOutlined, DeleteOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { LocalStorageContext } from '../context/localStorageContext';

const ListOfItems = ({ company, onEditItem, onDeleteItem }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState(null);
  const [form] = Form.useForm();
  const { toggleFavorite, favorites } = useContext(LocalStorageContext);

  const isFavorite = (itemId) => {
    return favorites.some((fav) => fav.itemId === itemId);
  };

  const handleFavoriteToggle = (item) => {
    toggleFavorite(item);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleDelete = (itemId) => {
    Modal.confirm({
      title: 'هل انت متاكد من حذف هذا المنتج',
      onOk: () => onDeleteItem(itemId),
    });
  };

  const handleEditSubmit = (values) => {
    onEditItem({ ...editingItem, ...values });
    setIsEditing(false);
    form.resetFields();
  };

  useEffect(() => {
    if (isEditing && editingItem) {
      form.setFieldsValue(editingItem);
    } else {
      form.resetFields();
    }
  }, [isEditing, editingItem, form]);

  const columns = [
    { title: 'اسم المنتج', dataIndex: 'itemName', key: 'itemName' },
    { title: 'رقم المنتج', dataIndex: 'itemNumber', key: 'itemNumber' },
    { title: 'السعر الصيني RMB', dataIndex: 'priceInRmb', key: 'priceInRmb' },
    { title: 'CBM', dataIndex: 'cbm', key: 'cbm' },
    { title: 'عدد داخل الصندوق', dataIndex: 'countInCarton', key: 'countInCarton' },
    { title: 'السعر بالدولار', dataIndex: 'priceInDollar', key: 'priceInDollar' },
    { title: 'ملاحظات', dataIndex: 'notes', key: 'notes' },
    {
      title: 'العمليات',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            icon={isFavorite(record.itemId) ? <StarFilled /> : <StarOutlined />}
            onClick={() => handleFavoriteToggle(record)}
          />
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.itemId)} />
        </>
      ),
    },
  ];

  const renderMobileView = (item) => (
    <div className="mobile-card" key={item.itemId}>
      <h3 className="mobile-card-title">{item.itemName}</h3>
      <div className="mobile-card-content">
        <p><span className="label">رقم المنتج:</span> {item.itemNumber}</p>
        <p><span className="label">السعر الصيني:</span> {item.priceInRmb}</p>
        <p><span className="label">CBM:</span> {item.cbm}</p>
        <p><span className="label">عدد داخل الصندوق:</span> {item.countInCarton}</p>
        <p><span className="label">السعر بالدولار:</span> {item.priceInDollar}</p>
        <p><span className="label">ملاحظات:</span> {item.notes}</p>
      </div>
      <div className="mobile-card-actions">
        <button className="edit-button" onClick={() => handleEdit(item)}>
          <EditOutlined className="action-icon" />
        </button>
        <button className="delete-button" onClick={() => handleDelete(item.itemId)}>
          <DeleteOutlined className="action-icon" />
        </button>
        <button className="favorite-button" onClick={() => handleFavoriteToggle(item)}>
          {isFavorite(item.itemId) ? <StarFilled /> : <StarOutlined />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="table-container">
        <Table
          dataSource={company.items}
          columns={columns}
          rowKey="itemId"
          pagination={false}
          className="desktop-table"
        />
        <div className="mobile-grid">
          {company.items.map((item) => renderMobileView(item))}
        </div>
      </div>

      <Modal
        title="تعديل المنتج"
        visible={isEditing}
        onCancel={() => {
          setIsEditing(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleEditSubmit}>
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
            rules={[{ required: true, message: 'ادخل السعر الصيني!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="CBM"
            name="cbm"
            rules={[{ required: true, message: 'ادخل CBM!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="عدد داخل الصندوق"
            name="countInCarton"
            rules={[{ required: true, message: 'ادخل عدد داخل الصندوق!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="ملاحظات"
            name="notes"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              حفظ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListOfItems;
