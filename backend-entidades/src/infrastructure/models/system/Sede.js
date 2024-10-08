'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id     : util.pk,
    nombre : {
      type   : DataTypes.STRING(50),
      xlabel : lang.t('fields.nombre'),
      field  : 'nombre'
    },
    descripcion: {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.descripcion'),
      field  : 'descripcion'
    },
    fechaRegistro: {
      type      : DataTypes.DATEONLY,
      allowNull : true,
      xlabel    : lang.t('fields.fechaRegistro'),
      field     : 'fecha_registro'
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

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Sede = sequelize.define('sede', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'sede'
  });

  return Sede;
};
