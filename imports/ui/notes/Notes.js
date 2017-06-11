import React from 'react';
import NoteList from './NoteList';
import Editor from './Editor';
import TwoSidedLayout from '../Components/TwoSidedLayout';

const Notes = (props) =>{
  return <TwoSidedLayout sideBar={<NoteList />} mainContent={<Editor />} />
}
export default Notes;
