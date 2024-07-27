import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const AddItem = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="إضافة منتج جديد"
      okText="إضافة"
      cancelText="إلغاء"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="itemName"
          label="اسم المنتج"
          rules={[{ required: true, message: 'ادخل اسم المنتج!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="itemNumber"
          label="رقم المنتج"
          rules={[{ required: true, message: 'ادخل رقم المنتج!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="priceInRmb"
          label="السعر الصيني RMB"
          rules={[{ required: true, message: 'ادخل السعر الصيني RMB!' }]}
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
          name="countInCarton"
          label="عدد داخل الصندوق"
          rules={[{ required: true, message: 'ادخل عدد داخل الصندوق!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="notes"
          label="ملاحظات"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddItem;
