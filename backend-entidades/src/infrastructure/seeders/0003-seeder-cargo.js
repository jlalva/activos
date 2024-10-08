'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    id             : '40c3ddc2-e839-451d-95c9-a259ea781001',
    nombre         : 'RESPONSABLE DE AREA',
    descripcion    : 'ESTE ES EL PRIMER CARGO DEL SEEDER',
    fecha_registro : new Date(),
    estado         : 'ACTIVO'
  },
  // Tipo de documento
  {
    id             : '3ddc240c-e839-451d-95c9-a259ea781752',
    nombre         : 'PROFESIONAL EN DESARROLLO DE SOFTWARE',
    descripcion    : 'OTRO SEEDER',
    fecha_registro : new Date('2015-12-12'),
    estado         : 'ACTIVO'
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('cargo', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
