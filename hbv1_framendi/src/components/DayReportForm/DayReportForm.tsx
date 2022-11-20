import { Button, Form, Input, message, Modal, Radio, TimePicker } from 'antd';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type Props = {
  child: any;
};

const timeFormat = 'HH:mm';

export const DayReportForm = ({ child }: Props) => {
  const [form] = Form.useForm();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handleConfirm = async (values: any) => {
    setLoading(true);

    const sleepFrom = values.sleepFrom._d;
    const sleepTo = values.sleepTo._d;

    const body = {
      sleepFrom: sleepFrom,
      sleepTo: sleepTo,
      comment: values.comment,
      appetite: values.appetite,
      childId: child.id,
      dcwId: id,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const result = await fetch(`/api/createdayreport`, options);

    if (!result.ok) {
      message.error('Eitthvað fór úrskeiðis í meðöndlun gagna!');
    } else {
      const json = await result.json();
      console.log(json);
      message.success('Dayreport skráð, jibbí!');
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
        Skrifa skýrslu
      </Button>
      <Modal
        title={`Búa til DayReport um ${child.firstName}`}
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
          <h3>Svefn:</h3>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Form.Item
              style={{ margin: '0 10px' }}
              label="Frá:"
              name="sleepFrom"
            >
              <TimePicker format={timeFormat} />
            </Form.Item>

            <Form.Item label="Til:" name="sleepTo">
              <TimePicker format={timeFormat} />
            </Form.Item>
          </div>

          <Form.Item label="Matarupplýsingar" name="appetite">
            <Radio.Group>
              <Radio.Button value="BAD">Ekki vel</Radio.Button>
              <Radio.Button value="OKAY">Ágætlega</Radio.Button>
              <Radio.Button value="GOOD">Vel</Radio.Button>
              <Radio.Button value="VERY_GOOD">Mjög vel</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Athugasemd" name="comment">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
