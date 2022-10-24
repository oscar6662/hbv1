import { Button } from 'antd';
import React from 'react';
import './navbar.scss';
import { useSelector } from 'react-redux';
import { authSelector } from '../../stores/auth.slice';
import { CreateChildForm } from '../CreateChildForm/CreateChildForm';

type Props = {};

export const NavBar = (props: Props) => {
  const { isLoggedIn, userName, sub } = useSelector(authSelector);
  return (
    <>
      <div className="navbar">
        <div className="navLogoContainer">
          <h1 className="logo">PETRA</h1>
        </div>

        <div className="navMenu">
          {!isLoggedIn ? (
            <>
              <Button
                href="/register"
                className="navMenuItem"
                type="primary"
                size="large"
              >
                Nýskráning
              </Button>
              <Button
                href="/oauth2/authorization/auth0"
                className="navMenuItem"
                type="primary"
                size="large"
              >
                Innskráning
              </Button>
            </>
          ) : (
            <>
              <p>Halló {userName}!</p>
              <CreateChildForm sub={sub?.split('|')[1]} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
