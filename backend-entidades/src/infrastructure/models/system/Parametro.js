'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id     : util.pk,
    codigo : {
      type      : DataTypes.STRING(100),
      allowNull : false,
      xlabel    : lang.t('fields.codigo'),
      field     : 'codigo'
    },
    nombre: {
      type      : DataTypes.STRING(100),
      allowNull : false,
      xlabel    : lang.t('fields.nombre'),
      field     : 'nombre'
    },
    grupo: {
      type      : DataTypes.STRING(100),
      allowNull : true,
      xlabel    : lang.t('fields.grupo'),
      field     : 'grupo'
    },
    descripcion: {
      type      : DataTypes.STRING(100),
      allowNull : true,
      xlabel    : lang.t('fields.descripcion'),
      field     : 'descripcion'
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

  const Parametro = sequelize.define('parametros', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'parametros'
  });

  return Parametro;
};
