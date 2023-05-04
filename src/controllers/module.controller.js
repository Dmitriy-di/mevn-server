const genericCrud = require('./generic.controller');
const { Module, Subject } = require('../model');
const boom = require('boom');

const relations = {
  getAll: 'tasks',
  get: 'tasks',
};

module.exports = {
  ...genericCrud(Module),

  async get({ params: { id } }, res) {
    try {
      const item = await Module.findById(id).populate(['tasks', 'responsible']);
      return res.status(200).send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },

  async getAll(_, res) {
    try {
      const items = await Module.find().populate(['tasks', 'responsible']);
      return res.status(200).send(items);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },

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
