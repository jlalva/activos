'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de produccion
let items = [
  {
    id             : '9c83f75c-5c9e-11ee-8c99-0242ac120001',
    empresa_id     : '745034da-06cb-4d98-8fee-4c982adfbb21',
    grupo_id       : '3f75c9c8-5c9e-11ee-8c99-0242ac120002',
    sede_id        : '5c9c83f7-5c9e-11ee-8c99-0242ac120001',
    nombre         : 'UNIDAD DE DESARROLLO TECNOLOGICO',
    abreviado      : 'UDT',
    representante  : 'FELIX PALACIOS',
    cargo          : 'JEFE DE UNIDAD',
    fecha_registro : new Date('2023-12-12'),
    estado         : 'ACTIVO'
  },
  {
    id             : '9c83f75c-5c9e-11ee-8c99-0242ac120002',
    empresa_id     : '745034da-06cb-4d98-8fee-4c982adfbb21',
    grupo_id       : '3f75c9c8-5c9e-11ee-8c99-0242ac120002',
    sede_id        : '5c9c83f7-5c9e-11ee-8c99-0242ac120002',
    nombre         : 'UNIDAD DE PLANIFICACION Y DESARROLLO URBANO',
    abreviado      : 'UDT',
    representante  : 'FELIX PALACIOS',
    cargo          : 'JEFE DE UNIDAD',
    fecha_registro : new Date('2023-12-12'),
    estado         : 'ACTIVO'
  },
  {
    id             : '9c83f75c-5c9e-11ee-8c99-0242ac120003',
    empresa_id     : '745034da-06cb-4d98-8fee-4c982adfbb21',
    grupo_id       : '3f75c9c8-5c9e-11ee-8c99-0242ac120003',
    sede_id        : '5c9c83f7-5c9e-11ee-8c99-0242ac120002',
    nombre         : 'UNIDAD DE GESTION DE PROYECTOS',
    abreviado      : 'UDT',
    representante  : 'FELIX PALACIOS',
    cargo          : 'JEFE DE UNIDAD',
    fecha_registro : new Date('2023-12-12'),
    estado         : 'ACTIVO'
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('unidad', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
