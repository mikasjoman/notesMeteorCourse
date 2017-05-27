import React, { Component } from 'react';

import PrivateHeader from './PrivateHeader';
import PageContent from './PageContent';



export default (props) => {
  return (
    <div>
      <PrivateHeader title="Notes" />
      {props.children}
    </div>
  );
}
