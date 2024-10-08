'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function UnidadRepository (models, Sequelize) {
  const { Unidad } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    const result = await Unidad.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, Unidad),
    findById       : id => Repository.findById(id, Unidad),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Unidad, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Unidad, t)
  };
};
