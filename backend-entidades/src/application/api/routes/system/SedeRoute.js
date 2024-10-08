'use strict';

module.exports = function setupParametro (api, controllers, middlewares) {
  const { SedeController } = controllers;

  api.get('/sede', SedeController.findAll);

  api.get('/sede/:id', SedeController.findOne);

  api.post('/sede', SedeController.createItem);

  api.put('/sede/:id', SedeController.updateItem);

  api.delete('/sede/:id', SedeController.deleteItem);

  return api;
};
