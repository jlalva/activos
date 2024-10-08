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

  const Rol = sequelize.define('rol', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'rol'
  });

  return Rol;
};
