'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function CodigoRepository (models, Sequelize) {
  const { Codigo } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    const result = await Codigo.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, Codigo),
    findById       : id => Repository.findById(id, Codigo),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Codigo, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Codigo, t)
  };
};
