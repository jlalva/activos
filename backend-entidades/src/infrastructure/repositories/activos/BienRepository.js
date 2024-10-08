'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function BienRepository (models, Sequelize) {
  const { Bien } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    const result = await Bien.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, Bien),
    findById       : id => Repository.findById(id, Bien),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Bien, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Bien, t)
  };
};
