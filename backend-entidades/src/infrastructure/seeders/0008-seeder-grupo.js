'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de produccion
let items = [
  {
    id             : '3f75c9c8-5c9e-11ee-8c99-0242ac120002',
    nombre         : 'GRUPO DINAMITA',
    descripcion    : 'descripcion del grupo DINAMITA',
    fecha_registro : new Date('2023-12-12'),
    estado         : 'ACTIVO'
  },
  {
    id             : '3f75c9c8-5c9e-11ee-8c99-0242ac120003',
    nombre         : 'GRUPO ALFA LOBO',
    descripcion    : 'descripcion del grupo ALFA LOBO',
    fecha_registro : new Date('2023-11-03'),
    estado         : 'ACTIVO'
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('grupo', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
