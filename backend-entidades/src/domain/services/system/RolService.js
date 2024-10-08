'use strict';

const { config } = require('../../../common');
const { ErrorApp } = require('../../lib/error');

module.exports = function MenuService (repositories, helpers, res) {
  const { RolRepository, PermisoRepository, MenuRepository, transaction } = repositories;

  async function findAll (params) {
    try {
      const cargos = await RolRepository.findAll(params);

      return cargos;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  const formatMenus = async (rol) => {
    if (rol.permisos) {
      const { rows: menus } = await MenuRepository.findAll();

      rol.menus = [];

      for (const menu of menus) {
        const existePermiso = rol.permisos.find(permiso => permiso.menuId === menu.id);

        rol.menus.push({
          id       : menu.id,
          nombre   : menu.nombre,
          icono    : menu.icono,
          ver      : existePermiso?.ver || false,
          agregar  : existePermiso?.agregar || false,
          editar   : existePermiso?.editar || false,
          eliminar : existePermiso?.eliminar || false
        });
      }
    }
  };

  async function findOne (params) {
    try {
      const rol = await RolRepository.findOne(params);

      if (!rol) throw new Error('La cargo no existe');

      await formatMenus(rol);

      return rol;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  async function createOrUpdate (datos) {
    let transaccion;
    try {
      transaccion = await transaction.create();

      const rol = await RolRepository.createOrUpdate(datos, transaccion);

      if (datos.menus) {
        await PermisoRepository.deleteItemCond({ rolId: rol.id }, transaccion);

        for (const menu of datos.menus) {
          if (menu.ver || menu.agregar || menu.editar || menu.eliminar) {
            await PermisoRepository.createOrUpdate({
              menuId      : menu.id,
              rolId       : rol.id,
              ver         : menu.ver,
              agregar     : menu.agregar,
              editar      : menu.editar,
              eliminar    : menu.eliminar,
              userCreated : datos.userCreated || datos.userUpdated
            }, transaccion);
          }
        }
      }

      await transaction.commit(transaccion);

      return rol;
    } catch (err) {
      await transaction.rollback(transaccion);

      throw new ErrorApp(err.message, 400);
    }
  }

  async function deleteItem (id) {
    try {
      const cargo = await RolRepository.deleteItem(id);

      return cargo;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    findAll,
    findOne,
    createOrUpdate,
    deleteItem
  };
};
