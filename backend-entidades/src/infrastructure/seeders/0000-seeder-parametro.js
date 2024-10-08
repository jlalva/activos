'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de produccion
let items = [
  {
    id          : '78d19520-f192-443a-a48a-7e8871e31000',
    codigo      : 'TGM',
    nombre      : 'MACULINO',
    grupo       : 'TGEN',
    descripcion : 'GENERO DE UNA PERSONA',
    estado      : 'ACTIVO'
  },
  {
    id          : '78d19520-f192-443a-a48a-7e8871e31001',
    codigo      : 'TGF',
    nombre      : 'FEMENINO',
    grupo       : 'TGEN',
    descripcion : 'GENERO DE UNA PERSONA',
    estado      : 'ACTIVO'
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('parametros', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
