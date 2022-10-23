import { useState, useEffect } from 'react';
import './searchcomponent.scss';

import {
  Form,
  Input,
  Button,
  Radio,
  Switch,
  DatePicker,
  InputNumber,
  Select,
  Upload,
  Result,
  Tooltip,
  Typography,
  List,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';

type Props = {};

const pseudo = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

interface DaycareWorker {
  address: string;
  children: [];
  experienceInYear: Number;
  firstName: string;
  fullName: string;
  id: Number;
  lastName: string;
  location: string;
  locationCode: Number;
  mobile: string;
  ssn: string;
}

interface Location {
  locationCode: string;
  locationName: string;
}

const link = 'http://localhost:8080';

export const SearchComponent = (props: Props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<DaycareWorker[] | []>([]);
  const [locations, setLocations] = useState<Location[] | []>([]);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDaycareWorkers();
  }, [location]);

  useEffect(() => {
    const fetchLoactions = async () => {
      setLoading(true);
      const result = await fetch(`${link}/api/locations`);

      if (!result.ok) {
        console.error('Villa!');
      } else {
        const json = await result.json();
        setLocations(json);
      }
      setLoading(false);
    };

    fetchLoactions();
    setLoading(true);
  }, []);

  const fetchDaycareWorkers = async () => {
    setLoading(true);
    const daycareWorkers = await fetch(
      `${link}/api/daycareworkers${location ? `?locationCode=${location}` : ''}`
    );

    if (!daycareWorkers.ok) {
      console.error('Villa!');
    } else {
      const json = await daycareWorkers.json();
      setData(json);
    }
    setLoading(false);
  };

  const handleOnFinish = async (values: string) => {
    console.log('value :>> ', values);
  };

  return (
    <div className="searchComponent">
      <div className="searchContentContainer">
        <div className="searchBox">
          <Form
            method="POST"
            onFinish={handleOnFinish}
            form={form}
            layout="vertical"
          >
            <Form.Item className="" name="location">
              <div className="searhBoxContent">
                <p style={{ width: '50%', lineHeight: '40px' }}>
                  Leita eftir staðsetningu:{' '}
                </p>
                <Select
                  loading={loading}
                  showSearch
                  optionFilterProp="children"
                  size="large"
                  style={{ width: '50%' }}
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
                </Select>
              </div>
            </Form.Item>

            <Form.Item className="btnContainer">
              <Button
                disabled={loading}
                loading={loading}
                className="submitBtn"
                type="primary"
                htmlType="submit"
              >
                Leita
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="resultBox">
          <div className="daycareWorkers">
            {loading ? (
              <List
                itemLayout="horizontal"
                dataSource={pseudo}
                // loading={loading}
                renderItem={(item) => (
                  <List.Item className="dcwListItem">
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={
                        <div
                          style={{
                            height: '8px',
                            border: 'solid #e3e3e3 10px',
                            borderRadius: '20px',
                          }}
                        ></div>
                      }
                      style={{ paddingLeft: '14px' }}
                    />
                    <div style={{ padding: '20px' }}>
                      <Button disabled type="dashed">
                        Sækja um
                      </Button>
                    </div>
                  </List.Item>
                )}
              />
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={data}
                // loading={loading}
                renderItem={(item) => (
                  <List.Item className="dcwListItem">
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={
                        <a href="https://ant.design">{`${item.firstName} ${item.lastName}`}</a>
                      }
                      style={{ paddingLeft: '14px' }}
                      description="Ég elska að vera dagmamma!"
                    />
                    <div style={{ padding: '20px' }}>
                      <Button type="dashed">Sækja um</Button>
                    </div>
                  </List.Item>
                )}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
