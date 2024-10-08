'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function PerfilRepository (models, Sequelize) {
  const {
    Perfil,
    Persona,
    Cargo,
    Rol,
    Unidad
  } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    query.include = [
      {
        model : Persona,
        as    : 'persona'
      },
      {
        model : Cargo,
        as    : 'cargo'
      },
      {
        model : Rol,
        as    : 'rol'
      },
      {
        model : Unidad,
        as    : 'unidad'
      }
    ];

    const result = await Perfil.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll,
    findOne        : params => Repository.findOne(params, Perfil),
    findById       : id => Repository.findById(id, Perfil),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Perfil, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Perfil, t)
  };
};
