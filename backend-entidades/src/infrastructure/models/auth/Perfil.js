'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id        : util.pk,
    personaId : {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.personaId'),
      field  : 'persona_id'
    },
    rolId: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.rolId'),
      field  : 'rol_id'
    },
    cargoId: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.cargoId'),
      field  : 'cargo_id'
    },
    unidadId: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.unidadId'),
      field  : 'unidad_id'
    },
    fechaAlta: {
      type   : DataTypes.DATEONLY,
      xlabel : lang.t('fields.fechaAlta'),
      field  : 'fecha_alta'
    },
    fechaBaja: {
      type   : DataTypes.DATEONLY,
      xlabel : lang.t('fields.fechaBaja'),
      field  : 'fecha_baja'
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

  const Perfil = sequelize.define('perfil', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'perfil'
  });

  return Perfil;
};
