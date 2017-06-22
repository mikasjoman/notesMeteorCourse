import React from 'react';

const ListEmptyItem = (props) => {
  return (
      <p className="empty-item">You do not have any { props.type } yet</p>
  );
};

ListEmptyItem.propTypes = {
  type: React.PropTypes.string.isRequired
};

export default ListEmptyItem;
