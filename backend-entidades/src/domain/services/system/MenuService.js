'use strict';

const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function MenuService (repositories, helpers, res) {
  const { MenuRepository } = repositories;

  async function findAll (params) {
    try {
      const cargos = await MenuRepository.findAll(params);

      return cargos;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const cargo = await MenuRepository.findOne(params);

      if (!cargo) throw new Error('La cargo no existe');

      return cargo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (datos) {
    try {
      const cargo = await MenuRepository.createOrUpdate(datos);

      return cargo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (id) {
    try {
      const cargo = await MenuRepository.deleteItem(id);

      return cargo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function getMenusPadres () {
    try {
      const menus = await MenuRepository.getMenusPadres();

      return menus;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    findAll,
    findOne,
    createOrUpdate,
    deleteItem,
    getMenusPadres
  };
};
