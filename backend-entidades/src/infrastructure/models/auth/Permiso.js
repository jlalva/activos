'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id     : util.pk,
    menuId : {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.menuId'),
      field  : 'menu_id'
    },
    rolId: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.rolId'),
      field  : 'rol_id'
    },
    ver: {
      type   : DataTypes.BOOLEAN,
      xlabel : lang.t('fields.ver')
    },
    agregar: {
      type   : DataTypes.BOOLEAN,
      xlabel : lang.t('fields.agregar')
    },
    editar: {
      type   : DataTypes.BOOLEAN,
      xlabel : lang.t('fields.editar')
    },
    eliminar: {
      type   : DataTypes.BOOLEAN,
      xlabel : lang.t('fields.eliminar')
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

  const Permiso = sequelize.define('permiso', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'permiso'
  });

  return Permiso;
};
