<script setup>
import { useQuasar } from 'quasar'
import { useCoreStore } from 'src/stores/coreStore'
import { ref, onMounted, inject } from 'vue'
import validaciones from '../common/validations'

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
  genero: [
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

const Quasar = useQuasar()
const Http = inject('http')
const Message = inject('message')
const urlUbigeo = ref('system/ubigeo')
const departamentos = ref([])
const provincias = ref([])
const distritos = ref([])
const profesiones = ref([])

const coreStore = useCoreStore()

const obtenerProvincias = async (tipo, idPadre) => {
  const { rows } = await Http.get(`${urlUbigeo.value}/obtener-tipo?tipo=${tipo}&id=${idPadre}`)
  provincias.value = rows
}

const obtenerDistritos = async (tipo, idPadre) => {
  const { rows } = await Http.get(`${urlUbigeo.value}/obtener-tipo?tipo=${tipo}&id=${idPadre}`)
  distritos.value = rows
}

const getProfesiones = async () => {
  const { rows } = await Http.get('system/profesion')
  profesiones.value = rows
}

const valoresModel = ref({ ubigeo: {} })

const claveModel = ref({
  dialog: false,
  clave: '',
  repetirClave: ''
})

const openDialogClave = () => {
  claveModel.value = {
    dialog: true,
    clave: '',
    repetirClave: ''
  }
}

const closeDialodClave = () => {
  claveModel.value = {
    dialog: false,
    clave: '',
    repetirClave: ''
  }
}

const cambiarClave = () => {
  Quasar.dialog({
    title: 'Confirmacion',
    message: 'Esta seguro de reestablecer la clave de esta persona.',
    ok: {
      color: 'primary',
      label: 'Aceptar'
    },
    cancel: {
      color: 'white',
      'text-color': 'secondary',
      label: 'Cancelar'
    },
    persistent: true
  }).onOk(async () => {
    await Http.patch(`system/persona/${coreStore.usuario.id}/reestablecer-contrasena`, { clave: claveModel.value.clave })

    Message.success('Clave cambiada con exito')

    closeDialodClave()
  })
}

onMounted(async () => {
  valoresModel.value = await Http.get(`system/persona/${coreStore.usuario.id}`)

  const { rows } = await Http.get(`${urlUbigeo.value}/obtener-tipo?tipo=departamento`)

  departamentos.value = rows

  await getProfesiones()

  if (valoresModel.value.ubigeo) {
    await obtenerProvincias('provincia', valoresModel.value.ubigeo.departamento_id)

    await obtenerDistritos('distrito', valoresModel.value.ubigeo.provincia_id)
  }

  if (valoresModel.value.id) delete valoresModel.value.clave
})
</script>

<template>
  <Titulo titulo="Mi perfil" icono="person"/>

  <q-dialog v-model="claveModel.dialog" persistent>
    <q-card style="width: 600px; max-width: 90vw;">
      <q-toolbar class="q-pa-md">
        <q-icon
          name="engineering"
          size="md"
        />
        <q-toolbar-title>
          Cambiar clave
        </q-toolbar-title>

        <q-space />

        <q-btn
          flat
          round
          icon="close"
          @click="closeDialodClave"
        />
      </q-toolbar>

      <q-card-section>
        <div class="row q-col-gutter-md">
          <q-input
            filled
            class="col-xs-12"
            label="Nueva clave"
            v-model="claveModel.clave"
            :rules="valoresRules.clave" />

          <q-input
            filled
            class="col-xs-12"
            label="Repetir clave"
            v-model="claveModel.repetirClave"
            :rules="valoresRules.repetirClave" />

          <div class="col-xs-12 text-right q-gutter-sm">
            <q-btn
              icon="close"
              label="Cancelar"
              @click="closeDialodClave" />

            <q-btn
              :disabled="claveModel.clave !== claveModel.repetirClave || !claveModel.clave"
              icon="check"
              color="primary"
              label="Guardar"
              @click="cambiarClave" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-card class="q-ma-md">
    <q-card-section>
      <q-form
        ref="persona"
        class="row q-col-gutter-sm"
        @submit="$emit('guardar')"
      >
        <q-input
          filled
          readonly
          class="col-xs-12 col-md-6"
          label="Código"
          v-model="valoresModel.codigo"
          :rules="valoresRules.codigo"
        />

        <q-input
          filled
          readonly
          class="col-xs-12 col-md-6"
          label="Apellido Paterno"
          v-model="valoresModel.apellidoPaterno"
          :rules="valoresRules.apellidoPaterno"
        />

        <q-input
          filled
          readonly
          class="col-xs-12 col-md-6"
          label="Apellido materno"
          v-model="valoresModel.apellidoMaterno"
          :rules="valoresRules.apellidoMaterno"
        />

        <q-input
          filled
          readonly
          class="col-xs-12 col-md-6"
          label="Nombres"
          v-model="valoresModel.nombres"
          :rules="valoresRules.nombres"
        />

        <q-input
          filled
          readonly
          class="col-xs-12 col-md-6"
          label="Iniciales"
          v-model="valoresModel.iniciales"
          :rules="valoresRules.iniciales"
        />

        <q-input
          filled
          readonly
          class="col-xs-12 col-md-6"
          label="Género"
          v-model="valoresModel.genero"
          :rules="valoresRules.genero"
        />

        <q-select
          filled
          readonly
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
          filled
          readonly v-model="valoresModel.fechaNacimiento" mask="##/##/####"
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
          readonly
          class="col-xs-12 col-md-6"
          label="Dni"
          v-model="valoresModel.dni"
          :rules="valoresRules.dni"
        />

        <q-input
          filled
          readonly
          class="col-xs-12 col-md-6"
          label="Celular"
          v-model="valoresModel.celular"
          :rules="valoresRules.celular"
        />

        <q-input
          filled
          readonly
          class="col-xs-12 col-md-6"
          label="Correo"
          v-model="valoresModel.correo"
          :rules="valoresRules.correo"
        />

        <q-input
          filled
          readonly
          class="col-xs-12 col-md-6"
          label="Usuario"
          v-model="valoresModel.usuario"
          :rules="valoresRules.usuario"
        />

        <q-input
          v-if="!valoresModel.id"
          filled
          readonly
          class="col-xs-12 col-md-6"
          label="Clave"
          v-model="valoresModel.clave"
          :rules="valoresRules.clave"
        />

        <q-select
          filled
          readonly
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
          readonly
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
          readonly
          class="col-xs-12 col-md-6"
          v-model="valoresModel.ubigeoId"
          :options="distritos"
          label="Distrito"
          option-value="id"
          option-label="distrito"
          emit-value
          map-options
          :rules="valoresRules.ubigeoId" />

        <q-input
          filled
          readonly
          class="col-xs-12 col-md-6"
          label="Dirección"
          v-model="valoresModel.direccion"
          :rules="valoresRules.direccion" />

        <div class="col-xs-12 text-right q-gutter-sm">
          <q-btn
            icon="close"
            label="Cancelar"
            @click="$emit('cancelar')" />

          <q-btn
            icon="lock"
            color="info"
            label="Cambiar contraseña"
            @click="openDialogClave" />

          <!-- <q-btn
            icon="check"
            color="primary"
            label="Guardar"
            type="submit" /> -->
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
