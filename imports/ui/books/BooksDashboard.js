import React from 'react';

import { createContainer } from 'meteor/react-meteor-data';

export const BooksDashboard = () => {
  return <div>Books here</div>
}


export default createContainer(()=> {
  return { };
}, BooksDashboard);
