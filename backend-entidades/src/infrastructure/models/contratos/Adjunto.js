'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id          : util.pk,
    idSolicitud : {
      type      : DataTypes.UUID,
      allowNull : false,
      xlabel    : lang.t('fields.idSolicitud'),
      field     : 'id_solicitud'
    },
    nombre: {
      type      : DataTypes.STRING(150),
      allowNull : false,
      xlabel    : lang.t('fields.nombre'),
      field     : 'nombre'

    },
    ruta: {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.ruta'),
      field  : 'ruta'
    },
    hash: {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.hash'),
      field  : 'hash'
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  const Adjunto = sequelize.define('adjunto', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'contratos_adjunto'
  });

  return Adjunto;
};
