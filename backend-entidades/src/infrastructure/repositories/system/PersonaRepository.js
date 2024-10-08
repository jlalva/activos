'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function PersonaRepository (models, Sequelize) {
  const { Persona, Profesion, Ubigeo, Parametro } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = {};

    query.include = [{
      model      : Profesion,
      as         : 'profesion',
      attributes : ['id', 'nombre']
    },
    {
      model      : Ubigeo,
      as         : 'ubigeo',
      attributes : ['id', 'departamento_id', 'departamento', 'provincia_id', 'provincia', 'distrito']
    },
    {
      model      : Parametro,
      as         : 'genero',
      attributes : ['id', 'nombre']
    }
    ];

    if (params.nombres) {
      query.where.nombres = {
        [Op.or]: [
          { [Op.iLike]: `%${params.nombres}%` },
          { [Op.iLike]: `%${params.apellidoPaterno}%` },
          { [Op.iLike]: `%${params.apellidoMaterno}%` }
        ]
      };
    }

    if (params.dni) {
      query.where.dni = {
        [Op.iLike]: `%${params.dni}%`
      };
    }

    if (params.estado) {
      query.where.estado = params.estado;
    }

    const result = await Persona.findAndCountAll(query);
    return toJSON(result);
  }

  async function findOne (params = {}) {
    const query = {};
    query.where = params;

    query.include = [{
      model      : Profesion,
      as         : 'profesion',
      attributes : ['id', 'nombre']
    },
    {
      model      : Ubigeo,
      as         : 'ubigeo',
      attributes : ['id', 'departamento_id', 'departamento', 'provincia_id', 'provincia', 'distrito']
    }
    ];
    const result = await Persona.findOne(query);
    console.log('encuentra_persona', result);
    return result;
  }

  return {
    findAll,
    findOne,
    findById       : id => Repository.findById(id, Persona),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Persona, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Persona, t)
  };
};
