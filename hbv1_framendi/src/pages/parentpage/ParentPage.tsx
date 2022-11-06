import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavBar } from '../../components/Navbar/NavBar';
import { authSelector } from '../../stores/auth.slice';

type Props = {};

const ParentPage = (props: Props) => {
  const { userName, type, userId, children }: any = useSelector(authSelector);
  return (
    <>
      <NavBar isOnMyPage />

      <div style={{ textAlign: 'center', margin: '50px' }}>
        <h1>Heimasvæði foreldris!</h1>
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

                <Button type="dashed">Tilkynna veikindi</Button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ParentPage;
