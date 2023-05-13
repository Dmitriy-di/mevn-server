const genericCrud = require('./generic.controller');
const { File } = require('../model');

const relations = {
  getAll: ['task'],
  get: ['task'],
};

module.exports = {
  ...genericCrud(File, relations),
};
