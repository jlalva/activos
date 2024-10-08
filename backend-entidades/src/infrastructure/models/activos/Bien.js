'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id          : util.pk,
    categoriaId : {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.categoriaId'),
      field  : 'categoria_id'
    },
    marcaId: {
      type   : DataTypes.UUID,
      xlabel : lang.t('fields.marcaId'),
      field  : 'marca_id'
    },
    nombre: {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.nombre'),
      field  : 'nombre'
    },
    modelo: {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.modelo'),
      field  : 'modelo'
    },
    serial: {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.serial'),
      field  : 'serial'
    },
    costo: {
      type   : DataTypes.DOUBLE,
      xlabel : lang.t('fields.costo'),
      field  : 'costo'
    },
    color: {
      type   : DataTypes.STRING(200),
      xlabel : lang.t('fields.color'),
      field  : 'color'
    },
    fechaCompra: {
      type   : DataTypes.DATE,
      xlabel : lang.t('fields.fechaCompra'),
      field  : 'fecha_compra'
    },
    fechaAlta: {
      type   : DataTypes.DATE,
      xlabel : lang.t('fields.fechaAlta'),
      field  : 'fecha_alta'
    },
    fechaBaja: {
      type   : DataTypes.DATE,
      xlabel : lang.t('fields.fechaBaja'),
      field  : 'fecha_baja'
    },
    motivoBaja: {
      type   : DataTypes.TEXT,
      xlabel : lang.t('fields.motivoBaja'),
      field  : 'motivo_baja'
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

  const Bien = sequelize.define('bien', fields, {
    paranoid   : true,
    timestamps : true,
    tableName  : 'bien'
  });

  return Bien;
};
