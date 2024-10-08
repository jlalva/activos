'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function CargoRepository (models, Sequelize) {
  const { Cargo } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    const result = await Cargo.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, Cargo),
    findById       : id => Repository.findById(id, Cargo),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Cargo, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Cargo, t)
  };
};
