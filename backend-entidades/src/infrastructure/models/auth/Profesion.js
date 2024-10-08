'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id     : util.pk,
    nombre : {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.nombre'),
      field  : 'nombre'
    },
    sigla: {
      type   : DataTypes.STRING(20),
      xlabel : lang.t('fields.sigla')
    },
    descripcion: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.descripcion')
    },
    fechaRegistro: {
      type   : DataTypes.DATE,
      xlabel : lang.t('fields.fechaRegistro'),
      field  : 'fecha_registro'
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

  const Profesion = sequelize.define('profesion', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'profesion'
  });

  return Profesion;
};
