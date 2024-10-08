'use strict';

module.exports = function setupRol (api, controllers, middlewares) {
  const { RolController } = controllers;

  api.get('/rol', RolController.findAll);

  api.get('/rol/:id', RolController.findOne);

  api.post('/rol', RolController.createItem);

  api.put('/rol/:id', RolController.updateItem);

  api.delete('/rol/:id', RolController.deleteItem);

  return api;
};
