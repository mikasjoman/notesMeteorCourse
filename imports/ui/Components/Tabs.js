import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

const renderTabs = (tabList) => {
  // URL_LIST { url: string, title: String, }
  return tabList.map(link => {
    return <Link key={link.url} className="tab" activeClassName="tab tab__selected" to={link.url}>{link.title}</Link>;
  });
}

const Tabs = (props) => {
  return <div className="tabs">{renderTabs(props.tabList)}</div>;
}

Tabs.propTypes = {
  tabList: React.PropTypes.array.isRequired
}

export default Tabs;
