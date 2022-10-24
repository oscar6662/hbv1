import { Button } from "antd";
import React from "react";
import "./navbar.scss";
import { useSelector } from "react-redux";
import { authSelector } from "../../stores/auth.slice";

type Props = {};

export const NavBar = (props: Props) => {
  const { isLoggedIn, userName } = useSelector(authSelector);  
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
            href="/api/login"
            className="navMenuItem"
            type="primary"
            size="large"
          >
            Innskráning
          </Button>
          </>
          ) : (
            <p>Halló {userName}!</p>
          )}
        </div>
      </div>
    </>
  );
};
