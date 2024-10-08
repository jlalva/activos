'use strict';

module.exports = function setupUbigeo (api, controllers, middlewares) {
  const { UbigeoController } = controllers;

  api.get('/ubigeo', UbigeoController.findAll);

  api.get('/ubigeo/obtener-tipo', UbigeoController.findByType);

  api.get('/ubigeo/:id', UbigeoController.findOne);

  api.post('/ubigeo', UbigeoController.createItem);

  api.put('/ubigeo/:id', UbigeoController.updateItem);

  api.delete('/ubigeo/:id', UbigeoController.deleteItem);

  return api;
};
