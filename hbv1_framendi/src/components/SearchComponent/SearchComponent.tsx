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

    if (daycareWorkers.ok && daycareWorkers.status !== 204) {
      const json = await daycareWorkers.json();
      setData(json);
    } else {
      setData([]);
    }
    setLoading(false);
  };

  const handleOnFinish = async (values:{location: string;}) => {
    const {location} = values;
    setLocation(location);
  };

  const apply = async(daycareWorkerId: Number) =>{
    const response = await fetch(`/api/apply/${daycareWorkerId}`);
    if (await response.json()==="goodshit") {
      console.log('success');
      
    }else console.log('ekki gott');
    
  }

  return (
    <div className="searchComponent">
      <div className="searchContentContainer">
        <div className="searchBox">
          <Form
            method="POST"
            onFinish={handleOnFinish}
            form={form}
            layout="horizontal"
          >
            <Form.Item name="location" label="Leita eftir staðsetningu: ">
                <Select
                  loading={loading}
                  showSearch
                  optionFilterProp="children"
                  size="large"
                  style={{  maxWidth: '200px' }}
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
                </Select>
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
                      <Button type="dashed" onClick={()=>apply(item.id)}>Sækja um</Button>
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
