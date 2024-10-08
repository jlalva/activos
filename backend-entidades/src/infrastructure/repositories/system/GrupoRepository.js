'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function GrupoRepository (models, Sequelize) {
  const { Grupo } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    const result = await Grupo.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, Grupo),
    findById       : id => Repository.findById(id, Grupo),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Grupo, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Grupo, t)
  };
};
