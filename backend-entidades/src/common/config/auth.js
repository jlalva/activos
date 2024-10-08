'use strict';

const auth = {
  secret              : process.env.SECRET || 'BASE',
  algorithms          : ['HS256'],
  saltRounds          : 10,
  tiempoToken         : 240,
  tiempoValidezCodigo : 300
};

module.exports = auth;
