'use strict';

module.exports = function setupParametro (api, controllers, middlewares) {
  const { CategoriaController } = controllers;

  api.get('/categoria', CategoriaController.findAll);

  api.get('/categoria/:id', CategoriaController.findOne);

  api.post('/categoria', CategoriaController.createItem);

  api.put('/categoria/:id', CategoriaController.updateItem);

  api.delete('/categoria/:id', CategoriaController.deleteItem);

  return api;
};
