import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Session } from 'meteor/session';

const setSelectedTab = (url) => {
  Session.set('selectedTab', url);
}

const renderTabs = (props) => {
  // URL_LIST { url: string, title: String, }
  return props.tabList.map(link => {
    const className = props.selectedTab == link.url ? 'tab tab__selected' : 'tab';
    return (
      <Link
        key={link.url}
        onClick={() => setSelectedTab(link.url)}
        className={className}
        to={link.url}>{link.title}
      </Link>
    );
  });
}

const Tabs = (props) => {
  return <div className="tabs">{renderTabs(props)}</div>;
}

Tabs.propTypes = {
  tabList: React.PropTypes.array.isRequired
}

export default createContainer(()=> {
  return {
    selectedTab: Session.get('selectedTab')
  };
}, Tabs);
