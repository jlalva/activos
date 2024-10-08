'use strict';

const { Respuesta } = require('../../../lib/respuesta');
const { Finalizado, HttpCodes } = require('../../../lib/globals');
const { enviar } = require('../../../../common/lib/mail');
const { URL_FRONTEND } = require('../../../../common/config/app');
const moment = require('moment');
const { tiempoValidezCodigo } = require('../../../../common/config/auth');

module.exports = function setupAuthController (services) {
  const { AuthService, PersonaService, CodigoService } = services;

  /**
   * Realiza la busqueda del la persona por usuario y por clave para retornar los datos de la persona y sus permisos
   * @param {*} req Objeto de peticion original del frontend
   * @param {*} res Objeto de respuesta para devolver datos al frontend
   * @returns Objeto de respuesta estandarizado con los datos de la persona, sus perfiles, roles y permisos
   */
  async function login (req, res) {
    try {
      const { usuario, clave } = req.body;

      if (!usuario || !clave) throw new Error('Error en el usuario y/o la contraseña.');

      const respuesta = await AuthService.login(usuario, clave);

      if (!respuesta)  throw new Error('Error en el usuario y/o la contraseña.');

      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function recuperarContrasena (req, res) {
    try {
      const { correo } = req.body;

      const persona = await PersonaService.findOne({ correo });

      if (!persona)  throw new Error(`La persona con el correo ${correo} no existe o no se encuentra habilitada.`);

      const codigoGenerado = await CodigoService.createOrUpdate({
        personaId  : persona.id,
        correo     : persona.correo,
        fechaEnvio : new Date(),
        horaEnvio  : null,
        duracion   : null,
        estado     : 'ACTIVO'
      });

      const url = `${URL_FRONTEND}/recuperar-contrasena?codigo=${codigoGenerado.id}`;

      const envioCorreo = await enviar({
        para    : persona.correo,
        titulo  : 'Recuperacion de contraseña',
        mensaje : 'Recuperacion de contraseña',
        html    : `
          Mensaje de recuperacion de contraseña

          Haga click en el siguiente enlace

          <a href="${url}">${url}</a>
        `,
        attachments: []
      });

      const respuesta = envioCorreo;

      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function cambiarContrasena (req, res) {
    try {
      const { contrasena, codigo } = req.body;

      if (!codigo) throw new Error('Error en el usuario y/o la contraseña.');

      const existeCodigo = await CodigoService.findOne({ id: codigo, estado: 'ACTIVO' });

      if (!codigo) throw new Error('Codigo no valido.');

      const tiempoNotificacion = moment().diff(moment(existeCodigo.createdAt, 'DD-MM-YYYY hh:mm:ss'), 'seconds');

      if (tiempoNotificacion > tiempoValidezCodigo) {
        await CodigoService.createOrUpdate({ id: existeCodigo.id, estado: 'INACTIVO' });

        throw new Error('El codigo ya expiro');
      }

      await PersonaService.createOrUpdate({ id: existeCodigo.personaId, clave: contrasena });

      await CodigoService.createOrUpdate({ id: existeCodigo.id, estado: 'INACTIVO' });

      return res.status(200).send(new Respuesta('OK', Finalizado.OK, true));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  return {
    recuperarContrasena,
    cambiarContrasena,
    login
  };
};
