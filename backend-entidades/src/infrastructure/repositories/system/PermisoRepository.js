'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function PermisoRepository (models, Sequelize) {
  const { Permiso } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    const result = await Permiso.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, Permiso),
    findById       : id => Repository.findById(id, Permiso),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Permiso, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Permiso, t),
    deleteItemCond : (params, t) => Repository.deleteItemCond(params, Permiso, t)
  };
};
