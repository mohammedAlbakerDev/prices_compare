import React from 'react';
import { Form, Input, Button } from 'antd';

const NewCompanyForm = ({ handleAddCompany }) => {
  return (
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
        rules={[{ required: true, message: 'ادخل رقم الشركة!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          اضف الشركة
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewCompanyForm;
