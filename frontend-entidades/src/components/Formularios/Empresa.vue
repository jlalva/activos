<script setup>
import { ref, onMounted, inject } from 'vue'
import { useVModel } from '../../composables/useVModel.js'
import validaciones from '../../common/validations'

const valoresRules = {
  razonSocial: [
    validaciones.requerido
  ],
  siglas: [
    validaciones.requerido
  ],
  direccion: [
    validaciones.requerido
  ],
  telefono: [
    validaciones.requerido
  ],
  fechaFundacion: [
    validaciones.requerido
  ],
  logo: [
    validaciones.requerido
  ],
  banner: [
    validaciones.requerido
  ],
  idUbigeo: [
    validaciones.requerido
  ],
  descripcion: [
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
const urlUbigeo = ref('system/ubigeo')
const departamentos = ref([])
const provincias = ref([])
const distritos = ref([])
const valoresModel = useVModel(props, 'valores')

const obtenerProvincias = async (tipo, idPadre) => {
  const { rows } = await Http.get(`${urlUbigeo.value}/obtener-tipo?tipo=${tipo}&id=${idPadre}`)
  provincias.value = rows
}

const obtenerDistritos = async (tipo, idPadre) => {
  const { rows } = await Http.get(`${urlUbigeo.value}/obtener-tipo?tipo=${tipo}&id=${idPadre}`)
  distritos.value = rows
}

onMounted(async () => {
  const { rows } = await Http.get(`${urlUbigeo.value}/obtener-tipo?tipo=departamento`)
  departamentos.value = rows
})
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
      label="Razón social"
      v-model="valoresModel.razonSocial"
      :rules="valoresRules.razonSocial"
    />

    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Sigla"
      v-model="valoresModel.siglas"
      :rules="valoresRules.siglas"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Dirección"
      v-model="valoresModel.direccion"
      :rules="valoresRules.direccion"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Teléfono"
      v-model="valoresModel.telefono"
      :rules="valoresRules.telefono"
    />
    <q-input
     class="col-xs-12 col-md-6"
     label="Fecha fundación"
     filled v-model="valoresModel.fechaFundacion" mask="##/##/####"
     :rules="valoresRules.fechaFundacion">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy>
            <q-date
              v-model="valoresModel.fechaFundacion"
              mask="MM/DD/YYYY">
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Logo"
      v-model="valoresModel.logo"
      :rules="valoresRules.logo"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Banner"
      v-model="valoresModel.banner"
      :rules="valoresRules.banner"
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Descripcion"
      v-model="valoresModel.descripcion"
      :rules="valoresRules.descripcion"
    />
    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.departamentoId"
      :options="departamentos"
      label="Departamento"
      option-value="departamento_id"
      option-label="departamento"
      emit-value
      map-options
      :rules="valoresRules.idUbigeo"
      @update:model-value="obtenerProvincias('provincia', valoresModel.departamentoId)"
    />
    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.provinciaId"
      :options="provincias"
      label="Provincia"
      option-value="provincia_id"
      option-label="provincia"
      emit-value
      map-options
      :rules="valoresRules.idUbigeo"
      @update:model-value="obtenerDistritos('distrito', valoresModel.provinciaId)"
    />
    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.idUbigeo"
      :options="distritos"
      label="Distrito"
      option-value="id"
      option-label="distrito"
      emit-value
      map-options
      :rules="valoresRules.idUbigeo"
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
