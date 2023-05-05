const genericCrud = require('./generic.controller');
const { Subject, Group } = require('../model');

const relations = {
  getAll: ['modules', 'tasks', 'group'],
  get: ['modules', 'tasks', 'group'],
};

module.exports = {
  ...genericCrud(Subject, relations),

  async create({ body }, res) {
    try {
      const item = new Subject(body);
      const newItem = await item.save();

      const group = await Group.findById(body.group);
      group.subjects.push(newItem);
      await group.save();

      return res.status(200).send(newItem);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
};
