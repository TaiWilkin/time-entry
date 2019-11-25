import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div className="container">
      <Helmet>
        <title>Entries App</title>
        <meta property="og:title" content="Entries App" />
      </Helmet>
      <div className="welcome">
        <h3>Welcome</h3>
      </div>
    </div>
  );
};

export default {
  component: Home
};
