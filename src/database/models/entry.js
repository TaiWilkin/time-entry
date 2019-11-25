const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const entrySchema = new Schema({
  task: { type: String },
  project: { type: String, enum: ['Project Odyssey', 'Project Illiad', 'Project Apollo', 'Project Athena'] },
  starttime: { type: Date },
  endtime: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
});


// Create the model class
const ModelClass = mongoose.model('entry', entrySchema);

// Export the model
module.exports = ModelClass;
