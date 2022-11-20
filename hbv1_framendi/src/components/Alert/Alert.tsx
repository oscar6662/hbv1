import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio,
  TimePicker,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type Props = {
  child: any;
};

export const Alert = ({ child }: Props) => {
  const [form] = Form.useForm();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handleConfirm = async (values: any) => {
    setLoading(true);

    const body = {
      description: values.description,
      severity: values.severity,
      childId: child.id,
      dcwId: id,
      timestamp: new Date(),
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const result = await fetch(`/api/createAlert`, options);

    if (!result.ok) {
      message.error('Eitthvað fór úrskeiðis í meðöndlun gagna!');
    } else {
      const json = await result.json();
      console.log(json);
      message.success('Viðvörun skráð, jibbí!');
    }

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
        style={{ margin: 0 }}
        className="navMenuItem"
        type="primary"
        onClick={showModal}
      >
        Viðvörun
      </Button>
      <Modal
        title={`Viðvörun í sambandi við ${child.firstName}`}
        open={modal}
        okText="Submit"
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
          <Form.Item label="Alvarleiki" name="severity">
            <Radio.Group>
              <Radio.Button value="GREEN">Græn viðvörun</Radio.Button>
              <Radio.Button value="ORANGE">Appelsínugul viðvörun</Radio.Button>
              <Radio.Button value="RED">Rauð viðvörun</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Athugasemd" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
