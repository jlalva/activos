'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function MarcaRepository (models, Sequelize) {
  const { Marca } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    const result = await Marca.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, Marca),
    findById       : id => Repository.findById(id, Marca),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Marca, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Marca, t)
  };
};
