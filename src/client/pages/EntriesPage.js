import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEntries } from '../actions';
import { Helmet } from 'react-helmet';
import requireAuth from '../components/hocs/requireAuth';
import Entry from '../components/Entry';

class EntriesList extends Component {
  componentDidMount() {
    this.props.fetchEntries();
  }

  renderEntries() {
    return this.props.entries.map(entry => {
      return <Entry {...entry} key={entry._id} />;
    });
  }

  head() {
    return (
      <Helmet>
        <title>{`${this.props.entries.length} Entries Loaded`}</title>
        <meta property="og:title" content="Entries App" />
      </Helmet>
    );
  }

  render() {
    return (
      <div className="container">
        {this.head()}
        <h1>Time Entries</h1>
        <div className="card-list">
          {this.renderEntries()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { entries: state.entries };
}

function loadData(store) {
  return store.dispatch(fetchEntries());
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchEntries })(
    requireAuth(EntriesList)
)};
