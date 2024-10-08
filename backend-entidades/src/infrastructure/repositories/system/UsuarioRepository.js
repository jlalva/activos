'use strict';

const { getQuery, errorHandler, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function usuariosRepository (models, Sequelize) {
  const Op = Sequelize.Op;
  const {
    Persona,
    Rol,
    Unidad,
    Profesion,
    Perfil,
    Cargo,
    Permiso,
    Menu
  } = models;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.attributes = [
      'id',
      'idEmpresa',
      'idRol',
      'idTipoDocumento',
      'nroDocumento',
      'nombres',
      'apellidos',
      'fechaNacimiento',
      'contrasena',
      'telefono',
      'email',
      'direccion',
      'ciudad',
      'provinciaEstado',
      'pais',
      'codigoPostal',
      'cargo',
      'tipo',
      'numeroFiscal',
      'nombreFiscal',
      'imagenUrl',
      'colorFondo',
      'colorTexto',
      'token',
      'estado'
    ];
    query.where = {};
    console.log(params);
    if (params.exclude) {
      query.where.id = {
        [Op.notIn]: Array.isArray(params.exclude)
          ? params.exclude
          : [params.exclude]
      };
    }

    if (params.estado) {
      query.where.estado = params.estado;
    }

    if (params.search) {
      query.where = {
        ...query.where,
        [Op.or]: [
          {
            nombres: {
              [Op.iLike]: `%${params.search}%`
            }
          },
          {
            apellidos: {
              [Op.iLike]: `%${params.search}%`
            }
          }
        ]
      };
    }

    if (params.nombres) {
      query.where.nombres = {
        [Op.iLike]: `%${params.nombres}%`
      };
    }

    if (params.apellidos) {
      query.where.primerApellido = {
        [Op.iLike]: `%${params.primerApellido}%`
      };
    }

    if (params.nroDocumento) {
      query.where.nroDocumento = {
        [Op.iLike]: `%${params.nroDocumento}%`
      };
    }

    if (params.email) {
      query.where.email = {
        [Op.iLike]: `%${params.email}%`
      };
    }

    if (params.telefono) {
      query.where.telefono = {
        [Op.iLike]: `%${params.telefono}%`
      };
    }

    query.include = [
      {
        attributes : ['id', 'numeroDocumento', 'nombreEmpresa'],
        model      : empresa,
        as         : 'empresa'
      },
      {
        model : rol,
        as    : 'rol'
      }
    ];

    const result = await Persona.findAndCountAll(query);
    return toJSON(result);
  }

  async function findAllByIdEmpresa (params = {}) {
    // const query = getQuery(params);
    const query = {};
    query.attributes = [
      'id',
      'idEmpresa',
      'idRol',
      'idTipoDocumento',
      'nroDocumento',
      'nombres',
      'apellidos',
      'fechaNacimiento',
      'contrasena',
      'telefono',
      'email',
      'direccion',
      'ciudad',
      'provinciaEstado',
      'pais',
      'codigoPostal',
      'cargo',
      'tipo',
      'numeroFiscal',
      'nombreFiscal',
      'imagenUrl',
      'colorFondo',
      'colorTexto',
      'token',
      'estado'
    ];
    query.where = {};
    if (params.exclude) {
      query.where.id = {
        [Op.notIn]: Array.isArray(params.exclude)
          ? params.exclude
          : [params.exclude]
      };
    }

    if (params.estado) {
      query.where.estado = params.estado;
    }

    if (params.search) {
      query.where = {
        ...query.where,
        [Op.or]: [
          {
            nombres: {
              [Op.iLike]: `%${params.search}%`
            }
          },
          {
            apellidos: {
              [Op.iLike]: `%${params.search}%`
            }
          }
        ]
      };
    }

    if (params.nombres) {
      query.where.nombres = {
        [Op.iLike]: `%${params.nombres}%`
      };
    }

    if (params.apellidos) {
      query.where.primerApellido = {
        [Op.iLike]: `%${params.primerApellido}%`
      };
    }

    if (params.nroDocumento) {
      query.where.nroDocumento = {
        [Op.iLike]: `%${params.nroDocumento}%`
      };
    }

    if (params.email) {
      query.where.email = {
        [Op.iLike]: `%${params.email}%`
      };
    }

    if (params.telefono) {
      query.where.telefono = {
        [Op.iLike]: `%${params.telefono}%`
      };
    }

    query.where = {
      idEmpresa: params
    };

    query.include = [
      {
        attributes : ['id', 'numeroDocumento', 'nombreEmpresa'],
        model      : empresa,
        as         : 'empresa'
      },
      {
        model : rol,
        as    : 'rol'
      }
    ];
    const result = await Persona.findAndCountAll(query);
    return toJSON(result);
  }

  async function findOne (params = {}) {
    const query = {};
    query.attributes = [
      'id',
      'idEmpresa',
      'idRol',
      'idTipoDocumento',
      'nroDocumento',
      'nombres',
      'apellidos',
      'fechaNacimiento',
      'contrasena',
      'telefono',
      'email',
      'direccion',
      'ciudad',
      'provinciaEstado',
      'pais',
      'codigoPostal',
      'cargo',
      'tipo',
      'numeroFiscal',
      'nombreFiscal',
      'imagenUrl',
      'colorFondo',
      'colorTexto',
      'token',
      'estado'
    ];

    query.where = params;

    query.include = [
      {
        attributes : ['id', 'numeroDocumento', 'nombreEmpresa', 'estado'],
        model      : empresa,
        as         : 'empresa'
      },
      {
        attributes : ['id', 'idEmpresa', 'nombre', 'descripcion', 'estado'],
        model      : rol,
        as         : 'rol'
      }
    ];

    const result = await Persona.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  async function findByCi (params = {}) {
    const query = {};

    query.where = params;

    query.include = [
      {
        attributes : ['id', 'numeroDocumento', 'nombreEmpresa', 'estado'],
        model      : empresa,
        as         : 'empresa'
      },
      {
        required   : true,
        through    : { attributes: [] },
        attributes : ['id', 'idEmpresa', 'nombre', 'descripcion', 'estado'],
        model      : rol,
        as         : 'roles'
      }
    ];

    const result = await Persona.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  async function login (params = {}) {
    const query = {};

    query.where = params;

    query.include = [
      {
        model : Profesion,
        as    : 'profesion'
      },
      {
        model   : Perfil,
        as      : 'perfiles',
        include : [
          {
            model : Cargo,
            as    : 'cargo'
          },
          {
            model   : Rol,
            as      : 'rol',
            include : [
              {
                require : false,
                model   : Permiso,
                as      : 'permisos',
                include : [
                  {
                    require : false,
                    model   : Menu,
                    as      : 'menu'
                  }
                ]
              }
            ]
          },
          {
            model : Unidad,
            as    : 'unidad'
          }
        ]
      }
    ];

    const result = await Persona.findOne(query);

    if (result) {
      return result.toJSON();
    }
    return null;
  }

  async function findById (id) {
    const query = {};

    query.where = {
      id,
      estado: 'ACTIVO'
    };

    const result = await Persona.findOne(query);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  async function createOrUpdate (usuarioParam, t) {
    const cond = {
      where: {
        id: usuarioParam.id || null
      }
    };

    const item = await Persona.findOne(cond);

    if (item) {
      let updated;
      try {
        if (t) {
          cond.transaction = t;
        }
        updated = await Persona.update(usuarioParam, cond);
      } catch (e) {
        errorHandler(e);
      }
      const result = updated ? await Persona.findOne(cond) : item;

      if (result) {
        return result.toJSON();
      }
      return null;
    }

    let result;
    try {
      result = await Persona.create(usuarioParam, t ? { transaction: t } : {});
    } catch (e) {
      errorHandler(e);
    }
    return result.toJSON();
  }

  return {
    findByCi,
    login,
    findById,
    findAll,
    findAllByIdEmpresa,
    findOne,
    createOrUpdate,
    deleteItem: (id, t) => Repository.deleteItem(id, Persona, t)
  };
};
