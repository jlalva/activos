'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function SedeRepository (models, Sequelize) {
  const { Sede } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    const result = await Sede.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, Sede),
    findById       : id => Repository.findById(id, Sede),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Sede, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Sede, t)
  };
};
