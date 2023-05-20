const genericCrud = require('./generic.controller');
const { Group } = require('../model');

const relations = {
  getAll: 'subjects',
  get: 'subjects',
};

module.exports = {
  ...genericCrud(Group, relations),

  async get(req, res) {
    try {
      let group = null;
      console.log(8, req.params);

      if (req.user.moderator) {
        group = await Group.findById(req.params.id).populate(relations.get);
      }

      console.log(6, group);

      return res.status(200).send(group);
    } catch (err) {
      return res.sendStatus(403);
    }
  },

  // async get({ params: { id } }, res) {
  //   try {
  //     const item = await Group.findById(id).populate(relations.get);

  //     console.log(9, item);

  //     return res.status(200).send(item);
  //   } catch (err) {
  //     return res.sendStatus(403);
  //   }
  // },
};
