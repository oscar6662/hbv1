import React from 'react';

type Props = {};

const Auth = (props: Props) => {
  return (
    <>
      <h1>Login to PETRA!</h1>

      <div>
        <label htmlFor="username">Enter username: </label>
        <input type="text" id="username" />
      </div>

      <div>
        <label htmlFor="password">Enter password:</label>
        <input type="password" id="password" />
      </div>

      <input
        type="submit"
        onClick={() => {
          console.log('Wott');
        }}
      />
    </>
  );
};

export default Auth;
