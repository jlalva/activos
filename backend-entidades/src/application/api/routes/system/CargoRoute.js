'use strict';

module.exports = function setupParametro (api, controllers, middlewares) {
  const { CargoController } = controllers;

  api.get('/cargo', CargoController.findAll);

  api.get('/cargo/:id', CargoController.findOne);

  api.post('/cargo', CargoController.createItem);

  api.put('/cargo/:id', CargoController.updateItem);

  api.delete('/cargo/:id', CargoController.deleteItem);

  return api;
};
