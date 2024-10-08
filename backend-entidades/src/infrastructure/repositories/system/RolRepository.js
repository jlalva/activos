'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function MenuRepository (models, Sequelize) {
  const { Rol, Permiso } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    query.include = [
      {
        model : Permiso,
        as    : 'permisos'
      }
    ];

    const result = await Rol.findAndCountAll(query);
    return toJSON(result);
  }

  async function findOne (params = {}) {
    const query = { where: params };

    query.include = [
      {
        model : Permiso,
        as    : 'permisos'
      }
    ];

    const result = await Rol.findOne(query);

    return result.toJSON();
  }

  return {
    findAll,
    findOne,
    findById       : id => Repository.findById(id, Rol),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Rol, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Rol, t)
  };
};
