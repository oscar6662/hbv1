import { Button } from 'antd';
import React from 'react';
import './navbar.scss';
import { useSelector } from 'react-redux';
import { authSelector } from '../../stores/auth.slice';
import { CreateChildForm } from '../CreateChildForm/CreateChildForm';

type Props = {};

export const NavBar = (props: Props) => {
  const { isLoggedIn, userName, type, userId } = useSelector(authSelector);
  return (
    <>
      <div className="navbar">
        <div className="navLogoContainer">
          <h1 className="logo">
            <a style={{ color: 'black' }} href="/">
              PETRA
            </a>
          </h1>
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <h3 style={{ margin: '10px 0' }}>
                  Halló{' '}
                  <span style={{ textDecoration: 'underline' }}>
                    {userName}
                  </span>
                  !
                </h3>
                {type === 'parent' && <CreateChildForm />}
                {type === 'dcw' && (
                  <Button href={`/daycareworker/${userId}`}>
                    Fara á mína síðu
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
