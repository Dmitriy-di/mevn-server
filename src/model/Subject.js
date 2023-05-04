const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose');

const schema = new Schema(
  {
    fullname: {
      first_name: {
        type: String,
        default: '',
        required: true,
      },
      middle_name: {
        type: String,
        default: '',
      },
      last_name: {
        type: String,
        default: '',
      },
    },
    email: {
      type: String,
      default: '',
      required: true,
    },
    modules: [
      {
        type: ObjectId,
        ref: 'Modulee',
      },
    ],
    tasks: [
      {
        type: ObjectId,
        ref: 'Task',
      },
    ],
    group: {
      type: ObjectId,
      ref: 'Group',
    },
  },
  { timestamps: true },
);

module.exports = model('Subject', schema);