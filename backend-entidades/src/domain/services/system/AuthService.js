'use strict';

const crypto = require('crypto');
const { ErrorApp } = require('../../lib/error');
const url = require('url');
const { config } = require('../../../common');
const { iss } = require('../../lib/util');
const { generateToken } = require('../../../application/lib/auth');
const moment = require('moment');
// const EmpresaRepository = require('../../../infrastructure/repositories/system/EmpresaRepository');

module.exports = function authService (repositories, helpers, res) {
  const {
    AuthRepository,
    UsuarioRepository,
    MenuRepository
  } = repositories;

  const getResponse = async (existePersona) => {
    const perfil = existePersona.perfiles[0];

    const datosToken = {
      idPersona : existePersona.id,
      idPerfil  : perfil.id
    };

    const token = await generateToken(datosToken);

    return {
      token,
      persona : existePersona,
      rol     : perfil.rol,
      cargo   : perfil.cargo,
      unidad  : perfil.unidad,
      menu    : perfil.rol.permisos.map(permiso => ({
        id       : permiso.menu.id,
        nombre   : permiso.menu.nombre,
        ruta     : permiso.menu.ruta,
        icono    : permiso.menu.icono,
        ver      : permiso.ver,
        agregar  : permiso.ver,
        editar   : permiso.editar,
        eliminar : permiso.eliminar
      }))
    };
  };

  const getMenusPadres = async () => {
    const menusPadres = await MenuRepository.getMenusPadres();
    return menusPadres.map((mp) => mp.id);
  };

  async function login (usuario, clave) {
    try {
      const existeUsuario = await UsuarioRepository.login({ usuario });

      if (!existeUsuario) throw new Error('Error al verificar el usuario o clave.');

      const respuestaVerificacion = await AuthRepository.verificarContrasena(clave, existeUsuario.clave);

      if (!respuestaVerificacion) throw new Error('Error en el usuario o clave.');

      if (existeUsuario.perfiles.length === 0) throw new Error('No se ha finalizado la habilitacion de su cuenta en el sistema');

      delete existeUsuario.clave;

      const respuesta = await getResponse(existeUsuario);

      const menusIdsConPermiso = respuesta.menu.map(menu => {
        return menu.id;
      });

      const menusPadres = await getMenusPadres();

      const menus = await MenuRepository.getSubMenus(menusPadres, menusIdsConPermiso);

      respuesta.menu = menus;
      console.log('RESPUESTAAAA:', respuesta.menu[1].submenus);

      return respuesta;
    } catch (err) {
      throw new ErrorApp(err.message, 400);
    }
  }

  return {
    login
  };
};
