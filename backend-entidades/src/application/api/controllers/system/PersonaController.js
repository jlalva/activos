'use strict';
const { Respuesta } = require('../../../lib/respuesta');
const { Finalizado, HttpCodes } = require('../../../lib/globals');

module.exports = function setupPersonaController (services) {
  const { PersonaService } = services;

  async function findAll (req, res) {
    try {
      const respuesta = await PersonaService.findAll(req.query);

      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function findOne (req, res) {
    try {
      const params = { id: req.params.id };

      const respuesta = await PersonaService.findOne(params);

      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function resetPassword (req, res) {
    try {
      const existePersona = await PersonaService.findOne({ id: req.params.id });

      if (!existePersona) throw new Error('La persona no se puede encontrar');

      const datos = {
        id          : existePersona.id,
        clave       : req.body.clave || existePersona.dni,
        userUpdated : req.user.idUsuario
      };

      const respuesta = await PersonaService.createOrUpdate(datos);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function createItem (req, res) {
    try {
      const datos = req.body;

      datos.userCreated = req.user.idUsuario;

      const respuesta = await PersonaService.createOrUpdate(datos);
      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function updateItem (req, res) {
    try {
      const datos = req.body;

      datos.userUpdated = req.user.idUsuario;

      datos.id = req.params.id;

      const respuesta = await PersonaService.createOrUpdate(datos);

      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  async function deleteItem (req, res) {
    try {
      const respuesta = await PersonaService.deleteItem(req.params.id);

      return res.status(200).send(new Respuesta('OK', Finalizado.OK, respuesta));
    } catch (error) {
      return res.status(error.httpCode || HttpCodes.userError).json(new Respuesta(error.message, Finalizado.FAIL));
    }
  }

  return {
    resetPassword,
    findAll,
    findOne,
    createItem,
    updateItem,
    deleteItem
  };
};
