'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id        : util.pk,
    empresaId : {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idEmpresa'),
      field     : 'empresa_id'
    },
    grupoId: {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idGrupo'),
      field     : 'grupo_id'
    },
    sedeId: {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idSede'),
      field     : 'sede_id'
    },
    nombre: {
      type      : DataTypes.STRING(100),
      allowNull : false,
      xlabel    : lang.t('fields.nombre'),
      field     : 'nombre'
    },
    abreviado: {
      type      : DataTypes.STRING(10),
      allowNull : false,
      xlabel    : lang.t('fields.abreviado'),
      field     : 'abreviado'
    },
    representante: {
      type      : DataTypes.STRING(100),
      allowNull : false,
      xlabel    : lang.t('fields.representante'),
      field     : 'representante'
    },
    cargo: {
      type      : DataTypes.STRING(100),
      allowNull : false,
      xlabel    : lang.t('fields.cargo'),
      field     : 'cargo'
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

  const Unidad = sequelize.define('unidad', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'unidad'
  });

  return Unidad;
};
