import React from 'react';

const TwoSidedLayout = (props) =>{

  return (
    <div className="page-content">
      <div className="page-content__sidebar">
        {props.sideBar}
      </div>
      <div className="page-content__main">
        {props.mainContent}
      </div>
    </div>
  )
}
export default TwoSidedLayout;
