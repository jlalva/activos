<script setup>
import { useVModel } from '../../composables/useVModel.js'
import validaciones from '../../common/validations'

// empresaId
//   grupoId
//   sedeId
//   nombre
//   abreviado
//   representante
//   cargo
//   fechaRegistro
//   estado

const valoresRules = {
  empresaId: [
    validaciones.requerido
  ],
  grupoId: [
    validaciones.requerido
  ],
  sedeId: [
    validaciones.requerido
  ],
  nombre: [
    validaciones.requerido
  ],
  abreviado: [
    validaciones.requerido
  ],
  representante: [
    validaciones.requerido
  ],
  cargo: [
    validaciones.requerido
  ]
}

const props = defineProps({
  valores: {
    type: Object,
    default: () => ({})
  },
  empresas: {
    type: Array,
    default: () => ([])
  },
  grupos: {
    type: Array,
    default: () => ([])
  },
  sedes: {
    type: Array,
    default: () => ([])
  }
})

const valoresModel = useVModel(props, 'valores')
</script>

<template>
  <q-form
    ref="unidad"
    class="row q-col-gutter-sm"
    @submit="$emit('guardar')"
  >
    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.empresaId"
      :options="empresas"
      label="Empresa"
      option-value="id"
      option-label="razonSocial"
      emit-value
      map-options
      :rules="valoresRules.empresaId"
    />
    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.grupoId"
      :options="grupos"
      label="Grupo"
      option-value="id"
      option-label="nombre"
      emit-value
      map-options
      :rules="valoresRules.grupoId"
    />
    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.sedeId"
      :options="sedes"
      label="Sede"
      option-value="id"
      option-label="nombre"
      emit-value
      map-options
      :rules="valoresRules.sedeId"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Nombre"
      v-model="valoresModel.nombre"
      :rules="valoresRules.nombre"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Abreviado"
      v-model="valoresModel.abreviado"
      :rules="valoresRules.abreviado"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Representante"
      v-model="valoresModel.representante"
      :rules="valoresRules.representante"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Cargo"
      v-model="valoresModel.cargo"
      :rules="valoresRules.cargo"
    />
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
