import { Button, Form, Input, message, Modal, Radio, TimePicker } from 'antd';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type Props = {
  child: any;
};

const timeFormat = 'HH:mm';

export const NotifySickLeave = ({ child }: Props) => {
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

  const handleNotify = (e: any) => {
    Modal.confirm({
      title: 'Ertu viss?',
      async onOk() {
        console.log('hello: ', e);
        // let result;

        // const options = {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(),
        // };

        // try {
        //   result = await fetch(`/api/notifysickleave`, options);

        //   const response = await result.json();

        //   if (!result.ok) {
        //     message.error(
        //       'Eitthvað gekk ekki upp, hafðu samband við dagforeldri'
        //     );
        //     setLoading(false);
        //   } else {
        //     message.success('Tókst, batakveðjur!');
        //     setTimeout(() => {
        //       window.location.reload();
        //     }, 1000);
        //   }
        // } catch (err) {
        //   message.error('Óþekkt villa');
        //   setLoading(false);
        // }
      },
      onCancel() {
        setLoading(false);
        console.info('Hætt við');
      },
    });
  };

  return (
    <>
      <Button
        className="navMenuItem"
        type="primary"
        size="large"
        onClick={handleNotify}
      >
        Tilkynna veikindi
      </Button>
    </>
  );
};
