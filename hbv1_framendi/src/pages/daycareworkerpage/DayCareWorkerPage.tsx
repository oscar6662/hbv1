import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DayReportForm } from '../../components/DayReportForm/DayReportForm';
import { NavBar } from '../../components/Navbar/NavBar';
import useOnLoadFetch from '../../hooks/useOnLoadFetch';
import { authSelector } from '../../stores/auth.slice';

type Props = {};

const today = new Date().getUTCDate();

const childrenX = [
  { firstName: 'Einsi', id: 8 },
  { firstName: 'Einsi5000', id: 9 },
];

const DayCareWorkerPage = (props: Props) => {
  const { userName, type, userId, children }: any = useSelector(authSelector);

  return (
    <>
      <NavBar isOnMyPage />

      <div style={{ textAlign: 'center', margin: '50px' }}>
        <h1>Heimasvæði dagforeldris!</h1>
      </div>

      <div className="searchComponent">
        <div className="searchContentContainer">
          {children?.map((child: any) => {
            return (
              <div
                key={`child-${child.id}`}
                style={{
                  height: '300px',
                  width: '200px',
                  padding: '20px',
                  border: 'dotted 1px black',
                  borderRadius: '20px',
                  margin: '10px',
                }}
              >
                <h2>{child.firstName}</h2>
                <DayReportForm child={child} />

                {new Date(child.sicknessDay).getUTCDate() === today && (
                  <h3 style={{ color: 'red' }}>Veikindi</h3>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DayCareWorkerPage;
