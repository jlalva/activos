'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de produccion
let items = [
  {
    id          : '5c9c83f7-5c9e-11ee-8c99-0242ac120001',
    nombre      : 'SEDE NUMERO 1',
    descripcion : 'descripcion de la sede',
    estado      : 'ACTIVO'
  },
  {
    id          : '5c9c83f7-5c9e-11ee-8c99-0242ac120002',
    nombre      : 'SEDE NUMERO 2',
    descripcion : 'descripcion de la sede',
    estado      : 'ACTIVO'
  }

];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('sede', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
