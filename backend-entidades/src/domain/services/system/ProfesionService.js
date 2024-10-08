'use strict';

const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function ProfesionService (repositories, helpers, res) {
  const { ProfesionRepository } = repositories;

  async function findAll (params) {
    try {
      const profesiones = await ProfesionRepository.findAll(params);

      return profesiones;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const profesion = await ProfesionRepository.findOne(params);

      if (!profesion) throw new Error('La cargo no existe');

      return profesion;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (datos) {
    try {
      const profesion = await ProfesionRepository.createOrUpdate(datos);

      return profesion;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (id) {
    try {
      const profesion = await ProfesionRepository.deleteItem(id);

      return profesion;
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
