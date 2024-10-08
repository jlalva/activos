<script setup>
import { useVModel } from '../../composables/useVModel.js'
import validaciones from '../../common/validations'
import { inject, onMounted, ref } from 'vue'

const valoresRules = {
  nombre: [
    validaciones.requerido
  ],
  descripcion: [
    validaciones.requerido
  ],
  sigla: [
    validaciones.requerido
  ]
}

const props = defineProps({
  valores: {
    type: Object,
    default: () => ({})
  }
})

const Http = inject('http')
const valoresModel = useVModel(props, 'valores')

const personas = ref([])
const roles = ref([])
const cargos = ref([])
const unidades = ref([])

const getParameters = async (url) => {
  const { rows } = await Http.get(url)

  return rows
}

const nombreCompleto = (persona) => {
  return `${persona.nombres} ${persona.apellidoPaterno} ${persona.apellidoMaterno}`
}

onMounted(async () => {
  personas.value = (await getParameters('system/persona')).map(persona => ({ id: persona.id, nombre: nombreCompleto(persona) }))

  roles.value = await getParameters('system/rol')

  cargos.value = await getParameters('system/cargo')

  unidades.value = await getParameters('system/unidad')
})

</script>

<template>
  <q-form
    ref="parametro"
    class="row q-col-gutter-sm"
    @submit="$emit('guardar')"
  >
    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.personaId"
      :options="personas"
      label="Persona"
      option-value="id"
      option-label="nombre"
      emit-value
      map-options
      :rules="valoresRules.personaId" />

    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.rolId"
      :options="roles"
      label="Rol"
      option-value="id"
      option-label="nombre"
      emit-value
      map-options
      :rules="valoresRules.rolId" />

    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.cargoId"
      :options="cargos"
      label="Cargo"
      option-value="id"
      option-label="nombre"
      emit-value
      map-options
      :rules="valoresRules.cargoId" />

    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.unidadId"
      :options="unidades"
      label="Unidad"
      option-value="id"
      option-label="nombre"
      emit-value
      map-options
      :rules="valoresRules.unidadId" />

    <div class="col-xs-12 text-right">
      <q-btn
        class="q-ml-sm"
        icon="close"
        label="Cancelar"
        @click="$emit('cancelar')"
      />
      <q-btn
        class="q-ml-sm"
        icon="check"
        color="primary"
        label="Guardar"
        type="submit"
      />
    </div>
  </q-form>
</template>
