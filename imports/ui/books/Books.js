import React from 'react';
import FlipMove from 'react-flip-move';

import { createContainer } from 'meteor/react-meteor-data';
import TwoSidedLayout from '../Components/TwoSidedLayout';

import BookList from './BookList';
import AddBook from './AddBook';
import FileUploadComponent from '../Components/FileUploadComponent';

const renderSidebar = () => {
  return (
    <div className="item-list">
      <AddBook />
      <FlipMove maintainContainerHeight={true}>
        <BookList />
      </FlipMove>
    </div>
  )
}

const renderMainContent = () => {
  return <div>main content</div>
}

export const BooksDashboard = () => {
  return <TwoSidedLayout sideBar={renderSidebar()} mainContent={renderMainContent()}/>
}


export default createContainer(()=> {
  return { };
}, BooksDashboard);
