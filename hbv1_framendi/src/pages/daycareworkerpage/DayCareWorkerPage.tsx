import { Button, Card, List, message } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Alert } from '../../components/Alert/Alert';
import { DayReportForm } from '../../components/DayReportForm/DayReportForm';
import { NavBar } from '../../components/Navbar/NavBar';
import useOnLoadFetch from '../../hooks/useOnLoadFetch';
import { authSelector } from '../../stores/auth.slice';

import { UserDeleteOutlined } from '@ant-design/icons';

type Props = {};

const today = new Date().getUTCDay();

const childrenX = [
  { firstName: 'Einsi', id: 8 },
  { firstName: 'Einsi5000', id: 9 },
];

const createTimeString = (dateStr: string) => {
  let date = new Date(dateStr);

  let hour: string | number = date.getHours();
  if (hour < 10) hour = `0${hour}`;

  let minutes: string | number = date.getMinutes();
  if (minutes === 0) {
    minutes = `00`;
  }

  if (minutes > 0 && minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hour}:${minutes}`;
};

const isSickToday = (dateStr: string) => {
  const date = new Date(dateStr).toDateString();
  const today = new Date().toDateString();
  if (date === today) return true;
  return false;
};

const DayCareWorkerPage = (props: Props) => {
  const { userName, type, userId, children }: any = useSelector(authSelector);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRemoveChild = async (childId: number) => {
    setLoading(true);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(childId),
    };

    const result = await fetch(`/api/daycareworker/removechild`, options);

    if (!result.ok) {
      message.error('Eitthvað fór úrskeiðis!');
    } else {
      const json = await result.json();
      console.log(json);
      message.success('Barn afskráð úr gæslu, jibbí!');
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#d1d1d1',
      }}
    >
      <NavBar isOnMyPage />
      <div
        style={{
          backgroundColor: '#d1d1d1',
          height: 'calc(100vh - 100px)',
          width: '90%',
        }}
      >
        <h1 style={{ margin: '30px 0' }}>Heimasvæði dagforeldris!</h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '15px',
          }}
        >
          {children?.map((child: any, i: number) => {
            return (
              <Card
                loading={loading}
                key={`child-${i}`}
                style={{
                  width: '100%',
                  border: isSickToday(child.sicknessDay)
                    ? 'solid red 1px'
                    : 'solid black 1px',
                }}
                title={`${child.firstName} ${child.lastName}`}
                extra={
                  isSickToday(child.sicknessDay) ? (
                    <p style={{ color: 'red' }}>Veikindi</p>
                  ) : (
                    <></>
                  )
                }
              >
                <h3>Skýrslur</h3>
                {child.dayReports.length > 0 ? (
                  <List
                    itemLayout="horizontal"
                    dataSource={child.dayReports}
                    renderItem={(item: any) => (
                      <List.Item>
                        <List.Item.Meta
                          style={{ marginLeft: '10px' }}
                          title={`Skýrsla: ${item.date}`}
                          description={
                            <div style={{ marginLeft: '5px' }}>
                              <p>
                                Svaf frá:{' '}
                                <span style={{ fontWeight: 700 }}>
                                  {createTimeString(item.sleepFrom)}
                                </span>{' '}
                                til:{' '}
                                <span style={{ fontWeight: 700 }}>
                                  {createTimeString(item.sleepTo)}
                                </span>
                              </p>

                              <p>
                                Matarlyst:{' '}
                                <span style={{ fontWeight: 700 }}>
                                  {item.appetite}
                                </span>
                              </p>

                              <p>
                                Athugasemd:{' '}
                                <span style={{ fontWeight: 500 }}>
                                  {item.comment}
                                </span>
                              </p>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                ) : (
                  <p style={{ marginLeft: '10px', padding: '12px 0' }}>
                    Engar skráðar skýrslur
                  </p>
                )}

                <h3>Aðgerðir</h3>
                <div
                  style={{
                    padding: '12px 0',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: '10px',
                  }}
                >
                  <DayReportForm child={child} />
                  <Alert child={child} />
                  <Button
                    danger
                    icon={<UserDeleteOutlined />}
                    onClick={() => {
                      handleRemoveChild(child.id);
                      window.location.reload();
                    }}
                  ></Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DayCareWorkerPage;
