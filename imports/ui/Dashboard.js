import React, { Component } from 'react';

import Editor from './Editor';
import PrivateHeader from './PrivateHeader';
import PageContent from './PageContent';
import NoteList from './NoteList';


export default () => {
  return (
    <div>
      <PrivateHeader title="Notes" />
      <PageContent>
        <div className="page-content__sidebar">
          <NoteList />
        </div>
        <div className="page-content__main">
          <Editor />
        </div>
      </PageContent>
    </div>
  );
}
