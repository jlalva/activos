<script setup>
import { ref, onMounted, inject } from 'vue'
import { useVModel } from '../../composables/useVModel.js'
import validaciones from '../../common/validations'

const valoresRules = {
  codigo: [
    validaciones.requerido
  ],
  apellidoPaterno: [
    validaciones.requerido
  ],
  apellidoMaterno: [
    validaciones.requerido
  ],
  nombres: [
    validaciones.requerido
  ],
  iniciales: [
    validaciones.requerido
  ],
  generoId: [
    validaciones.requerido
  ],
  profesionId: [
    validaciones.requerido
  ],
  fechaNacimiento: [
    validaciones.requerido
  ],
  dni: [
    validaciones.requerido
  ],
  ubigeoId: [
    validaciones.requerido
  ],
  direccion: [
    validaciones.requerido
  ],
  celular: [
    validaciones.requerido
  ],
  correo: [
    validaciones.requerido
  ],
  usuario: [
    validaciones.requerido
  ],
  clave: [
    validaciones.requerido
  ]
}

const Http = inject('http')
const urlUbigeo = ref('system/ubigeo')
const urlParametros = ref('system/parametros')
const departamentos = ref([])
const provincias = ref([])
const distritos = ref([])
const generos = ref([])

const obtenerProvincias = async (tipo, idPadre) => {
  const { rows } = await Http.get(`${urlUbigeo.value}/obtener-tipo?tipo=${tipo}&id=${idPadre}`)
  provincias.value = rows
}

const obtenerDistritos = async (tipo, idPadre) => {
  const { rows } = await Http.get(`${urlUbigeo.value}/obtener-tipo?tipo=${tipo}&id=${idPadre}`)
  distritos.value = rows
}

const obtenerGeneros = async () => {
  generos.value = await Http.get(`${urlParametros.value}?grupo=${'TGEN'}`)
}

const props = defineProps({
  valores: {
    type: Object,
    default: () => ({})
  },
  profesiones: {
    type: Array,
    default: () => ([])
  }
})

const valoresModel = useVModel(props, 'valores')
onMounted(async () => {
  const { rows } = await Http.get(`${urlUbigeo.value}/obtener-tipo?tipo=departamento`)
  departamentos.value = rows
  console.log('deberia tener lista provincias', valoresModel)
  if (valoresModel.value.ubigeo) {
    await obtenerProvincias('provincia', valoresModel.value.ubigeo.departamento_id)
    await obtenerDistritos('distrito', valoresModel.value.ubigeo.provincia_id)
    await obtenerGeneros()
    console.log('resultados:::', distritos)
  }
  if (valoresModel.value.id) {
    delete valoresModel.value.clave
  }
})
</script>

<template>
  <q-form
    ref="persona"
    class="row q-col-gutter-sm"
    @submit="$emit('guardar')"
  >
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Código"
      v-model="valoresModel.codigo"
      :rules="valoresRules.codigo"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Apellido Paterno"
      v-model="valoresModel.apellidoPaterno"
      :rules="valoresRules.apellidoPaterno"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Apellido materno"
      v-model="valoresModel.apellidoMaterno"
      :rules="valoresRules.apellidoMaterno"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Nombres"
      v-model="valoresModel.nombres"
      :rules="valoresRules.nombres"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Iniciales"
      v-model="valoresModel.iniciales"
      :rules="valoresRules.iniciales"
    />
    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.generoId"
      :options="generos"
      label="Género"
      option-value="id"
      option-label="nombre"
      emit-value
      map-options
      :rules="valoresRules.generoId"
    />
    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.profesionId"
      :options="profesiones"
      label="Profesión"
      option-value="id"
      option-label="nombre"
      emit-value
      map-options
      :rules="valoresRules.profesionId"
    />
    <q-input
     class="col-xs-12 col-md-6"
     label="Fecha de nacimiento"
     filled v-model="valoresModel.fechaNacimiento" mask="##/##/####"
     :rules="valoresRules.fechaNacimiento">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy>
            <q-date
              v-model="valoresModel.fechaNacimiento"
              mask="MM/DD/YYYY">
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Dni"
      v-model="valoresModel.dni"
      :rules="valoresRules.dni"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Celular"
      v-model="valoresModel.celular"
      :rules="valoresRules.celular"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Correo"
      v-model="valoresModel.correo"
      :rules="valoresRules.correo"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Usuario"
      v-model="valoresModel.usuario"
      :rules="valoresRules.usuario"
    />
    <q-input
      v-if="!valoresModel.id"
      filled
      class="col-xs-12 col-md-6"
      label="Clave"
      v-model="valoresModel.clave"
      :rules="valoresRules.clave"
    />
    <br/>
    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.ubigeo.departamento_id"
      :options="departamentos"
      label="Departamento"
      option-value="departamento_id"
      option-label="departamento"
      emit-value
      map-options
      :rules="valoresRules.ubigeoId"
      @update:model-value="obtenerProvincias('provincia', valoresModel.ubigeo.departamento_id)"
    />
    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.ubigeo.provincia_id"
      :options="provincias"
      label="Provincia"
      option-value="provincia_id"
      option-label="provincia"
      emit-value
      map-options
      :rules="valoresRules.ubigeoId"
      @update:model-value="obtenerDistritos('distrito', valoresModel.ubigeo.provincia_id)"
    />
    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.ubigeoId"
      :options="distritos"
      label="Distrito"
      option-value="id"
      option-label="distrito"
      emit-value
      map-options
      :rules="valoresRules.ubigeoId"
    />
     <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Dirección"
      v-model="valoresModel.direccion"
      :rules="valoresRules.direccion"
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
