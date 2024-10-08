'use strict';

const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function EmpresaService (repositories, helpers, res) {
  const { EmpresaRepository } = repositories;

  async function findAll (params) {
    try {
      const empresas = await EmpresaRepository.findAll(params);

      return empresas;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const empresa = await EmpresaRepository.findOne(params);

      if (!empresa) throw new Error('La cargo no existe');

      return empresa;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (datos) {
    try {
      const empresa = await EmpresaRepository.createOrUpdate(datos);

      return empresa;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (id) {
    try {
      const empresa = await EmpresaRepository.deleteItem(id);

      return empresa;
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
