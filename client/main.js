import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration';

Tracker.autorun(()=> {
  const isAuthenticated = !!Meteor.userId(); //double makes it true if signed in
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(()=> {
  // if a note is picked, fetch the noteId and set session
  const selectedNoteId = Session.get('selectedNoteId');
  Session.set('isNavOpen', false);
  if (selectedNoteId) {
    browserHistory.replace(`/notes/${selectedNoteId}`);
  };
});

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');
  //below adds is nav open if it doesnt exist
  document.body.classList.toggle('is-nav-open', isNavOpen);
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  Session.set('isNavOpen', false);
  Session.set('selectedPage', 'notes');
  ReactDOM.render(routes, document.getElementById('app'));
});
