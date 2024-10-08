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

  const Categoria = sequelize.define('categoria', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'categoria'
  });

  return Categoria;
};
