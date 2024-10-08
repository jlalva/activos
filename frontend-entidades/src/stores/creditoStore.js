import { defineStore } from 'pinia'
import { inject, ref } from 'vue'

export const useCreditoStore = defineStore('credito', () => {
  const credito = ref({})
  const Http = inject('http')

  const getCredito = async (idCredito) => {
    credito.value = await Http.get(`credito/${idCredito}`)
  }

  const getCronogramaPagos = async (idCredito) => {
    const respuesta = await Http.get(`credito/${idCredito}/cronograma-pagos?print=true`)
    return respuesta
  }

  const getPlanPagos = async (idCredito) => {

  }

  return {
    credito,
    getCredito,
    getCronogramaPagos,
    getPlanPagos
  }
})
