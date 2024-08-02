// // src/components/NewCompanyForm.js
// import React, { useState, useContext } from 'react';
// import { LocalStorageContext } from '../context/localStorageContext';
// import { Button, Input } from 'antd';

// const NewCompanyForm = () => {
//   const { addCompany } = useContext(LocalStorageContext);
//   const [companyName, setCompanyName] = useState('');
//   const [companyId, setCompanyId] = useState('');
//   const [items, setItems] = useState([]);

//   const handleSubmit = () => {
//     const newCompany = { companyName, companyId, items };
//     addCompany(newCompany);
//     setCompanyName('');
//     setCompanyId('');
//   };

//   return (
//     <div>
//       <Input
//         placeholder="Company Name"
//         value={companyName}
//         onChange={(e) => setCompanyName(e.target.value)}
//       />
//       <Input
//         placeholder="Company ID"
//         value={companyId}
//         onChange={(e) => setCompanyId(e.target.value)}
//       />
//       <Button onClick={handleSubmit}>Add Company</Button>
//     </div>
//   );
// };

// export default NewCompanyForm;
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
