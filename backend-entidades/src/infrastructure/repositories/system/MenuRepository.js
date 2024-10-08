'use strict';

const { getQuery, toJSON } = require('../../lib/util');
const Repository = require('../Repository');

module.exports = function MenuRepository (models, Sequelize) {
  const { Menu } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    const query = getQuery(params);
    query.where = { ruta: { [Op.ne]: null } };
    query.order = [['nombre', 'ASC']];

    const result = await Menu.findAndCountAll(query);
    return toJSON(result);
  }

  const getSubMenusRecursive = async (menu, menusConPermiso) => {
    const query = {
      menuPadreId: menu.id
    };
    if (menusConPermiso.length > 0) {
      query.id = menusConPermiso;
    }
    const subMenus = await Menu.findAll({
      where : query,
      raw   : true
    });

    if (subMenus.length > 0) {
      const promises = [];
      subMenus.forEach(menu => {
        promises.push(getSubMenusRecursive(menu, menusConPermiso));
      });
      menu.subMenus = await Promise.all(promises);
    } else menu.subMenus = [];
    return menu;
  };

  const getSubMenus = async (idsMenuPadre, idsMenusConPermiso) => {
    const query = {};
    query.where = { id: idsMenuPadre };
    query.attributes = ['id', 'nombre', 'icono', 'ruta', 'descripcion'];
    query.include = [
      {
        attributes : ['id', 'nombre', 'icono', 'ruta', 'descripcion'],
        model      : Menu,
        as         : 'submenus',
        required   : false,
        where      : {
          id: idsMenusConPermiso
        }
      }
    ];

    const result = await Menu.findAll(query);
    return result;
  };

  const getMenusPadres = async () => {
    const query = {};
    query.where = { menuPadreId: null };
    query.attributes = ['id', 'nombre'];

    const result = await Menu.findAll(query);
    return result;
  };

  return {
    findAll,
    findOne        : params => Repository.findOne(params, Menu),
    findById       : id => Repository.findById(id, Menu),
    createOrUpdate : (item, t) => Repository.createOrUpdate(item, Menu, t),
    deleteItem     : (id, t) => Repository.deleteItem(id, Menu, t),
    getSubMenusRecursive,
    getMenusPadres,
    getSubMenus
  };
};
