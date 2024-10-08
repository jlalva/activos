<script setup>
import CrudTable from 'components/common/CrudTable.vue'
import Persona from 'components/Formularios/Persona.vue'
import { useQuasar } from 'quasar'
import { ref, onMounted, inject } from 'vue'

const filters = [
  { label: 'Nombres', field: 'nombres', type: 'input' },
  { label: 'Dni', field: 'dni', type: 'input' },
  { label: 'Estado', field: 'estado', type: 'select', options: [{ label: 'ACTIVO', value: 'ACTIVO' }, { label: 'INACTIVO', value: 'INACTIVO' }] }]

const columns = [
  { name: 'acciones', label: 'Acciones', sortable: false },
  { name: 'activo', label: 'Activo', sortable: true },
  { name: 'nombre', label: 'Nombre', sortable: true },
  { name: 'iniciales', label: 'Iniciales', sortable: true },
  { name: 'genero', label: 'Genero', sortable: true },
  { name: 'profesionId', label: 'Profesion', sortable: true },
  { name: 'fechaNacimiento', label: 'Fecha de nacimiento', sortable: true },
  { name: 'dni', label: 'dni', sortable: true },
  { name: 'ubicacionId', label: 'Ubicacion', sortable: true },
  { name: 'direccion', label: 'Direccion', sortable: true },
  { name: 'celular', label: 'Celular', sortable: true },
  { name: 'correo', label: 'Correo', sortable: true },
  { name: 'usuario', label: 'Usuario', sortable: true }
]

const Quasar = useQuasar()
const Http = inject('http')
const Message = inject('message')

const url = ref('system/persona')

const persona = ref({
  codigo: null,
  apellidoPaterno: null,
  apellidoMaterno: null,
  nombres: null,
  iniciales: null,
  genero: null,
  profesionId: null,
  fechaNacimiento: null,
  dni: null,
  ubigeoId: null,
  ubigeo: {},
  direccion: null,
  celular: null,
  correo: null,
  usuario: null,
  clave: null,
  estado: 'ACTIVO'
})

const resetForm = () => {
  persona.value = {
    codigo: null,
    apellidoPaterno: null,
    apellidoMaterno: null,
    nombres: null,
    iniciales: null,
    genero: null,
    profesionId: null,
    fechaNacimiento: null,
    dni: null,
    ubigeoId: null,
    ubigeo: {},
    direccion: null,
    celular: null,
    correo: null,
    usuario: null,
    clave: null,
    estado: 'ACTIVO'
  }
}

const openModal = async (openExpandible, id) => {
  resetForm()

  if (id) {
    persona.value = await Http.get(`${url.value}/${id}`)
  }

  openExpandible()
}

const closeModal = (close) => {
  resetForm()
  close()
}

const guardar = async (update, close) => {
  let mennsaje = 'Persona creada de manera exitosa.'

  if (persona.value.id) {
    mennsaje = 'Persona actualizada de manera exitosa.'

    await Http.put(`${url.value}/${persona.value.id}`, persona.value)
  } else {
    await Http.post(`${url.value}`, persona.value)
  }

  Message.success(mennsaje)

  await update()

  closeModal(close)
}

const urlProfesion = ref('system/profesion')
const profesiones = ref([])

const reestablecerClave = (idPersona, update) => {
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
    await Http.patch(`system/persona/${idPersona}/reestablecer-contrasena`)

    Message.success('Clave reestablecida con exito')

    await update()
  })
}

onMounted(async () => {
  const profesionesPeticion = await Http.get(`${urlProfesion.value}`)
  profesiones.value = profesionesPeticion?.rows
})
</script>

<template>
  <q-page>
    <Titulo
      titulo="Persona"
      icono="emoji_people" />

    <CrudTable
      :filters="filters"
      :columns="columns"
      :url="url"
      :order="'createdAt'"
    >
      <template v-slot:buttons="{ openExpandible }">
        <q-btn
          icon="add"
          color="secondary"
          @click="openModal(openExpandible)"
          label="Nueva persona"
        />
      </template>
      <template v-slot:expandible="{ closeExpandible, update}">
        <q-card flat fit>
          <q-toolbar class="q-pa-md">
            <q-icon
              name="badge"
              size="md"
            />
            <q-toolbar-title shrink>
              {{ persona.id ? 'Editar' : 'Agregar' }} persona
            </q-toolbar-title>
            <q-space />
            <q-btn
              flat
              round
              icon="close"
              @click="closeModal(closeExpandible)"
            />
          </q-toolbar>
          <q-card-section>
            <Persona
              v-model:valores="persona"
              :profesiones="profesiones"
              @guardar="guardar(update, closeExpandible)"
              @cancelar="closeModal(closeExpandible)"
            ></Persona>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, openExpandible, eliminar, cambiarEstado }">
        <q-tr>
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="edit"
              @click="openModal(openExpandible, row.id)"
            />

            <q-btn
              class="q-pa-xs"
              flat
              round
              color="negative"
              icon="delete"
              @click="eliminar({ url: `${url}/${row.id}` })"
            />

            <q-btn
              class="q-pa-xs"
              flat
              round
              color="info"
              icon="lock_open"
              @click="reestablecerClave(row.id, update)">
              <q-tooltip :class="`bg-info text-body2`">
                Reestablecer clave
              </q-tooltip>
            </q-btn>
          </q-td>
          <q-td>
            <q-toggle
              v-model="row.estado"
              color="primary"
              false-value="INACTIVO"
              true-value="ACTIVO"
              @click="cambiarEstado({ registro: row, url: `${url}/${row.id}` })"
            />
          </q-td>
          <q-td>{{ `${row.nombres} ${row.apellidoPaterno} ${row.apellidoMaterno}` }}</q-td>
          <q-td>{{ row.iniciales }}</q-td>
          <q-td>{{ row.genero.nombre }}</q-td>
          <q-td>{{ row.profesion.nombre }}</q-td>
          <q-td>{{ row.fechaNacimiento }}</q-td>
          <q-td>{{ row.dni }}</q-td>
          <q-td>{{ `${ row.ubigeo ? row.ubigeo?.distrito : ''  }` }}</q-td>
          <q-td>{{ row.direccion }}</q-td>
          <q-td>{{ row.celular }}</q-td>
          <q-td>{{ row.correo }}</q-td>
          <q-td>{{ row.usuario }}</q-td>
          <q-td>
            <Estado :estado="row.estado" />
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>
