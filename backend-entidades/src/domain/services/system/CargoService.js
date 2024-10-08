'use strict';

const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function CargoService (repositories, helpers, res) {
  const { CargoRepository } = repositories;

  async function findAll (params) {
    try {
      const cargos = await CargoRepository.findAll(params);

      return cargos;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const cargo = await CargoRepository.findOne(params);

      if (!cargo) throw new Error('La cargo no existe');

      return cargo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (datos) {
    try {
      const cargo = await CargoRepository.createOrUpdate(datos);

      return cargo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (id) {
    try {
      const cargo = await CargoRepository.deleteItem(id);

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
