'use strict';

module.exports = function setupParametro (api, controllers, middlewares) {
  const { GrupoController } = controllers;

  api.get('/grupo', GrupoController.findAll);

  api.get('/grupo/:id', GrupoController.findOne);

  api.post('/grupo', GrupoController.createItem);

  api.put('/grupo/:id', GrupoController.updateItem);

  api.delete('/grupo/:id', GrupoController.deleteItem);

  return api;
};
