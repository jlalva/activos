'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de produccion
let items = [
  {
    id         : '3f75c9c8-5c9e-11ee-8c99-0242ac120002',
    persona_id : '40c3ddc2-e839-451d-95c9-a259ea781000',
    rol_id     : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    cargo_id   : '3ddc240c-e839-451d-95c9-a259ea781752',
    unidad_id  : '9c83f75c-5c9e-11ee-8c99-0242ac120002',
    fecha_alta : new Date('2023-09-30'),
    fecha_baja : null,
    estado     : 'ACTIVO'
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('perfil', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
