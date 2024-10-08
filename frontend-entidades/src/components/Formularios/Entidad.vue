<template>
  <q-form
    class="row q-col-gutter-md justify-center"
    @submit="$emit('guardar')"
  >
    <q-input
      filled
      class="col-xs-12 col-md-8"
      label="Nombre"
      v-model="valoresModel.nombre"
      :rules="valoresRules.nombre" />

    <q-input
      filled
      class="col-xs-12 col-md-4"
      label="Sigla"
      v-model="valoresModel.sigla"
      :rules="valoresRules.sigla"  />

    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Descripcion"
      v-model="valoresModel.descripcion"
      :rules="valoresRules.descripcion" />

    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Email"
      v-model="valoresModel.correo_electronico"
      :rules="valoresRules.correo_electronico" />

    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Web"
      v-model="valoresModel.pagina_web"
      :rules="valoresRules.pagina_web" />

    <q-input
      filled
      class="col-xs-12 col-md-12"
      label="Direccion"
      v-model="valoresModel.direccion"
      :rules="valoresRules.direccion" />

    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Telefono"
      v-model="valoresModel.telefono"
      :rules="valoresRules.telefono" />

    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Codigo"
      v-model="valoresModel.codigo"
      :rules="valoresRules.codigo" />

     <q-uploader
      label="Logo"
      accept="image/*"
      auto-upload
      :factory="requestUpload"
      @uploaded="uploaded"
      class="col-xs-12 col-md-6" />

    <div class="col-xs-12 text-right">
      <q-btn
        label="Cancelar"
        @click="$emit('cancelar')"
      />
      <q-btn
        label="Guardar"
        type="submit"
        color="primary"
        class="q-ml-sm"
      />
    </div>
  </q-form>
</template>
<script setup>
import { ref, onMounted, inject } from 'vue'
import { useVModel } from 'src/composables/useVmodel'

const props = defineProps({
  valores: {
    type: Object,
    default: () => ({})
  }
})

const Storage = inject('storage')

const valoresModel = useVModel(props, 'valores')
const valoresRules = ref({})

const uploaded = (response) => {
  const { xhr: respuesta } = response
  const respuestaFinal = JSON.parse(respuesta.response)

  valoresModel.value.logo = respuestaFinal.datos[0]
}

const requestUpload = () => {
  return {
    method: 'POST',
    url: `${process.env.API_URL}entidad/subir-logo`,
    headers: [
      {
        name: 'Authorization',
        value: `Bearer ${Storage.get('token')}`
      }
    ]
  }
}

onMounted(async () => {

})
</script>
