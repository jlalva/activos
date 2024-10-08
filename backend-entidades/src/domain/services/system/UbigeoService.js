'use strict';

const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function UbigeoService (repositories, helpers, res) {
  const { UbigeoRepository } = repositories;

  async function findAll (params) {
    try {
      const ubigeo = await UbigeoRepository.findAll(params);

      return ubigeo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findOne (params) {
    try {
      const ubigeo = await UbigeoRepository.findOne(params);

      if (!ubigeo) throw new Error('La cargo no existe');

      return ubigeo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function findByType (params) {
    try {
      console.log('findbytipe en service');
      const ubigeo = await UbigeoRepository.findByType(params);

      if (!ubigeo) throw new Error('La ubicación no existe');

      return ubigeo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (datos) {
    try {
      console.log('quierecrear');
      const ubigeo = await UbigeoRepository.createOrUpdate(datos);
      console.log('quierecrear2222');
      return ubigeo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (id) {
    try {
      const ubigeo = await UbigeoRepository.deleteItem(id);

      return ubigeo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function obtenerMaximoId (nombre) {
    try {
      const ubigeo = await UbigeoRepository.obtenerMaximoId(nombre);

      return ubigeo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    findAll,
    findOne,
    findByType,
    createOrUpdate,
    deleteItem,
    obtenerMaximoId
  };
};
