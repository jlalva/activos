import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useCoreStore } from 'src/stores/coreStore'

const AUTH_URL = process.env.AUTH_URL

export default boot(({ app, router, store }) => {
  const _storage = app.config.globalProperties.$storage
  const coreStore = useCoreStore()
  const _message = app.config.globalProperties.$message

  const login = async (params) => {
    try {
      const { data } = await axios.post(`${AUTH_URL}/login`, params)
      const {
        persona,
        rol,
        cargo,
        menu,
        unidad,
        token
      } = data.datos

      const perfil = persona.perfiles[0]

      const usuario = {
        id: persona.id,
        usuario: persona.usuario,
        nombres: persona.nombres,
        primerApellido: persona.apellidoPaterno,
        segundoApellido: persona.apellidoMaterno,
        correoElectronico: persona.correo,
        perfil,
        perfiles: persona.perfiles.map(perfil => ({ id: perfil.id, nombre: perfil.rol?.nombre }))
      }

      _storage.setUsuario(usuario)
      _storage.set('rol', rol)
      _storage.set('cargo', cargo)
      _storage.set('menu', menu)
      _storage.set('unidad', unidad)
      _storage.set('token', token)

      initStore()
      let rutaInicial = '/app/'

      menu.length && (rutaInicial += menu[0].ruta)

      router.push(rutaInicial)
    } catch (error) {
      let mensaje = 'Ocurrio un error desconocido.'

      if (error.response) {
        const { data } = error.response
        mensaje = data.mensaje
      }
      _message.error(mensaje)
    }
  }

  const loginCiudadania = async () => {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/codigo`)
    if (data.codigo) {
      _storage.set('oauth2_state', data.codigo || null)
      window.location.href = data.url
    }
  }

  const logout = async () => {
    try {
      if (!_storage.get('login_local')) {
        await logoutCiudadania()
      }
      cleanStore()
    } catch (error) {
      _message.error('Ocurrio un error al intentar cerrar su sesión')
    }
  }

  const logoutCiudadania = async () => {
    const codigo = _storage.get('oauth2_state')
    const usuario = _storage.get('usuario')
    if (codigo && usuario) {
      const { data } = await axios.post(`${process.env.BACKEND_URL}/logout`, { usuario, codigo })
      window.location.href = data.url
    }
  }

  const cleanStore = () => {
    _storage.removeUsuario()
    _storage.remove('roles')
    _storage.remove('menu')
    _storage.remove('token')
    coreStore.setUsuario({})
    coreStore.setRoles([])
    coreStore.setMenu([])
    coreStore.setPermisos([])
    _storage.remove('login_local')
    router.push('/')
  }

  const initStore = () => {
    coreStore.setUsuario(_storage.getUsuario())
    coreStore.setRoles(_storage.get('rol'))
    coreStore.setMenu(_storage.get('menu'))
  }

  app.config.globalProperties.$auth = {
    cleanStore,
    initStore,
    login,
    loginCiudadania,
    logout,
    logoutCiudadania
  }

  app.provide('auth', {
    cleanStore,
    initStore,
    login,
    loginCiudadania,
    logout,
    logoutCiudadania
  })
})

//
