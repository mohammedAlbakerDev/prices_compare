// import React from 'react';
// import { Form, Input, Button } from 'antd';

// const NewCompanyForm = ({ handleAddCompany }) => {
//   return (
//     <Form onFinish={handleAddCompany}>
//       <Form.Item
//         label="اسم الشركة"
//         name="companyName"
//         rules={[{ required: true, message: 'ادخل اسم الشركة!' }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         label="رقم الشركة"
//         name="companyId"
//         rules={[{ required: true, message: 'ادخل رقم الشركة!' }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           اضف الشركة
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default NewCompanyForm;
import React from 'react';
import { Form, Input, Button, Radio } from 'antd';

const NewCompanyForm = ({ handleAddCompany }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleAddCompany(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        label="اسم الشركة"
        name="companyName"
        rules={[{ required: true, message: 'ادخل اسم الشركة' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="رقم الشركة"
        name="companyId"
        rules={[{ required: true, message: 'ادخل رقم الشركة' }]}
      >
        <Input />
      </Form.Item>
      {/* Add Currency Selection */}
      <Form.Item
        label="العملة"
        name="currency"
        rules={[{ required: true, message: 'اختر نوع العملة' }]}
      >
        <Radio.Group>
          <Radio value="RMB">RMB</Radio>
          <Radio value="USD">USD</Radio>
        </Radio.Group>
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
