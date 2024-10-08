<script setup>
import validations from 'src/common/validations'
import { useVModel } from 'src/composables/useVmodel'

const valoresRules = {
  nombre: [
    validations.requerido
  ],
  descripcion: [
    validations.requerido
  ],
  idEntidad: [
    validations.requerido
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
    ref="parametro"
    class="row q-col-gutter-sm"
    @submit="$emit('guardar')"
  >
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
      label="Descripcion"
      v-model="valoresModel.descripcion"
      :rules="valoresRules.descripcion"
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
