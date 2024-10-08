'use strict';

// Definiendo asociaciones de las tablas
module.exports = function associations (models) {
  const {
    Profesion,
    Persona,
    Cargo,
    Menu,
    Rol,
    Permiso,
    Perfil,
    Grupo,
    Sede,
    Empresa,
    Unidad,
    Ubigeo,
    Parametro
  } = models;

  Persona.belongsTo(Profesion, { foreignKey: { name: 'profesionId' }, as: 'profesion' });
  Profesion.hasMany(Persona, { foreignKey: { name: 'profesionId' }, as: 'personas' });

  Persona.belongsTo(Parametro, { foreignKey: { name: 'generoId' }, as: 'genero' });
  Parametro.hasMany(Persona, { foreignKey: { name: 'generoId' }, as: 'personas' });

  Persona.belongsTo(Ubigeo, { foreignKey: { name: 'ubigeoId' }, as: 'ubigeo' });
  Ubigeo.hasMany(Persona, { foreignKey: { name: 'ubigeoId' }, as: 'personas' });

  Grupo.belongsTo(Unidad, { foreignKey: { name: 'grupoId' }, as: 'unidad' });
  Unidad.hasMany(Grupo, { foreignKey: { name: 'grupoId' }, as: 'grupos' });

  Sede.belongsTo(Unidad, { foreignKey: { name: 'sedeId' }, as: 'unidad' });
  Unidad.hasMany(Sede, { foreignKey: { name: 'sedeId' }, as: 'sedes' });

  Empresa.belongsTo(Unidad, { foreignKey: { name: 'empresaId' }, as: 'unidad' });
  Unidad.hasMany(Empresa, { foreignKey: { name: 'empresaId' }, as: 'empresas' });

  Permiso.belongsTo(Menu, { foreignKey: { name: 'menuId' }, as: 'menu' });
  Menu.hasMany(Permiso, { foreignKey: { name: 'menuId' }, as: 'permisos' });

  Menu.belongsTo(Menu, { foreignKey: { name: 'menuPadreId' }, as: 'menu' });
  Menu.hasMany(Menu, { foreignKey: { name: 'menuPadreId' }, as: 'submenus' });

  Permiso.belongsTo(Rol, { foreignKey: { name: 'rolId' }, as: 'rol' });
  Rol.hasMany(Permiso, { foreignKey: { name: 'rolId' }, as: 'permisos' });

  Perfil.belongsTo(Persona, { foreignKey: { name: 'personaId' }, as: 'persona' });
  Persona.hasMany(Perfil, { foreignKey: { name: 'personaId' }, as: 'perfiles' });

  Perfil.belongsTo(Cargo, { foreignKey: { name: 'cargoId' }, as: 'cargo' });
  Cargo.hasMany(Perfil, { foreignKey: { name: 'cargoId' }, as: 'perfiles' });

  Perfil.belongsTo(Rol, { foreignKey: { name: 'rolId' }, as: 'rol' });
  Rol.hasMany(Perfil, { foreignKey: { name: 'rolId' }, as: 'roles' });

  Perfil.belongsTo(Unidad, { foreignKey: { name: 'unidadId' }, as: 'unidad' });
  Unidad.hasMany(Perfil, { foreignKey: { name: 'unidadId' }, as: 'perfiles' });

  return models;
};
