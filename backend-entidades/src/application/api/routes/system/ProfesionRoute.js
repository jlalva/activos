'use strict';

module.exports = function setupParametro (api, controllers, middlewares) {
  const { ProfesionController } = controllers;

  api.get('/profesion', ProfesionController.findAll);

  api.get('/profesion/:id', ProfesionController.findOne);

  api.post('/profesion', ProfesionController.createItem);

  api.put('/profesion/:id', ProfesionController.updateItem);

  api.delete('/profesion/:id', ProfesionController.deleteItem);

  return api;
};
