'use strict';

module.exports = function setupParametro (api, controllers, middlewares) {
  const { BienController } = controllers;

  api.get('/bien', BienController.findAll);

  api.get('/bien/:id', BienController.findOne);

  api.post('/bien', BienController.createItem);

  api.put('/bien/:id', BienController.updateItem);

  api.delete('/bien/:id', BienController.deleteItem);

  return api;
};
