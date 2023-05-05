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
    icon: {
      type: String,
      default: '',
    },
    subjects: [
      {
        type: ObjectId,
        ref: 'Subject',
      },
    ],
  },
  { timestamps: true },
);

module.exports = model('Group', schema);
