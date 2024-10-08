<script setup>
import { useVModel } from '../../composables/useVModel.js'
import validaciones from '../../common/validations'

const valoresRules = {
  departamento: [
    validaciones.requerido
  ],
  provincia: [
    validaciones.requerido
  ],
  distrito: [
    validaciones.requerido
  ]
}

const props = defineProps({
  valores: {
    type: Object,
    default: () => ({})
  }
})

const valoresModel = useVModel(props, 'valores')
</script>

<template>
  <q-form
    ref="ubigeo"
    class="row q-col-gutter-sm"
    @submit="$emit('guardar')"
  >
   <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Código Departamento"
      v-model="valoresModel.departamentoId"
      :rules="valoresRules.departamentoId"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Departamento"
      v-model="valoresModel.departamento"
      :rules="valoresRules.departamento"
    />

    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Código provincia"
      v-model="valoresModel.provinciaId"
      :rules="valoresRules.provinciaId"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Provincia"
      v-model="valoresModel.provincia"
      :rules="valoresRules.provincia"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Código distrito"
      v-model="valoresModel.distritoId"
      :rules="valoresRules.distritoId"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Distrito"
      v-model="valoresModel.distrito"
      :rules="valoresRules.distrito"
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
