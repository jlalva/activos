'use strict';

module.exports = function setupEmpresa (api, controllers, middlewares) {
  const { EmpresaController } = controllers;

  api.get('/empresa', EmpresaController.findAll);

  api.get('/empresa/:id', EmpresaController.findOne);

  api.post('/empresa', EmpresaController.createItem);

  api.put('/empresa/:id', EmpresaController.updateItem);

  api.delete('/empresa/:id', EmpresaController.deleteItem);

  return api;
};
