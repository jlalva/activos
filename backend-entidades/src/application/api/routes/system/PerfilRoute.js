'use strict';

module.exports = function setupPerfil (api, controllers, middlewares) {
  const { PerfilController } = controllers;

  api.get('/perfil', PerfilController.findAll);

  api.get('/perfil/:id', PerfilController.findOne);

  api.post('/perfil', PerfilController.createItem);

  api.put('/perfil/:id', PerfilController.updateItem);

  api.delete('/perfil/:id', PerfilController.deleteItem);

  return api;
};
