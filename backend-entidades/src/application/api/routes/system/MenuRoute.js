'use strict';

module.exports = function setupMenu (api, controllers, middlewares) {
  const { MenuController } = controllers;

  api.get('/menu', MenuController.findAll);

  api.get('/menu/:id', MenuController.findOne);

  api.post('/menu', MenuController.createItem);

  api.put('/menu/:id', MenuController.updateItem);

  api.delete('/menu/:id', MenuController.deleteItem);

  api.get('/menus/padre', MenuController.getMenusPadres);

  return api;
};
