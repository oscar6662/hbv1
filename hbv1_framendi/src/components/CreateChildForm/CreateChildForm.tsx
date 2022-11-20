import React, { useState } from 'react';
import { Button, Modal, message, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import { authSelector, fetchUser } from '../../stores/auth.slice';
import { useAppDispatch } from '../../stores/mainStore';

export const CreateChildForm = () => {
  const { userId } = useSelector(authSelector);

  const [form] = Form.useForm();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (values: any) => {
    // const dispatch = useAppDispatch();

    setLoading(true);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
        parentId: userId,
      }),
    };

    const childResult = await fetch(`/api/createchild`, options);

    console.log('refister -> ', childResult);

    if (!childResult.ok) {
      message.error('Failed');
    } else {
      console.log('wtf');
      const childCreated = await childResult.json();
      console.log('YAY: ', childCreated);
    }
    message.success('Nýtt barn búið til, gleðilegt barn!');
    // dispatch(fetchUser());
    setModal(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo);
  };

  const showModal = () => {
    setModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setModal(false);
  };

  return (
    <>
      <Button
        className="navMenuItem"
        type="primary"
        size="large"
        onClick={showModal}
      >
        Búa til barn
      </Button>
      <Modal
        title="Búa til barn"
        open={modal}
        okText="OK"
        cancelText="Hætta við"
        okButtonProps={{ htmlType: 'submit' }}
        onOk={form.submit}
        onCancel={handleCancel}
        width={500}
      >
        <Form
          layout="vertical"
          className="loginForm"
          name="login"
          initialValues={{ remember: true }}
          form={form}
          onFinish={handleConfirm}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Kennitala barns"
            name="ssn"
            rules={[
              {
                required: true,
                message: 'Please input the childs kennitala!',
                min: 10,
                max: 10,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Fornafn"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Please input the childs first name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Eftirnafn"
            name="lastName"
            rules={[
              { required: true, message: 'Please input the childs last name!' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
