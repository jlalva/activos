'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id          : util.pk,
    razonSocial : {
      type      : DataTypes.STRING(250),
      allowNull : false,
      xlabel    : lang.t('fields.razonSocial'),
      field     : 'razon_social'
    },
    ruc: {
      type      : DataTypes.STRING(20),
      allowNull : true,
      xlabel    : lang.t('fields.ruc'),
      field     : 'ruc'
    },
    siglas: {
      type      : DataTypes.STRING(15),
      allowNull : true,
      xlabel    : lang.t('fields.siglas'),
      field     : 'siglas'
    },
    ubigeoId: {
      type      : DataTypes.UUID,
      allowNull : true,
      xlabel    : lang.t('fields.idUbigeo'),
      field     : 'ubigeo_id'
    },
    direccion: {
      type      : DataTypes.TEXT,
      allowNull : true,
      xlabel    : lang.t('fields.direccion'),
      field     : 'direccion'
    },
    telefono: {
      type      : DataTypes.STRING(80),
      allowNull : true,
      field     : 'telefono'
    },
    fechaFundacion: {
      type      : DataTypes.DATEONLY,
      allowNull : true,
      xlabel    : lang.t('fields.fechaFundacion'),
      field     : 'fecha_fundacion'
    },
    logo: {
      type      : DataTypes.STRING(200),
      allowNull : true,
      xlabel    : lang.t('fields.logo'),
      field     : 'logo'
    },
    banner: {
      type      : DataTypes.STRING(200),
      allowNull : true,
      xlabel    : lang.t('fields.banner'),
      field     : 'banner'
    },
    fechaRegistro: {
      type      : DataTypes.DATEONLY,
      allowNull : true,
      xlabel    : lang.t('fields.fechaRegistro'),
      field     : 'fecha_registro'
    },
    descripcion: {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.descripcion'),
      field  : 'descripcion'
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

  const Empresa = sequelize.define('empresa', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'empresa'
  });

  return Empresa;
};
