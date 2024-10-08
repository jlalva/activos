'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function UbigeoRepository (models, Sequelize) {
  const { Ubigeo } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    const result = await Ubigeo.findAndCountAll(query);
    return toJSON(result);
  }

  async function findByType (params = {}) {
    const tipo = params.tipo;
    let agruparPor = 'departamento_id';
    let condicion = { departamentoId: params.id };
    if (tipo === 'provincia') {
      agruparPor = 'provincia_id';
      condicion = { departamentoId: params.id };
    }
    if (tipo === 'distrito') {
      agruparPor = 'id'; // Para seleccionar el idUbigeo
      condicion = { provinciaId: params.id };
    }
    const query = {};

    query.attributes = [
      tipo,
      agruparPor
    ];

    if (params?.id) { query.where = condicion; }

    query.group = [tipo, agruparPor];
    const result = await Ubigeo.findAndCountAll(query);
    return toJSON(result);
  }

  async function obtenerMaximoId (nombre) {
    const query = getQuery(nombre);
    query.where = {};

    const result = await Ubigeo.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll,
    findByType,
    findOne        : params => Repository.findOne(params, Ubigeo),
    findById       : id => Repository.findById(id, Ubigeo),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Ubigeo, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Ubigeo, t),
    obtenerMaximoId
  };
};
