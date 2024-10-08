'use strict';
const { saltRounds } = require('../../common/config/auth');
const { setTimestampsSeeder } = require('../lib/util');
const bcrypt = require('bcrypt');

// Datos de producción
let items = [
  {
    id                  : '40c3ddc2-e839-451d-95c9-a259ea781000',
    codigo              : 'CODIGO-PER001',
    apellido_paterno    : 'BRITO',
    apellido_materno    : 'DELGADO',
    nombres             : 'ALAN',
    iniciales           : 'ABD',
    genero_id           : '78d19520-f192-443a-a48a-7e8871e31000',
    profesion_id        : '60c3ddc2-e839-451d-95c9-a259ea781751',
    fecha_nacimiento    : '1990-01-01',
    dni                 : '78787888',
    ubigeo_id           : '78d19520-f192-443a-a48a-7e8871e398d1',
    direccion           : 'DIRECCION FICTICIA',
    celular             : '73838383',
    correo              : 'demo.persona@yopmail.com',
    usuario             : 'admin',
    clave               : bcrypt.hashSync('Developer', saltRounds),
    fecha_registro      : new Date(),
    fecha_ultimo_acceso : '2010-01-01',
    estado              : 'ACTIVO'
  },
  {
    id                  : '40c3ddc2-e839-451d-95c9-a259ea781001',
    codigo              : 'CODIGO-PER002',
    apellido_paterno    : 'DEL CAMPO',
    apellido_materno    : 'CERDA',
    nombres             : 'SOYLA',
    iniciales           : 'SLCDC',
    genero_id           : '78d19520-f192-443a-a48a-7e8871e31001',
    profesion_id        : '40c3ddc2-e839-451d-95c9-a259ea781752',
    fecha_nacimiento    : '1991-12-01',
    dni                 : '78787899',
    ubigeo_id           : '78d19520-f192-443a-a48a-7e8871e398d1',
    direccion           : 'DIRECCION FICTICIA',
    celular             : '76767676',
    correo              : 'soyla@yopmail.com',
    usuario             : 'soyla',
    clave               : bcrypt.hashSync('Developer', saltRounds),
    fecha_registro      : new Date(),
    fecha_ultimo_acceso : '2010-01-01',
    estado              : 'ACTIVO'
  },
  {
    id                  : '40c3ddc2-e839-451d-95c9-a259ea781003',
    codigo              : 'CODIGO-PTC003',
    apellido_paterno    : 'DEL CAMPO',
    apellido_materno    : 'TICONA',
    nombres             : 'PALANGAS',
    iniciales           : 'SLCDC',
    genero_id           : '78d19520-f192-443a-a48a-7e8871e31001',
    profesion_id        : '40c3ddc2-e839-451d-95c9-a259ea781752',
    fecha_nacimiento    : '1991-12-01',
    dni                 : '78787899',
    ubigeo_id           : '78d19520-f192-443a-a48a-7e8871e398d1',
    direccion           : 'DIRECCION FICTICIA',
    celular             : '76767676',
    correo              : 'palangas@yopmail.com',
    usuario             : 'palangas',
    clave               : bcrypt.hashSync('Developer', saltRounds),
    fecha_registro      : new Date(),
    fecha_ultimo_acceso : '2010-01-01',
    estado              : 'ACTIVO'
  }
];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert('persona', items, {})
      .then(async () => {})
      .catch((error) => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
