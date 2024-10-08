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
    icono: {
      type   : DataTypes.STRING(20),
      xlabel : lang.t('fields.icono'),
      field  : 'icono'
    },
    ruta: {
      type   : DataTypes.STRING(50),
      xlabel : lang.t('fields.ruta'),
      field  : 'ruta'
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
    menuPadreId: {
      type      : DataTypes.UUID,
      allowNull : true,
      xlabel    : lang.t('fields.menuPadreId'),
      field     : 'menu_padre_id'
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

  const Menu = sequelize.define('menu', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'menu'
  });

  return Menu;
};
