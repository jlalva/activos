'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de produccion
let items = [
  {
    id              : '78d19520-f192-443a-a48a-7e8871e398d1',
    departamento_id : '01',
    provincia_id    : '0101',
    distrito_id     : '010101',
    departamento    : 'Amazonas',
    provincia       : 'Chachapoyas',
    distrito        : 'Chachapoyas',
    estado          : 'ACTIVO'
  },
  {
    id              : '78d19520-f192-443a-a48a-7e8871e398d2',
    departamento_id : '01',
    provincia_id    : '0101',
    distrito_id     : '010101',
    departamento    : 'Amazonas',
    provincia       : 'Chachapoyas',
    distrito        : 'Asunción',
    estado          : 'ACTIVO'
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('ubigeo', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
