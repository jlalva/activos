import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCoreStore = defineStore('core', () => {
  const usuario = ref({})
  const roles = ref({})
  const menu = ref([])
  const permisos = ref({})

  const getMenu = () => {
    return menu.value
  }

  const setUsuario = (nValue) => {
    usuario.value = nValue
  }

  const setMenu = (nValue) => {
    menu.value = nValue
  }

  const setRoles = (nValue) => {
    roles.value = nValue
  }

  const setPermisos = (nValue) => {
    permisos.value = nValue
  }

  return {
    usuario,
    roles,
    menu,
    permisos,
    getMenu,
    setUsuario,
    setRoles,
    setMenu,
    setPermisos
  }
})
