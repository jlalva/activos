'use strict';

const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function MarcaService (repositories, helpers, res) {
  const { MarcaRepository } = repositories;

  async function findAll (params) {
    try {
      const cargos = await MarcaRepository.findAll(params);

      return cargos;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const cargo = await MarcaRepository.findOne(params);

      return cargo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (datos) {
    try {
      const cargo = await MarcaRepository.createOrUpdate(datos);

      return cargo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (id) {
    try {
      const cargo = await MarcaRepository.deleteItem(id);

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
