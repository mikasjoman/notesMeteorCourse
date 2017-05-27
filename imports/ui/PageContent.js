import React from 'react';
import NoteList from './NoteList';
import Editor from './Editor';

const PageContent = (props) =>{
  return (
    <div className="page-content">
      <div className="page-content__sidebar">
        <NoteList />
      </div>
      <div className="page-content__main">
        <Editor />
      </div>
    </div>
  )
}
export default PageContent;
