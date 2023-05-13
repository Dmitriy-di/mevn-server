const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose');

const schema = new Schema(
  {
    name: {
      type: String,
      default: '',
      required: true,
    },
    description: {
      type: String,
      default: '',
      required: true,
    },
    status: {
      type: String,
      default: '',
      required: true,
    },
    modulee: {
      type: ObjectId,
      ref: 'Modulee',
      required: true,
    },
    executor: {
      type: ObjectId,
      ref: 'Subject',
      required: true,
    },
    files: [
      {
        type: ObjectId,
        ref: 'File',
      },
    ],
  },
  { timestamps: true },
);

module.exports = model('Task', schema);
