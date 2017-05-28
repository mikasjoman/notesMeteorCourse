import React from 'react';

import { createContainer } from 'meteor/react-meteor-data';
import FileUploadComponent from '../Components/FileUploadComponent';


export const BooksDashboard = () => {
  return <div>
    <p>Books here</p>
  </div>
}


export default createContainer(()=> {
  return { };
}, BooksDashboard);
