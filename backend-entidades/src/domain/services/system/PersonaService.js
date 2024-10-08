'use strict';

const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function PersonaService (repositories, helpers, res) {
  const { PersonaRepository, AuthRepository } = repositories;

  async function findAll (params) {
    try {
      const personas = await PersonaRepository.findAll(params);

      return personas;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const persona = await PersonaRepository.findOne(params);
      if (!persona) throw new Error('La cargo no existe');

      return persona;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (datos) {
    try {
      if (datos.clave) datos.clave = await AuthRepository.codificarContrasena(datos.clave);

      const persona = await PersonaRepository.createOrUpdate(datos);

      return persona;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (id) {
    try {
      const persona = await PersonaRepository.deleteItem(id);

      return persona;
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
