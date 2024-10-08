'use strict';

const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function UnidadService (repositories, helpers, res) {
  const { UnidadRepository } = repositories;

  async function findAll (params) {
    try {
      const unidades = await UnidadRepository.findAll(params);

      return unidades;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const unidad = await UnidadRepository.findOne(params);

      if (!unidad) throw new Error('La cargo no existe');

      return unidad;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (datos) {
    try {
      const unidad = await UnidadRepository.createOrUpdate(datos);

      return unidad;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (id) {
    try {
      const unidad = await UnidadRepository.deleteItem(id);

      return unidad;
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
