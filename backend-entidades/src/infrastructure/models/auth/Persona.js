'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id     : util.pk,
    codigo : {
      type   : DataTypes.STRING(50),
      xlabel : lang.t('fields.personaId'),
      field  : 'codigo'
    },
    apellidoPaterno: {
      type   : DataTypes.STRING(50),
      xlabel : lang.t('fields.apellidoPaterno'),
      field  : 'apellido_paterno'
    },
    apellidoMaterno: {
      type   : DataTypes.STRING(50),
      xlabel : lang.t('fields.apellidoMaterno'),
      field  : 'apellido_materno'
    },
    nombres: {
      type   : DataTypes.STRING(50),
      xlabel : lang.t('fields.nombres'),
      field  : 'nombres'
    },
    iniciales: {
      type   : DataTypes.STRING(10),
      xlabel : lang.t('fields.iniciales'),
      field  : 'iniciales'
    },
    generoId: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.generoId'),
      field  : 'genero_id'
    },
    profesionId: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.profesionId'),
      field  : 'profesion_id'
    },
    fechaNacimiento: {
      type   : DataTypes.DATEONLY,
      xlabel : lang.t('fields.fechaNacimiento'),
      field  : 'fecha_nacimiento'
    },
    dni: {
      type   : DataTypes.STRING(20),
      xlabel : lang.t('fields.dni'),
      field  : 'dni'
    },
    ubigeoId: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.ubigeoId'),
      field  : 'ubigeo_id'
    },
    direccion: {
      type   : DataTypes.STRING(500),
      xlabel : lang.t('fields.direccion'),
      field  : 'direccion'
    },
    celular: {
      type   : DataTypes.STRING(20),
      xlabel : lang.t('fields.celular'),
      field  : 'celular'
    },
    correo: {
      type   : DataTypes.STRING(100),
      xlabel : lang.t('fields.correo'),
      field  : 'correo'
    },
    usuario: {
      type   : DataTypes.STRING(50),
      xlabel : lang.t('fields.usuario'),
      field  : 'usuario'
    },
    clave: {
      type   : DataTypes.STRING(500),
      xlabel : lang.t('fields.clave'),
      field  : 'clave'
    },
    fechaRegistro: {
      type   : DataTypes.DATEONLY,
      xlabel : lang.t('fields.fechaRegistro'),
      field  : 'fecha_registro'
    },
    fechaUltimoAcceso: {
      type   : DataTypes.DATE,
      xlabel : lang.t('fields.fechaUltimoAcceso'),
      field  : 'fecha_ultimo_acceso'
    },
    estado: {
      type         : DataTypes.ENUM,
      allowNull    : true,
      values       : ['ACTIVO', 'INACTIVO'],
      defaultValue : 'ACTIVO',
      xlabel       : lang.t('fields.estado'),
      field        : 'estado'
    }
  };

  fields = util.setTimestamps(fields);

  const Persona = sequelize.define('persona', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'persona'
  });

  return Persona;
};
