import React, { useContext, useEffect } from 'react';
import { Table, Button, Modal, Form,Input } from 'antd';
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
    const updatedItem = {
      ...editingItem,
      ...values,
      priceInDollar: company.currency === 'RMB' 
        ? (values.priceInRmb / 7.22).toFixed(2)
        : values.priceInDollar,
      priceInRmb: company.currency === 'USD'
        ? (values.priceInDollar * 7.22).toFixed(2)
        : values.priceInRmb,
    };
    onEditItem(updatedItem);
    setIsEditing(false);
    form.resetFields();
  };

  useEffect(() => {
    if (isEditing && editingItem) {
      form.setFieldsValue({
        ...editingItem,
        priceInDollar: company.currency === 'RMB' ? (editingItem.priceInRmb / 7.22).toFixed(2) : editingItem.priceInDollar,
        priceInRmb: company.currency === 'USD' ? (editingItem.priceInDollar * 7.22).toFixed(2) : editingItem.priceInRmb,
      });
    } else {
      form.resetFields();
    }
  }, [isEditing, editingItem, form, company.currency]);
  const commonColumns = [
    { title: 'اسم المنتج', dataIndex: 'itemName', key: 'itemName' },
    { title: 'رقم المنتج', dataIndex: 'itemNumber', key: 'itemNumber' },
    { title: 'CBM', dataIndex: 'cbm', key: 'cbm' },
    { title: 'عدد داخل الصندوق', dataIndex: 'countInCarton', key: 'countInCarton' },
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
  
  const priceColumns = (handlesUsd, handlesRmb) => {
    const columns = [];
    if (handlesUsd) {
      columns.push(
        { title: 'السعر بالدولار', dataIndex: 'priceInDollar', key: 'priceInDollar' },
      );
      columns.push({
        title: 'السعر بعد التكاليف',
        render: (_, record) => {
          const priceAfterCosts = ((record.priceInDollar * record.countInCarton) + (record.cbm * 160)) / record.countInCarton;
          return priceAfterCosts.toFixed(2);
        },
      });
    }
    if (handlesRmb) {
      columns.push(
        { title: 'السعر الصيني RMB', dataIndex: 'priceInRmb', key: 'priceInRmb'},
      );
      columns.push({
        title: 'السعر بعد التكاليف (دولار)',
        render: (_, record) => {
          const priceAfterCosts = ((record.priceInRmb / 7.22) * record.countInCarton + (record.cbm * 160)) / record.countInCarton;
          return priceAfterCosts.toFixed(2);
        },
      });
    }
    return columns;
  };
  
  const getColumns = (handlesUsd, handlesRmb) => {
    const columns = [...commonColumns];
    const priceCols = priceColumns(handlesUsd, handlesRmb);
  
    // Insert price columns after itemNumber
    columns.splice(2, 0, ...priceCols);
  
    // Ensure the 'السعر بعد التكاليف' or 'السعر بعد التكاليف (USD)' column comes after CBM and countInCarton
    const costIndex = columns.findIndex(col => col.title.includes('السعر بعد التكاليف'));
    if (costIndex > -1) {
      const costColumn = columns.splice(costIndex, 1);
      columns.splice(5, 0, ...costColumn); // Insert after CBM and countInCarton
    }
  
    return columns;
  };
  
  // Determine the columns based on the company's currency
  const columns = getColumns(company.currency === 'USD', company.currency === 'RMB');

  const renderMobileView = (item) => {
    const calculatedPriceAfterCosts = company.currency === 'USD' 
      ? ((item.priceInDollar * item.countInCarton) + (item.cbm * 160)) / item.countInCarton 
      : ((item.priceInRmb / 7.22) * item.countInCarton + (item.cbm * 160)) / item.countInCarton;
  
    return (
      <div className="mobile-card" key={item.itemId}>
        <h3 className="mobile-card-title">{item.itemName}</h3>
        <div className="mobile-card-content">
          <p><span className="label"> رقم او رمز المنتج: </span>{item.itemNumber}</p>
          {company.currency === 'RMB' ? (
            <>
              <p><span style={{color:'red'}}>&yen; </span>{item.priceInRmb}<span className="label"> : السعر الصيني RMB </span></p>
              <p><span style={{color:'green'}}>$</span><span className="label"> السعر بعد التكاليف: </span>{calculatedPriceAfterCosts.toFixed(2)}</p>
            </>
          ) : (
            <>
              <p><span style={{color:'green'}}>$</span>{item.priceInDollar}<span className="label"> : السعر بالدولار </span></p>
              <p><span className="label">السعر بعد التكاليف: </span>{calculatedPriceAfterCosts.toFixed(2)}</p>
            </>
          )}
          <p><span className="label">CBM: </span>{item.cbm}</p>
          <p><span className="label">عدد داخل الصندوق: </span>{item.countInCarton}</p>
          <p><span className="label">ملاحظات: </span>{item.notes}</p>
        </div>
        <div className="mobile-card-actions">
          <button className="edit-button" onClick={() => handleEdit(item)}><EditOutlined className="action-icon" /></button>
          <button className="delete-button" onClick={() => handleDelete(item.itemId)}><DeleteOutlined className="action-icon" /></button>
          <button className="favorite-button" onClick={() => handleFavoriteToggle(item)}>{isFavorite(item.itemId) ? <StarFilled /> : <StarOutlined />}</button>
        </div>
      </div>
    );
  };
  
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
          {company.currency === 'RMB' ? (
            <>
              <Form.Item
                label="السعر الصيني RMB"
                name="priceInRmb"
                rules={[{ required: true, message: 'ادخل السعر الصيني!' }]}
              >
                <Input type="number" />
              </Form.Item>
             
            </>
          ) : (
            <>
              <Form.Item
                label="السعر بالدولار"
                name="priceInDollar"
                rules={[{ required: true, message: 'ادخل السعر بالدولار!' }]}
              >
                <Input type="number" />
              </Form.Item>
             
            </>
          )}
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
