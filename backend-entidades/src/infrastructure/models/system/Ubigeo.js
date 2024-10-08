'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id             : util.pk,
    departamentoId : {
      type      : DataTypes.STRING(10),
      allowNull : false,
      xlabel    : lang.t('fields.idDepartamento'),
      field     : 'departamento_id'
    },
    provinciaId: {
      type      : DataTypes.STRING(10),
      allowNull : false,
      xlabel    : lang.t('fields.idProvincia'),
      field     : 'provincia_id'
    },
    distritoId: {
      type      : DataTypes.STRING(10),
      allowNull : false,
      xlabel    : lang.t('fields.idDistrito'),
      field     : 'distrito_id'
    },
    departamento: {
      type      : DataTypes.STRING(100),
      allowNull : true,
      xlabel    : lang.t('fields.departamento'),
      field     : 'departamento'
    },
    provincia: {
      type      : DataTypes.STRING(100),
      allowNull : true,
      xlabel    : lang.t('fields.provincia'),
      field     : 'provincia'
    },
    distrito: {
      type      : DataTypes.STRING(100),
      allowNull : true,
      xlabel    : lang.t('fields.distrito'),
      field     : 'distrito'
    },
    estado: {
      type         : DataTypes.ENUM,
      allowNull    : false,
      values       : ['ACTIVO', 'INACTIVO'],
      defaultValue : 'ACTIVO',
      xlabel       : lang.t('fields.estado'),
      field        : 'estado'
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Ubigeo = sequelize.define('ubigeo', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'ubigeo'
  });

  return Ubigeo;
};
