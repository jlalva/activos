const _storage = window.localStorage
const prefix = 'app'

const codificar = (value) => {
  if (process.env.NODE_ENV === 'development') return value

  return window.btoa(value)
}

const decodificar = (value) => {
  if (process.env.NODE_ENV === 'development') return value

  return window.atob(value)
}

const guardLogin = (to, from, next) => {
  const menu = _storage.getItem(codificar(`${prefix}_menu`))
  if (_storage.getItem(codificar(`${prefix}_token`)) && menu && _storage.getItem(codificar(`${prefix}_usuario`))) {
    if (from.path.includes('/app/')) {
      next({ path: `${JSON.parse(decodificar(menu))[0].url}`, replace: true })
    } else {
      next({ path: `/app/${JSON.parse(decodificar(menu))[0].url}`, replace: true })
    }
  } else {
    next()
  }
}

const guardApp = (to, from, next) => {
  if (_storage.getItem(codificar(`${prefix}_token`))) {
    next()
  } else {
    _storage.clear()
    next('/')
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/OutLoginLayout.vue'),
    beforeEnter: guardLogin,
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'recuperar-contrasena', name: 'recuperar-contrasena', component: () => import('pages/auth/RecuperarContrasena.vue') },
      { path: 'reestablecer-contrasena', name: 'reestablecer-contrasena', component: () => import('pages/auth/ReestablecerContrasena.vue') }
    ]
  },
  {
    path: '/app/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: guardApp,
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/Dashboard.vue') },
      { path: 'cargo', name: 'cargo', component: () => import('pages/Cargo.vue') },
      { path: 'profesion', name: 'profesion', component: () => import('pages/Profesion.vue') },
      { path: 'grupo', name: 'grupo', component: () => import('pages/Grupo.vue') },
      { path: 'sede', name: 'sede', component: () => import('pages/Sede.vue') },
      { path: 'menu', name: 'menu', component: () => import('pages/Menu.vue') },
      { path: 'empresa', name: 'empresa', component: () => import('pages/Empresa.vue') },
      { path: 'ubigeo', name: 'ubigeo', component: () => import('pages/Ubigeo.vue') },
      { path: 'unidad', name: 'unidad', component: () => import('pages/Unidad.vue') },
      { path: 'persona', name: 'persona', component: () => import('pages/Persona.vue') },
      { path: 'perfil', name: 'perfil', component: () => import('pages/Perfil.vue') },
      { path: 'rol', name: 'rol', component: () => import('pages/Rol.vue') },
      { path: 'mi-perfil', name: 'mi-perfil', component: () => import('pages/MiPerfil.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
