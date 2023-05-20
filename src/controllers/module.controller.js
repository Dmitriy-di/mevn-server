const genericCrud = require('./generic.controller');
const { Module, Subject, Task } = require('../model');
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
    {
      path: 'tasks',
      populate: {
        path: 'files',
        model: 'File',
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
      populate: {
        path: 'files',
        model: 'File',
      },
    },
  ],
};

module.exports = {
  ...genericCrud(Module, relations),

  async getAll(req, res) {
    try {
      let modules = [];

      if (req.user.moderator) {
        modules = await Module.find().populate(relations.getAll);
      } else {
        console.log(2);
        modules = await Module.find({
          responsible: req?.user?.userId,
        }).populate(relations.getAll);
      }

      // const modules = await Module.find().populate(relations.getAll);
      return res.status(200).send(modules);
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

  async delete({ params: { id } }, res) {
    try {
      let mod = await Module.findById(id);

      for (let task of mod.tasks) {
        await Task.findByIdAndDelete(task._id);
      }

      await Module.findByIdAndDelete(id);

      return res.status(200).send({ status: 'OK', message: 'Удалено' });
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
};
