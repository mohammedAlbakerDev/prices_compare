import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Typography } from 'antd';

const AddItem = ({ visible, onCreate, onCancel, company }) => {
  const [form] = Form.useForm();
  
  // Extracting the currency information from the company
  const companyCurrency = company.currency === 'USD' ? 'دولار أمريكي' : 'RMB الصيني';

  // Adjusting the input placeholder based on the currency
  const priceLabel = company.currency === 'USD' ? 'السعر بالدولار الأمريكي USD' : 'السعر الصيني RMB';

  useEffect(() => {
    // Reset form fields when the modal is closed
    if (!visible) {
      form.resetFields();
    }
  }, [visible]);

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
      {/* Display the company's currency status */}
      <Typography.Text type="warning">
        الأسعار مدخلة بعملة الشركة: {companyCurrency}
      </Typography.Text>

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
          <Input placeholder="مثال: منتج 1" />
        </Form.Item>
        <Form.Item
          name="itemNumber"
          label="رقم المنتج"
          rules={[{ required: true, message: 'ادخل رقم المنتج!' }]}
        >
          <Input placeholder="مثال: 12345" />
        </Form.Item>
        <Form.Item
          name="priceInRmb"
          label={priceLabel}  // Displaying dynamic price label based on the currency
          rules={[{ required: true, message: `ادخل ${priceLabel}!` }]}
        >
          <Input type="number" placeholder={`ادخل ${companyCurrency}`} />
        </Form.Item>
        <Form.Item
          name="cbm"
          label="CBM"
          rules={[{ required: true, message: 'ادخل CBM!' }]}
        >
          <Input type="number" placeholder="ادخل CBM (متر مكعب)" />
        </Form.Item>
        <Form.Item
          name="countInCarton"
          label="عدد داخل الصندوق"
          rules={[{ required: true, message: 'ادخل عدد داخل الصندوق!' }]}
        >
          <Input type="number" placeholder="ادخل عدد المنتجات داخل الصندوق" />
        </Form.Item>
        <Form.Item
          name="notes"
          label="ملاحظات"
        >
          <Input.TextArea placeholder="أي ملاحظات إضافية (اختياري)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddItem;
