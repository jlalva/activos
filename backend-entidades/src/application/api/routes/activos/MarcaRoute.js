'use strict';

module.exports = function setupParametro (api, controllers, middlewares) {
  const { MarcaController } = controllers;

  api.get('/marca', MarcaController.findAll);

  api.get('/marca/:id', MarcaController.findOne);

  api.post('/marca', MarcaController.createItem);

  api.put('/marca/:id', MarcaController.updateItem);

  api.delete('/marca/:id', MarcaController.deleteItem);

  return api;
};
