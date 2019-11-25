import React from 'react';
import moment from 'moment';
import 'moment-precise-range-plugin';

export default ({ task, project, starttime, endtime }) => (
  <div className="card">
    <strong>{task}</strong>
    <p>{project}</p>
    <i>{moment.preciseDiff(starttime, endtime)}</i>
  </div>
);
