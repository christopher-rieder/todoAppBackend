const mongoose = require('mongoose');
const STATUSES = ['To Do', 'In Progress', 'Done', 'Deleted'];

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: {
      values: STATUSES,
      message: 'Status must be one of the following: ' + STATUSES.join(', ').trim()
    },
    default: 'To Do'
  },
  tags: {
    type: [String],
    trim: true
  }
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
