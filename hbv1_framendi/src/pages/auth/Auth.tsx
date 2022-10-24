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

    let res_type = 'token';
    let client_id = 'ox325QZVYQitbySZYq0CZOW5vJLs9r4Q';
    let redirect_uri = '/';

    const data = {
      response_type: res_type,
      client_id: client_id,
      redirect_uri: redirect_uri,
    };

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const result = await fetch(
      'https://dev-xzuj3qsd.eu.auth0.com/authorize?response_type=token&client_id=ox325QZVYQitbySZYq0CZOW5vJLs9r4Q&redirect_uri=http://localhost:5173/'
    );

    console.log('RESULT: ', result);
    const test = await result.json();

    console.log('JSON : ', test);

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
