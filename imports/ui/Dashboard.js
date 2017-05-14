import React, { Component } from 'react';

import PrivateHeader from './PrivateHeader';
import PageContent from './PageContent';

export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
      <PageContent>
          Dashboard page content
      </PageContent>
    </div>
  );
}
