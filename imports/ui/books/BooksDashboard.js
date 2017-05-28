import React from 'react';

import { createContainer } from 'meteor/react-meteor-data';
import TwoSidedLayout from '../Components/TwoSidedLayout';


const renderSidebar = () => {
  return (
    <div>left</div>
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
