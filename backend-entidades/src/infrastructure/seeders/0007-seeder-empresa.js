'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    id              : '745034da-06cb-4d98-8fee-4c982adfbb21',
    razon_social    : 'EMPRESA ESTATAL DE PRODUCTOS',
    ruc             : '121212121212',
    siglas          : 'EMEP',
    ubigeo_id       : null,
    direccion       : 'DIRECCION FICTICIA NUMERO 1',
    telefono        : '78787878',
    fecha_fundacion : '1990-11-07',
    logo            : '',
    banner          : '',
    fecha_registro  : new Date('2023-01-01'),
    descripcion     : 'Es una empresa de venta de productos',
    estado          : 'ACTIVO'
  },
  {
    id              : '745034da-06cb-4d98-8fee-4c982adfbb22',
    razon_social    : 'EMPRESA DE VENTAS DE EMBUTIDOSS',
    ruc             : '323445601203',
    siglas          : 'EMEP',
    ubigeo_id       : null,
    direccion       : 'DIRECCION FICTICIA NUMERO 2, ENTRE CALLES SIN NOMBRE, NUMERO 2',
    telefono        : '78787879',
    fecha_fundacion : '1990-11-07',
    logo            : '',
    banner          : '',
    fecha_registro  : new Date('2023-01-01'),
    descripcion     : 'Es una empresa de venta de EMBUTIDOS',
    estado          : 'ACTIVO'
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('empresa', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
