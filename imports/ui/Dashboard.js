import React, { Component } from 'react';

import Editor from './Editor';
import PrivateHeader from './PrivateHeader';
import PageContent from './PageContent';
import NoteList from './NoteList';


export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
      <PageContent>
          <NoteList />
          <Editor />
      </PageContent>
    </div>
  );
}
