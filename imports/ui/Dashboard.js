import React, { Component } from 'react';

import PrivateHeader from './PrivateHeader';

export default (props) => {
  return (
    <div>
      <PrivateHeader title="Notes" />
      {props.children}
    </div>
  );
}
