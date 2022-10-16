import React from 'react';

type Props = {
  firstName: string;
  lastName: string;
  index: number;
};

export const DcwCard = (props: Props) => {
  return (
    <div
      style={{ borderBottom: 'solid 1px black' }}
      key={`daycare-worker-item-${props.index}`}
    >
      <h2>Nafn: {`${props.firstName} ${props.lastName}`}</h2>
    </div>
  );
};
