const genericCrud = require('./generic.controller');
const { Group } = require('../model');

const relations = {
  getAll: 'subjects',
  get: 'subjects',
};

module.exports = {
  ...genericCrud(Group, relations),
};
