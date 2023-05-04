const genericCrud = require('./generic.controller');
const { Task, Module, Subject } = require('../model');
const boom = require('boom');

const relations = {
  getAll: 'modulee',
  get: 'modulee',
};

module.exports = {
  ...genericCrud(Task),

  async get({ params: { id } }, res) {
    try {
      const item = await Task.findById(id).populate(['modulee', 'executor']);
      return res.status(200).send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },

  async getAll(_, res) {
    try {
      const items = await Task.find().populate(['modulee', 'executor']);
      return res.status(200).send(items);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },

  async create({ body }, res) {
    try {
      const item = new Task(body);
      const newItem = await item.save();

      const module = await Module.findById(body.modulee);
      module.tasks.push(newItem);
      await module.save();

      const subject = await Subject.findById(body.executor);
      subject.tasks.push(newItem);
      await subject.save();

      return res.status(200).send(newItem);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
};
