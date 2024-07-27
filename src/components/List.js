// // import React, { useEffect } from 'react';
// // import { Table, Button, Modal, Input, Form } from 'antd';
// // import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// // const ListOfItems = ({ company, onEditItem, onDeleteItem }) => {
// //   const [isEditing, setIsEditing] = React.useState(false);
// //   const [editingItem, setEditingItem] = React.useState(null);
// //   const [form] = Form.useForm();

// //   const handleEdit = (item) => {
// //     setEditingItem(item);
// //     setIsEditing(true);
// //   };

// //   const handleDelete = (itemId) => {
// //     Modal.confirm({
// //       title: 'هل انت متاكد من حذف هذا المنتج',
// //       onOk: () => onDeleteItem(itemId),
// //     });
// //   };

// //   const handleEditSubmit = (values) => {
// //     onEditItem({ ...editingItem, ...values });
// //     setIsEditing(false);
// //   };

// //   useEffect(() => {
// //     if (editingItem) {
// //       form.setFieldsValue(editingItem);
// //     }
// //   }, [editingItem, form]);

// //   return (
// //     <>
// //       <Table
// //         dataSource={company.items}
// //         columns={[
// //           { title: 'اسم المنتج', dataIndex: 'itemName', key: 'itemName' },
// //           { title: 'رقم المنتج', dataIndex: 'itemNumber', key: 'itemNumber' },
// //           { title: 'السعر الصيني RMB', dataIndex: 'priceInRmb', key: 'priceInRmb' },
// //           { title: 'السعر بالدولار', dataIndex: 'priceInDollar', key: 'priceInDollar' },
// //           { title: 'عدد داخل الصندوق', dataIndex: 'countInCarton', key: 'countInCarton' },
// //           { title: 'ملاحظات', dataIndex: 'notes', key: 'notes' },
// //           {
// //             title: 'العمليات',
// //             key: 'actions',
// //             render: (_, record) => (
// //               <>
// //                 <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
// //                 <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.itemId)} />
// //               </>
// //             ),
// //           },
// //         ]}
// //         rowKey="itemId"
// //       />
// //       <Modal
// //         title="تعديل المنتج"
// //         visible={isEditing}
// //         onCancel={() => setIsEditing(false)}
// //         footer={null}
// //       >
// //         <Form form={form} onFinish={handleEditSubmit}>
// //           <Form.Item
// //             label="اسم المنتج"
// //             name="itemName"
// //             rules={[{ required: true, message: 'ادخل اسم البضاعة!' }]}
// //           >
// //             <Input />
// //           </Form.Item>
// //           <Form.Item
// //             label="رقم او رمز المنتج"
// //             name="itemNumber"
// //             rules={[{ required: true, message: 'ادخل رقم او رمز المنتج!' }]}
// //           >
// //             <Input />
// //           </Form.Item>
// //           <Form.Item
// //             label="السعر الصيني RMB"
// //             name="priceInRmb"
// //             rules={[{ required: true, message: 'ادخل السعر RMB!' }]}
// //           >
// //             <Input />
// //           </Form.Item>
// //           <Form.Item
// //             label="عدد المنتج داخل الصندوق"
// //             name="countInCarton"
// //             rules={[{ required: true, message: 'Please input the count in carton!' }]}
// //           >
// //             <Input />
// //           </Form.Item>
// //           <Form.Item
// //             label="ملاحظات عن المنتج"
// //             name="notes"
// //           >
// //             <Input />
// //           </Form.Item>
// //           <Form.Item>
// //             <Button type="primary" htmlType="submit">
// //               حفظ التعديلات
// //             </Button>
// //           </Form.Item>
// //         </Form>
// //       </Modal>
// //     </>
// //   );
// // };

// // export default ListOfItems;
// import React from 'react';
// import { Table, Button, Modal, Input, Form } from 'antd';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// const ListOfItems = ({ company, onEditItem, onDeleteItem }) => {
//   const [isEditing, setIsEditing] = React.useState(false);
//   const [editingItem, setEditingItem] = React.useState(null);

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
//   };

//   return (
//     <>
//       <Table
//         dataSource={company.items}
//         columns={[
//           { title: 'اسم المنتج', dataIndex: 'itemName', key: 'itemName' },
//           { title: 'رقم المنتج', dataIndex: 'itemNumber', key: 'itemNumber' },
//           { title: 'السعر الصيني RMB', dataIndex: 'priceInRmb', key: 'priceInRmb' },
//           { title: 'CBM', dataIndex: 'cbm', key: 'cbm' },
//           { title: 'عدد داخل الصندوق', dataIndex: 'countInCarton', key: 'countInCarton' },
//           { title: 'السعر بالدولار', dataIndex: 'priceInDollar', key: 'priceInDollar' },
//           { title: 'ملاحظات', dataIndex: 'notes', key: 'notes' },
//           {
//             title: 'العمليات',
//             key: 'actions',
//             render: (_, record) => (
//               <>
//                 <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
//                 <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.itemId)} />
//               </>
//             ),
//           },
//         ]}
//         rowKey="itemId"
//       />
//       <Modal
//         title="تعديل المنتج"
//         visible={isEditing}
//         onCancel={() => setIsEditing(false)}
//         footer={null}
//       >
//         <Form initialValues={editingItem} onFinish={handleEditSubmit}>
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
//             rules={[{ required: true, message: 'ادخل CBM!' }]} // Add validation rule for CBM
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
import React, { useEffect } from 'react';
import { Table, Button, Modal, Input, Form } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ListOfItems = ({ company, onEditItem, onDeleteItem }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState(null);
  const [form] = Form.useForm();

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

  return (
    <>
      <Table
        dataSource={company.items}
        columns={[
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
                <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.itemId)} />
              </>
            ),
          },
        ]}
        rowKey="itemId"
      />
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
            rules={[{ required: true, message: 'ادخل السعر RMB!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="CBM"
            name="cbm"
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
              حفظ التعديلات
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListOfItems;
