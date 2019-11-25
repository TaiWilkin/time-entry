import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment-precise-range-plugin';
import { Helmet } from 'react-helmet';
import { createEntry } from '../actions';
import requireAuth from '../components/hocs/requireAuth';

const projects = ['Project Odyssey', 'Project Illiad', 'Project Apollo', 'Project Athena'];

class CreateEntryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      project: 'Project Odyssey',
      starttime: null,
      endtime: null,
      timerRunning: false,
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { starttime, endtime, project, task } = this.state;
    this.props.createEntry({ starttime, endtime, project, task });
    this.props.history.push('/entries')
  }

  startTimer() {
    this.setState({ starttime: new Date(), timerRunning: true });
  }

  stopTimer() {
    this.setState({ endtime: new Date(), timerRunning: false });
  }

  handleSelect({ target }) {
    this.setState({ project: target.value });
  }

  head() {
    return (
      <Helmet>
        <title>Entries App: Create Entry</title>
        <meta property="og:title" content="Entries App: Create Entry" />
      </Helmet>
    );
  }

  renderTimer() {
    const { starttime, endtime, timerRunning } = this.state;
    if (timerRunning) {
      return (
        <div>
          <p>Timer running...</p>
          <button className="styled-button" onClick={this.stopTimer}>Stop Timer</button>
        </div>
      );
    } else {
      return (
        <div>
          {!starttime ? (
            <button className="styled-button" onClick={this.startTimer}>Start Timer</button>
          ) : (
            <p>{moment.preciseDiff(starttime, moment(endtime))}</p>
          )}
        </div>
      );
    }
  }

  render() {
    const isValid = (
      this.state.task &&
      this.state.project &&
      this.state.starttime &&
      this.state.endtime
    );
    return (
      <div className="container">
        {this.head()}
        <label>
          Task name:
          <input
            type="text"
            name="task"
            onChange={e => this.setState({ task: e.target.value })}
            value={this.state.task}
          />
        </label>
        <div>
          <label>
            Project:
            <select
              onChange={e => this.handleSelect(e)}
              value={this.state.project}
            >
              {projects.map(project => (
                <option value={project} key={project}>{project}</option>
              ))}
            </select>
          </label>
        </div>
        {this.renderTimer()}
        <button className="styled-button" onClick={this.handleSubmit} disabled={!isValid}>Save Task</button>
      </div>
    );
  }
}

const mapStateToProps = ({ entries }) => {
  return { entries };
}

export default {
  component: connect(mapStateToProps, { createEntry })(
    requireAuth(CreateEntryPage)
)};
