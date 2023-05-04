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
    },
    dateTimeStart: {
      type: Date,
      default: '',
      required: true,
    },
    dateTimeEnd: {
      type: Date,
      default: '',
      required: true,
    },
    responsible: {
      type: ObjectId,
      ref: 'Subject',
      required: true,
    },
    tasks: [
      {
        type: ObjectId,
        ref: 'Task',
      },
    ],
  },
  { timestamps: true },
);

module.exports = model('Modulee', schema);
