const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = { type: String, required: true }

const schema = new Schema({
  name: requiredString,
  user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
});

module.exports = mongoose.model('Resource', schema);
