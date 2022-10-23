import React, { useState } from 'react';
import './auth.scss';

import { Form, Input, Button, message } from 'antd';
// import { login } from '../auth.js';
// import { useHistory } from 'react-router-dom';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  // const history = useHistory();

  const onFinish = async (values: any) => {
    setLoading(true);
    console.log(values);

    setLoading(false);
    // if (!result.ok) {
    //   message.error(result.error);
    // } else {
    //   history.push('/admin');
    // }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo);
  };

  const showModal = () => {
    setModal(true);
  };

  const handleCancel = () => {
    setModal(false);
  };

  return (
    <>
      <div className="loginSection">
        <div className="loginContainer">
          <Form
            layout="vertical"
            className="loginForm"
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Netfang"
              className="loginItem"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Lykilorð"
              className="loginItem"
              name="password"
              style={{ marginBottom: 0 }}
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Button
              className="loginItem"
              onClick={showModal}
              style={{ marginTop: 0, paddingTop: 0 }}
              type="link"
            >
              Gleymt lykilorð
            </Button>

            <Form.Item className="loginItem">
              <Button
                size="large"
                className="loginBtn"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Skrá inn
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Auth;
