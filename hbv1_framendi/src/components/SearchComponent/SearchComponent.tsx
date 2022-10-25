import { useState, useEffect } from 'react';
import './searchcomponent.scss';
import { authSelector } from '../../stores/auth.slice';
import { useSelector } from 'react-redux';

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
  message,
  Modal,
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
  const [modal, setModal] = useState<boolean>(false);
  const [selectedChildren, setSelectedChildren] = useState<any | undefined>([]);

  const { isLoggedIn, children, userId, type } = useSelector(authSelector);

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

  const handleOnFinish = async (values: { location: string }) => {
    const { location } = values;
    setLocation(location);
  };

  const applyForDCW = async (url: any, daycareWorkerId: Number) => {
    const body = {
      daycareWorkerId: daycareWorkerId,
      parentId: userId,
      applicationDateTime: Date.now(),
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const result = await fetch(url, options);
    console.log('RES -> ', result);

    if (!result.ok) {
      message.error('Eitthvað fór úrskeiðis í umsókninni!');
    } else {
      const json = await result.json();
      console.log(json);
      message.success('Umsókn móttekin, jibbí!');
      setLoading(true);
    }
  };

  const apply = async (daycareWorkerId: Number) => {
    console.log(children);
    setLoading(true);
    if (!isLoggedIn) {
      message.error('Notandi ekki skráður inn');
      setLoading(false);
      return;
    }

    if (!children || children?.length < 1) {
      message.error('Vinsamlegast skráðu barn til að sækja um');
      setLoading(false);
      return;
    }

    Modal.confirm({
      title: 'Veldu barn/börn',
      content: (
        <>
          <Select
            style={{ width: '200px' }}
            optionFilterProp="children"
            mode="multiple"
            size="large"
            onSelect={(e: any) => {
              let temp = selectedChildren;
              selectedChildren.push(e);
              setSelectedChildren(temp);
            }}
            onDeselect={(e: any) => {
              let temp = selectedChildren;
              let index = temp.indexOf(e);
              temp.splice(index, 1);
              setSelectedChildren(temp);
            }}
          >
            {children?.map<any>((child): any => {
              return (
                <Select.Option
                  value={child['id']}
                >{`${child['firstName']} ${child['lastName']}`}</Select.Option>
              );
            })}
          </Select>
        </>
      ),
      async onOk() {
        if (selectedChildren) {
          const body = {
            daycareWorkerId: daycareWorkerId,
            parentId: userId,
            childrenId: selectedChildren,
          };

          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          };

          const result = await fetch(`/api/daycareworker/apply`, options);

          if (!result.ok) {
            message.error('Eitthvað fór úrskeiðis í umsókninni!');
          } else {
            const json = await result.json();
            console.log(json);
            message.success('Umsókn móttekin, jibbí!');
            setLoading(false);
            setSelectedChildren([]);
          }
        }
      },
      onCancel() {
        setLoading(false);
        console.info('Hætt við');
      },
    });

    // let hasMoreThanOne = false;
    // if (children && children.length > 1) {
    //   hasMoreThanOne = true;
    //   Modal.confirm({
    //     title: 'Veldu barn/börn',
    //     content: (
    //       <>
    //         <Select
    //           style={{ width: '200px' }}
    //           optionFilterProp="children"
    //           mode="multiple"
    //           size="large"
    //           onSelect={(e: any) => {
    //             let temp = selectedChildren;
    //             selectedChildren.push(e);
    //             setSelectedChildren(temp);
    //           }}
    //           onDeselect={(e: any) => {
    //             let temp = selectedChildren;
    //             let index = temp.indexOf(e);
    //             temp.splice(index, 1);
    //             setSelectedChildren(temp);
    //           }}
    //         >
    //           {children?.map<any>((child): any => {
    //             return (
    //               <Select.Option
    //                 value={child['id']}
    //               >{`${child['firstName']} ${child['lastName']}`}</Select.Option>
    //             );
    //           })}
    //         </Select>
    //       </>
    //     ),
    //     onOk() {
    //       applyForDCW(`/api`)
    //       console.log(selectedChildren);
    //     },
    //     onCancel() {
    //       setLoading(false);
    //       console.info('Hætt við');
    //     },
    //   });
    //   return;
    // }

    // await applyForDCW(url, daycareWorkerId);
  };

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
                    {type === 'dcw' ? (
                      <></>
                    ) : (
                      <div style={{ padding: '20px' }}>
                        <Button disabled type="dashed">
                          Sækja um
                        </Button>
                      </div>
                    )}
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
                      <Button type="dashed" onClick={() => apply(item.id)}>
                        Sækja um
                      </Button>
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
