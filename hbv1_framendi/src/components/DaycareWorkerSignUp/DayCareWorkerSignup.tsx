import React, { useState, useEffect } from 'react';

import { Form, Input, Button, message, InputNumber, Select } from 'antd';

const link = 'http://localhost:8080';

interface Location {
  locationCode: string;
  locationName: string;
}

type Props = {
  locations: Location[];
  loading: boolean;
};

const auth0link = 'https://dev-xzuj3qsd.eu.auth0.com';

export const DayCareWorkerSignup = ({ locations, loading }: Props) => {
  const [formLoading, setFormLoading] = useState(false);

  const onFinish = async (values: any) => {
    setFormLoading(true);
    const { location, confirmPassword, ...rest } = values;
    const code = location.split('-')[0];
    const town = location.split('-')[1];
    const data = {
      location: town,
      locationCode: code,
      ...rest,
    };

    const userFetch = await fetch(`${link}/api/daycareworkerexists/${data.ssn}`);
    const userExists = await userFetch.json();

    if (userExists) {
      message.error('User already exists');
      return;
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const register = await fetch(`${link}/api/adddaycareworker`, options);

    if (!register.ok) {
      message.error('Failed');
    } else {
      const registeredDCW = await register.json();
      window.location.replace('/');
    }

    setFormLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo);
  };

  return (
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
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Kennitala"
        className="loginItem"
        name="ssn"
        rules={[
          {
            required: true,
            message: 'Please input your kennitala!',
            min: 10,
            max: 10,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Fornafn"
        className="loginItem"
        name="firstName"
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Eftirnafn"
        className="loginItem"
        name="lastName"
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Símanúmer"
        className="loginItem"
        name="mobile"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
            max: 7,
            min: 7,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Reynsla í árum"
        className="loginItem"
        name="experienceInYears"
        rules={[{ required: true, message: 'Please input your reynsla!' }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Heimilisfang"
        className="loginItem"
        name="address"
        rules={[{ required: true, message: 'Please input your address!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Staðsetning"
        className="loginItem"
        name="location"
        rules={[{ required: true, message: 'Please input your location!' }]}
      >
        <Select
          loading={loading}
          showSearch
          optionFilterProp="children"
          size="large"
          style={{ width: '50%' }}
        >
          {locations.map((district: Location, i) => {
            return (
              <Select.Option
                key={`option-town-${i}`}
                value={`${district.locationCode}-${district.locationName}`}
              >
                {`${district.locationCode} - ${district.locationName}`}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Lykilorð"
        className="loginItem"
        name="password"
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Staðfesting lykilorðs"
        className="loginItem"
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item className="loginItem">
        <Button
          size="large"
          className="loginBtn"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Skrá
        </Button>
      </Form.Item>
    </Form>
  );
};
