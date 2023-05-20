const genericCrud = require('./generic.controller');
const { Task, Module, Subject } = require('../model');
const boom = require('boom');

const relations = {
  getAll: ['modulee', 'executor', 'files'],
  get: ['modulee', 'executor', 'files'],
};

module.exports = {
  ...genericCrud(Task, relations),

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

  async getAll(req, res) {
    try {
      const tasks = await Task.find({
        executor: req?.user?.userId,
      }).populate(relations.getAll);

      return res.status(200).send(tasks);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
};
