import { Button } from 'antd';
import React from 'react';
import './navbar.scss';

type Props = {};

export const NavBar = (props: Props) => {
  return (
    <>
      <div className="navbar">
        <div className="navLogoContainer">
          <h1 className="logo">PETRA</h1>
        </div>

        <div className="navMenu">
          <Button className="navMenuItem" type="primary" size="large">
            Nýskráning
          </Button>
          <Button className="navMenuItem" type="primary" size="large">
            Innskráning
          </Button>
        </div>
      </div>
    </>
  );
};
