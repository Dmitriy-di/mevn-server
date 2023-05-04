const genericCrud = require('./generic.controller');
const { Subject } = require('../model');

const relations = {
  getAll: 'group',
  get: 'group',
};

module.exports = {
  ...genericCrud(Subject, relations),
};
