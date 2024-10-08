'use strict';

const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function GrupoService (repositories, helpers, res) {
  const { GrupoRepository } = repositories;

  async function findAll (params) {
    try {
      const cargos = await GrupoRepository.findAll(params);

      return cargos;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const cargo = await GrupoRepository.findOne(params);

      if (!cargo) throw new Error('La cargo no existe');

      return cargo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (datos) {
    try {
      const cargo = await GrupoRepository.createOrUpdate(datos);

      return cargo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (id) {
    try {
      const cargo = await GrupoRepository.deleteItem(id);

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
