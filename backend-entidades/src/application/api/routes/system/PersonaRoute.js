'use strict';

module.exports = function setupUnidad (api, controllers, middlewares) {
  const { PersonaController } = controllers;

  api.get('/persona', PersonaController.findAll);

  api.get('/persona/:id', PersonaController.findOne);

  api.patch('/persona/:id/reestablecer-contrasena', PersonaController.resetPassword);

  api.post('/persona', PersonaController.createItem);

  api.put('/persona/:id', PersonaController.updateItem);

  api.delete('/persona/:id', PersonaController.deleteItem);

  return api;
};
