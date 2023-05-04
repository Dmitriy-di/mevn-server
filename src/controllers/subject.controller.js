const genericCrud = require('./generic.controller');
const { Subject } = require('../model');

const relations = {
  getAll: 'group',
  get: 'group',
};

module.exports = {
  ...genericCrud(Subject, relations),

  async get({ params: { id } }, res) {
    try {
      const item = await Subject.findById(id).populate(['modules', 'tasks']);
      return res.status(200).send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },

  async getAll(_, res) {
    try {
      const items = await Subject.find().populate(['modules', 'tasks']);
      return res.status(200).send(items);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
};
