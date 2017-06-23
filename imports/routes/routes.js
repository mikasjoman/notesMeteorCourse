import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link, Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Signup from '../ui/Signup';
import NotFound from '../ui/Components/NotFound';
import Login from '../ui/Login';
import Dashboard from '../ui/Dashboard';
import Notes from '../ui/notes/Notes';
import Books from '../ui/books/Books';


const onEnterNotePage = (nextState) => {
  Session.set('selectedNoteId', nextState.params.id);
}

const onEnterBookPage = (nextState) => {
  Session.set('selectedBookId', nextState.params.id);
}

const onLeaveNotePage = () => {
  Session.set('selectedNoteId', undefined);
}

const onLeaveBookPage = () => {
  Session.set('selectedBookId', undefined);
}

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  if(isUnauthenticatedPage && isAuthenticated){
    browserHistory.replace('/books');
  } else if(isAuthenticatedPage && !isAuthenticated){
    browserHistory.replace('/');
  }
};

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};

export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length -1];
  Session.set('currentPagePrivacy', lastRoute.privacy)
};

export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange} >
      <Route component={Dashboard}>
        <Route path="/" component={Login} privacy="unauth" />
        <Route path="/signup" component={Signup} privacy="unauth" />

        <Route path="/books" component={Books} privacy="auth"/>
        <Route path="/books/:id" component={Books} privacy="auth" onLeave={onLeaveBookPage} onEnter={onEnterBookPage} />

        <Route path="/notes" component={Notes} privacy="auth" onLeave={onLeaveNotePage} onEnter={onEnterNotePage} />
        <Route path="/notes/:id" component={Notes} privacy="auth" onLeave={onLeaveNotePage} onEnter={onEnterNotePage} />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
