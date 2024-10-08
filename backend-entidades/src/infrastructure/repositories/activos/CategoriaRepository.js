'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function CategoriaRepository (models, Sequelize) {
  const { Categoria } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    const result = await Categoria.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, Categoria),
    findById       : id => Repository.findById(id, Categoria),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Categoria, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Categoria, t)
  };
};
