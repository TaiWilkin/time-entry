import React from 'react';
import HomePage from './pages/HomePage';
import EntriesPage from './pages/EntriesPage';
import CreateEntryPage from './pages/CreateEntryPage';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: "/",
        exact: true
      },
      {
        ...LoginPage,
        path: "/login"
      },
      {
        ...SignupPage,
        path: "/signup"
      },
      {
        ...EntriesPage,
        path: "/entries"
      },
      {
        ...CreateEntryPage,
        path: "/create"
      },
      {
        ...NotFoundPage
      }
    ]
  }
];
