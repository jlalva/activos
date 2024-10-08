<template>
  <q-form
    ref="usuario"
    @submit="$emit('guardar')"
    class="row q-col-gutter-md"
  >
    <div class="col-xs-12 text-subtitle1 text-secondary text-weight-bold">
      Datos personales
    </div>

    <q-input
      filled
      class="col-xs-12 col-md-4"
      label="Cedula de identidad"
      v-model="valoresModel.persona.numero_documento"
      :rules="valoresRules.numero_documento"
      @update:model-value="valoresModel.usuario = valoresModel.persona.numero_documento" />

    <q-input
      filled
      label="Nombres"
      class="col-xs-12 col-md-4"
      v-model="valoresModel.persona.nombres"
      :rules="valoresRules.nombres"/>

    <q-input
      filled
      label="Primer apellido"
      class="col-xs-12 col-md-4"
      v-model="valoresModel.persona.primer_apellido"
      :rules="valoresRules.primer_apellido"/>

    <q-input
      class="col-xs-12 col-md-4"
      filled
      label="Segundo apellido"
      v-model="valoresModel.persona.segundo_apellido"/>

    <q-input
      filled
      class="col-xs-12 col-md-4"
      label="Telefono"
      v-model="valoresModel.persona.telefono"/>

    <q-input
      filled
      class="col-xs-12 col-md-4"
      label="Celular"
      v-model="valoresModel.persona.celular"
      :rules="valoresRules.celular"/>

    <div class="col-xs-12 text-subtitle1 text-secondary text-weight-bold">
      Datos de usuario
    </div>

    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.id_entidad"
      :options="entidades"
      label="Entidad"
      option-value="id"
      option-label="nombre"
      emit-value
      map-options
      :rules="valoresRules.id_entidad"
      @update:model-value="updateEntidad"  />

    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.id_caja"
      :options="cajas"
      label="Caja"
      option-value="id"
      option-label="nombre"
      emit-value
      map-options
      :rules="valoresRules.id_caja" />

    <q-select
      v-model="valoresModel.id_rol"
      filled
      class="col-xs-12 col-md-6"
      :options="roles"
      label="Rol"
      option-value="id"
      option-label="nombre"
      emit-value
      map-options
      :rules="valoresRules.id_rol" />

    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Correo electronico"
      v-model="valoresModel.persona.correo_electronico"
      :rules="valoresRules.correo_electronico"
      @update:model-value="valoresModel.correo_electronico = valoresModel.persona.correo_electronico" />

    <q-input
      filled
      label="Nombre Usuario"
      v-model="valoresModel.usuario"
      class="col-xs-12 col-md-6"
      :rules="valoresRules.usuario"/>

    <q-input
      filled
      v-if="!valoresModel.id"
      label="Contraseña"
      class="col-xs-12 col-md-6"
      v-model="valoresModel.contrasena"
      :rules="valoresRules.contrasena"/>

    <q-input
      filled
      v-if="!valoresModel.id"
      class="col-xs-12 col-md-6"
      label="Confirmacion de contraseña"
      v-model="valoresModel.confirmarContrasena"
      :rules="valoresRules.contrasena"/>

    <div class="col-xs-12 text-right q-gutter-sm">
      <q-btn
        icon="close"
        label="Cancelar"
        @click="$emit('cancelar')" />

      <q-btn
        icon="check"
        color="primary"
        label="Guardar"
        type="submit" />
    </div>
  </q-form>
</template>
<script setup>
import { useVModel } from '../../composables/useVModel.js'
import { ref, onMounted, inject } from 'vue'
import validaciones from '../../common/validations'

const valoresRules = {
  nombre: [
    validaciones.requerido
  ],
  descripcion: [
    validaciones.requerido
  ],
  idEntidad: [
    validaciones.requerido
  ]
}

const props = defineProps({
  valores: {
    type: Object,
    default: () => ({})
  }
})

const _http = inject('http')
const valoresModel = useVModel(props, 'valores')
const entidades = ref([])
const cajas = ref([])
const roles = ref([])

onMounted(async () => {
  roles.value = await getRoles()
  entidades.value = await getEntidades()

  if (valoresModel.value.id_entidad) {
    cajas.value = await getCajas(valoresModel.value.id_entidad)
  }

  valoresModel.value.roles = props.valores.roles.map(x => x.id)
})

const updateEntidad = async () => {
  valoresModel.value.id_caja = null
  cajas.value = await getCajas(valoresModel.value.id_entidad)
}

async function getEntidades () {
  const { rows } = await _http.get('entidad')
  return rows
}

async function getCajas (idEntidad) {
  const { rows } = await _http.get(`caja?id_entidad=${idEntidad}`)
  return rows
}

async function getRoles () {
  const { rows } = await _http.get('rol')
  return rows
}
</script>
