'use strict';

const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function SedeService (repositories, helpers, res) {
  const { SedeRepository } = repositories;

  async function findAll (params) {
    try {
      const cargos = await SedeRepository.findAll(params);

      return cargos;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const cargo = await SedeRepository.findOne(params);

      if (!cargo) throw new Error('La cargo no existe');

      return cargo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (datos) {
    try {
      const cargo = await SedeRepository.createOrUpdate(datos);

      return cargo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (id) {
    try {
      const cargo = await SedeRepository.deleteItem(id);

      return cargo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    findAll,
    findOne,
    createOrUpdate,
    deleteItem
  };
};
