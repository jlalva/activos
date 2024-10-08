'use strict';

const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  // DATOS MENU PRINCIPAL(NIVEL = 1)
  {
    id             : '6190597f-7fa6-4c39-bcc9-7a1441ba566a',
    nombre         : 'Dashboard',
    descripcion    : 'dashboard',
    ruta           : 'dashboard',
    icono          : 'dashboard',
    fecha_registro : new Date('2023-12-23'),
    menu_padre_id  : null,
    estado         : 'ACTIVO'
  },
  {
    id             : '6190597f-7fa6-4c39-bcc9-7a1441ba5660',
    nombre         : 'Configuración',
    descripcion    : 'configuracion',
    ruta           : null,
    icono          : 'settings',
    fecha_registro : new Date(),
    menu_padre_id  : null,
    estado         : 'ACTIVO'
  },
  {
    id             : '039a897a-76dd-44c1-b3d7-9682df8f5342',
    nombre         : 'Cargos',
    descripcion    : 'cargo',
    ruta           : 'cargo',
    icono          : 'badge',
    fecha_registro : new Date('2023-12-23'),
    menu_padre_id  : '6190597f-7fa6-4c39-bcc9-7a1441ba5660',
    estado         : 'ACTIVO'
  },
  {
    id             : '61d6d53b-ac65-41ac-bc54-3228f548f40a',
    nombre         : 'Profesión',
    descripcion    : 'Profesion',
    ruta           : 'Profesion',
    icono          : 'school',
    fecha_registro : new Date('2023-12-23'),
    menu_padre_id  : '6190597f-7fa6-4c39-bcc9-7a1441ba5660',
    estado         : 'ACTIVO'
  },
  {
    id             : 'ef6b99d0-0834-4d1e-86b0-207111744f98',
    nombre         : 'Empresa',
    descripcion    : 'empresa',
    ruta           : 'empresa',
    icono          : 'apartment',
    fecha_registro : new Date('2023-12-23'),
    menu_padre_id  : '6190597f-7fa6-4c39-bcc9-7a1441ba5660',
    estado         : 'ACTIVO'
  },
  {
    id             : '6dc27435-bb49-48c8-b98d-ed9024d10ec5',
    nombre         : 'Grupo',
    descripcion    : 'grupo',
    ruta           : 'grupo',
    icono          : 'group',
    fecha_registro : new Date('2023-12-23'),
    menu_padre_id  : '6190597f-7fa6-4c39-bcc9-7a1441ba5660',
    estado         : 'ACTIVO'
  },
  {
    id             : 'a0882ff9-0d95-4d60-835d-85624f7a3469',
    nombre         : 'Sede',
    descripcion    : 'sede',
    ruta           : 'sede',
    icono          : 'business',
    fecha_registro : new Date('2023-12-23'),
    menu_padre_id  : '6190597f-7fa6-4c39-bcc9-7a1441ba5660',
    estado         : 'ACTIVO'
  },
  {
    id             : 'a0882ff9-0d95-4d60-835d-85624f7a3411',
    nombre         : 'Ubicación',
    descripcion    : 'ubigeo',
    ruta           : 'ubigeo',
    icono          : 'travel_explore',
    fecha_registro : new Date('2023-12-23'),
    menu_padre_id  : '6190597f-7fa6-4c39-bcc9-7a1441ba5660',
    estado         : 'ACTIVO'
  },
  {
    id             : 'a0882ff9-0d95-4d60-835d-85624f7a3412',
    nombre         : 'Unidad',
    descripcion    : 'unidad',
    ruta           : 'unidad',
    icono          : 'lan',
    fecha_registro : new Date('2023-12-23'),
    menu_padre_id  : '6190597f-7fa6-4c39-bcc9-7a1441ba5660',
    estado         : 'ACTIVO'
  },
  {
    id             : 'a0882ff9-0d95-4d60-835d-85624f7a3413',
    nombre         : 'Persona',
    descripcion    : 'persona',
    ruta           : 'persona',
    icono          : 'emoji_people',
    fecha_registro : new Date('2023-12-23'),
    menu_padre_id  : '6190597f-7fa6-4c39-bcc9-7a1441ba5660',
    estado         : 'ACTIVO'
  },
  {
    id             : 'a0882ff9-0d95-4d60-835d-85624f7a3414',
    nombre         : 'Perfil',
    descripcion    : 'perfil',
    ruta           : 'perfil',
    icono          : 'account_circle',
    fecha_registro : new Date('2023-12-23'),
    menu_padre_id  : '6190597f-7fa6-4c39-bcc9-7a1441ba5660',
    estado         : 'ACTIVO'
  },
  {
    id             : 'a0882ff9-0d95-4d60-835d-85624f7a3415',
    nombre         : 'Menú',
    descripcion    : 'menu',
    ruta           : 'menu',
    icono          : 'menu',
    fecha_registro : new Date('2023-12-23'),
    menu_padre_id  : '6190597f-7fa6-4c39-bcc9-7a1441ba5660',
    estado         : 'ACTIVO'
  },
  {
    id             : 'a0882ff9-0d95-4d60-835d-85624f7a3416',
    nombre         : 'Rol',
    descripcion    : 'rol',
    ruta           : 'rol',
    icono          : 'engineering',
    fecha_registro : new Date('2023-12-23'),
    menu_padre_id  : '6190597f-7fa6-4c39-bcc9-7a1441ba5660',
    estado         : 'ACTIVO'
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('menu', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },

  down (queryInterface, Sequelize) {}
};
