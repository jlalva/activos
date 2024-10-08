'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    id             : '60c3ddc2-e839-451d-95c9-a259ea781751',
    nombre         : 'LICENCIADO EN ARQUITECTURA....',
    descripcion    : '240',
    sigla          : 'SIN',
    fecha_registro : new Date(),
    estado         : 'ACTIVO'
  },
  {
    id             : '40c3ddc2-e839-451d-95c9-a259ea781752',
    nombre         : 'LICENCIADA EN MEDICINA',
    descripcion    : '240',
    sigla          : 'LM',
    fecha_registro : new Date(),
    estado         : 'ACTIVO'
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('profesion', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
