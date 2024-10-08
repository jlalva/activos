'use strict';

module.exports = function setupParametro (api, controllers, middlewares) {
  const { ModeloController } = controllers;

  api.get('/modelo', ModeloController.findAll);

  api.get('/modelo/:id', ModeloController.findOne);

  api.post('/modelo', ModeloController.createItem);

  api.put('/modelo/:id', ModeloController.updateItem);

  api.delete('/modelo/:id', ModeloController.deleteItem);

  return api;
};
