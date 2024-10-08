'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    id       : '9d6e3afa-2efe-44fa-b08c-4d45778ce001',
    menu_id  : '6190597f-7fa6-4c39-bcc9-7a1441ba566a',
    rol_id   : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    ver      : true,
    agregar  : true,
    editar   : true,
    eliminar : false,
    estado   : 'ACTIVO'
  },
  {
    id       : '9d6e3afa-2efe-44fa-b08c-4d45778ce002',
    menu_id  : '039a897a-76dd-44c1-b3d7-9682df8f5342',
    rol_id   : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    ver      : true,
    agregar  : true,
    editar   : true,
    eliminar : false,
    estado   : 'ACTIVO'
  },
  {
    id       : '9d6e3afa-2efe-44fa-b08c-4d45778ce003',
    menu_id  : '61d6d53b-ac65-41ac-bc54-3228f548f40a',
    rol_id   : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    ver      : true,
    agregar  : true,
    editar   : true,
    eliminar : false,
    estado   : 'ACTIVO'
  },
  {
    id       : '9d6e3afa-2efe-44fa-b08c-4d45778ce004',
    menu_id  : 'ef6b99d0-0834-4d1e-86b0-207111744f98',
    rol_id   : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    ver      : true,
    agregar  : true,
    editar   : true,
    eliminar : false,
    estado   : 'ACTIVO'
  },
  {
    id       : '9d6e3afa-2efe-44fa-b08c-4d45778ce005',
    menu_id  : '6dc27435-bb49-48c8-b98d-ed9024d10ec5',
    rol_id   : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    ver      : true,
    agregar  : true,
    editar   : true,
    eliminar : false,
    estado   : 'ACTIVO'
  },
  {
    id       : '9d6e3afa-2efe-44fa-b08c-4d45778ce006',
    menu_id  : 'a0882ff9-0d95-4d60-835d-85624f7a3469',
    rol_id   : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    ver      : true,
    agregar  : true,
    editar   : true,
    eliminar : false,
    estado   : 'ACTIVO'
  },
  {
    id       : '9d6e3afa-2efe-44fa-b08c-4d45778ce007',
    menu_id  : 'a0882ff9-0d95-4d60-835d-85624f7a3411',
    rol_id   : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    ver      : true,
    agregar  : true,
    editar   : true,
    eliminar : false,
    estado   : 'ACTIVO'
  },
  {
    id       : '9d6e3afa-2efe-44fa-b08c-4d45778ce008',
    menu_id  : 'a0882ff9-0d95-4d60-835d-85624f7a3412',
    rol_id   : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    ver      : true,
    agregar  : true,
    editar   : true,
    eliminar : false,
    estado   : 'ACTIVO'
  },
  {
    id       : '9d6e3afa-2efe-44fa-b08c-4d45778ce009',
    menu_id  : 'a0882ff9-0d95-4d60-835d-85624f7a3413',
    rol_id   : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    ver      : true,
    agregar  : true,
    editar   : true,
    eliminar : false,
    estado   : 'ACTIVO'
  },
  {
    id       : '9d6e3afa-2efe-44fa-b08c-4d45778ce010',
    menu_id  : 'a0882ff9-0d95-4d60-835d-85624f7a3414',
    rol_id   : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    ver      : true,
    agregar  : true,
    editar   : true,
    eliminar : false,
    estado   : 'ACTIVO'
  },
  {
    id       : '9d6e3afa-2efe-44fa-b08c-4d45778ce011',
    menu_id  : 'a0882ff9-0d95-4d60-835d-85624f7a3415',
    rol_id   : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    ver      : true,
    agregar  : true,
    editar   : true,
    eliminar : false,
    estado   : 'ACTIVO'
  },
  {
    id       : '9d6e3afa-2efe-44fa-b08c-4d45778ce012',
    menu_id  : 'a0882ff9-0d95-4d60-835d-85624f7a3416',
    rol_id   : '88b0104c-1bd1-42b2-bb01-9bf0502bab5a',
    ver      : true,
    agregar  : true,
    editar   : true,
    eliminar : false,
    estado   : 'ACTIVO'
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('permiso', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },

  down (queryInterface, Sequelize) {}
};
