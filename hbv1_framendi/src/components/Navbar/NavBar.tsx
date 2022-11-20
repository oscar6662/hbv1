import { Button } from 'antd';
import React from 'react';
import './navbar.scss';
import { useSelector } from 'react-redux';
import { authSelector } from '../../stores/auth.slice';
import { CreateChildForm } from '../CreateChildForm/CreateChildForm';

type Props = {
  isOnMyPage?: boolean;
};

export const NavBar = ({ isOnMyPage }: Props) => {
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
                <Button
                  className="navMenuItem"
                  type="primary"
                  size="large"
                  href="http://localhost:8080/logout"
                >
                  Útskráning
                </Button>
                {type === 'parent' && (
                  <>
                    <CreateChildForm />
                    <Button
                      className="navMenuItem"
                      type="primary"
                      size="large"
                      href={`/parent/${userId}`}
                      disabled={isOnMyPage}
                    >
                      Fara á mína síðu
                    </Button>
                  </>
                )}
                {type === 'dcw' && (
                  <Button
                    type="primary"
                    size="large"
                    className="navMenuItem"
                    href={`/daycareworker/${userId}`}
                  >
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
