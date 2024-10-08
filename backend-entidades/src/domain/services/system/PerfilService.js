'use strict';

const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function PerfilService (repositories, helpers, res) {
  const { PerfilRepository } = repositories;

  async function findAll (params) {
    try {
      const perfiles = await PerfilRepository.findAll(params);

      return perfiles;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const perfil = await PerfilRepository.findOne(params);

      if (!perfil) throw new Error('La cargo no existe');

      return perfil;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (datos) {
    try {
      const perfil = await PerfilRepository.createOrUpdate(datos);

      return perfil;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (id) {
    try {
      const perfil = await PerfilRepository.deleteItem(id);

      return perfil;
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
