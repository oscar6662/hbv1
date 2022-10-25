import React, { useEffect, useState } from 'react';
import { NavBar } from '../../components/Navbar/NavBar';
import { useParams } from 'react-router-dom';

import useOnLoadFetch from '../../hooks/useOnLoadFetch';
import { Form } from 'antd';

type Props = {};

const Apply = (props: Props) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const url = `/api/daycareworkers/${id}`;
  const { data, loading, error }: any = useOnLoadFetch(url);

  const handleOnFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className="home">
      <NavBar />

      <div className="hero">
        <div className="heroContent">
          <>
            {loading && <h2>Loading...</h2>}
            {error && <h2>Obbosí error</h2>}
            {data && <h2>Umsókn hjá {`${data.firstName} ${data.lastName}`}</h2>}
          </>
        </div>
      </div>

      <div className="searchComponent">
        <div className="searchContentContainer">
          <Form
            method="POST"
            onFinish={handleOnFinish}
            form={form}
            layout="horizontal"
          >
            <Form.Item name="child" label="Barn:">
              {/* <Select
                loading={loading}
                showSearch
                optionFilterProp="children"
                size="large"
                style={{ maxWidth: '200px' }}
                placeholder="Everywhere"
              >
                {locations.map((district, i) => {
                  return (
                    <Select.Option
                      key={`option-town-${i}`}
                      value={district.locationCode}
                    >
                      {`${district.locationCode} - ${district.locationName}`}
                    </Select.Option>
                  );
                })}
              </Select> */}
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Apply;
