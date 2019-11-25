const Entry = require('../models/entry');
var ObjectId = require('mongoose').Types.ObjectId;

exports.getEntries = (req, res) => {
  const user = req.user._id;
  return Entry.find({ user: new ObjectId(user) })
    .then(entries => {
      return res.send(entries)
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

exports.createEntry = (req, res) => {
    const user = req.user._id;
    if (!user) {
      return res.status(401).send('Unauthorized to create time entry');
    }

    const { task, project, starttime = new Date(), endtime = new Date() } = req.body;
    if (!task || !project) {
      return res.status(422).send('Task name and project are required');
    }

    const entry = new Entry({
      task: task,
      project: project,
      starttime: starttime,
      endtime: endtime,
      user: new ObjectId(user),
    });

    entry.save()
      .then(result => {
        return res.status(200).send(result);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send(err);
      });
};
