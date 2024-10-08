'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function ProfesionRepository (models, Sequelize) {
  const { Profesion } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    const result = await Profesion.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, Profesion),
    findById       : id => Repository.findById(id, Profesion),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Profesion, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Profesion, t)
  };
};
