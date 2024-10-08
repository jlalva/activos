'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function ModeloRepository (models, Sequelize) {
  const { Modelo } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    const result = await Modelo.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, Modelo),
    findById       : id => Repository.findById(id, Modelo),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Modelo, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Modelo, t)
  };
};
