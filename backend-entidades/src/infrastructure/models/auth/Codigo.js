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
    correo: {
      type   : DataTypes.STRING(100),
      xlabel : lang.t('fields.correo')
    },
    fechaEnvio: {
      type   : DataTypes.DATE,
      xlabel : lang.t('fields.fechaEnvio'),
      field  : 'fecha_envio'
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

  const Codigo = sequelize.define('codigo', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'codigo'
  });

  return Codigo;
};
