import React from 'react';
import FlipMove from 'react-flip-move';

import { createContainer } from 'meteor/react-meteor-data';
import TwoSidedLayout from '../Components/TwoSidedLayout';


import AddBook from './AddBook';
import BookList from './BookList';
import Chapters from './Chapters';
import FileUploadComponent from '../Components/FileUploadComponent';

const renderSidebar = () => {
  return (
    <div className="item-list">
      <AddBook />
      <BookList />
    </div>
  )
}

const renderMainContent = () => {
  return <Chapters />;
}

export const BooksDashboard = () => {
  return <TwoSidedLayout sideBar={renderSidebar()} mainContent={renderMainContent()}/>
}


export default createContainer(()=> {
  return { };
}, BooksDashboard);
