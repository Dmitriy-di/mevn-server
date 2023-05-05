const genericCrud = require('./generic.controller');
const { Module, Subject } = require('../model');
const boom = require('boom');

const relations = {
  getAll: [
    'tasks',
    'responsible',
    {
      path: 'tasks',
      populate: {
        path: 'executor',
        model: 'Subject',
      },
    },
  ],
  get: [
    'tasks',
    'responsible',
    {
      path: 'tasks',
      populate: {
        path: 'executor',
        model: 'Subject',
      },
    },
  ],
};

module.exports = {
  ...genericCrud(Module, relations),

  async create({ body }, res) {
    try {
      const item = new Module(body);
      const newItem = await item.save();

      const subject = await Subject.findById(body.responsible);
      subject.modules.push(newItem);
      await subject.save();

      return res.status(200).send(newItem);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
};
