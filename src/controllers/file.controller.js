const genericCrud = require('./generic.controller');
const { File } = require('../model');
const boom = require('boom');

const relations = {};

module.exports = {
  ...genericCrud(File),
};
