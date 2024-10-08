'use strict';
const { config } = require('../../../../common');

module.exports = function setupAuth (api, controllers, middlewares) {
  const { AuthController } = controllers;

  return api;
};
