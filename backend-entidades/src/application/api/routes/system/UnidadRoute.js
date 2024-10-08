'use strict';

module.exports = function setupUnidad (api, controllers, middlewares) {
  const { UnidadController } = controllers;

  api.get('/unidad', UnidadController.findAll);

  api.get('/unidad/:id', UnidadController.findOne);

  api.post('/unidad', UnidadController.createItem);

  api.put('/unidad/:id', UnidadController.updateItem);

  api.delete('/unidad/:id', UnidadController.deleteItem);

  return api;
};
