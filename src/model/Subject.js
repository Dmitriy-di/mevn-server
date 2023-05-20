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
    // files: [
    //   {
    //     type: ObjectId,
    //     ref: 'File',
    //   },
    // ],
    group: {
      type: ObjectId,
      ref: 'Group',
      // Если добавить поле required: true, то при создании модуля и указании ответственного будет получаться ошибка
    },
    password: {
      type: String,
      default: 'qwerty123',
    },
    moderator: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = model('Subject', schema);
