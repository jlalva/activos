<script setup>
import { ref, inject } from 'vue'
import CrudTable from 'components/common/CrudTable.vue'
import Perfil from 'components/Formularios/Perfil.vue'

const filters = [
  { label: 'Estado', field: 'estado', type: 'select', options: [{ label: 'ACTIVO', value: 'ACTIVO' }, { label: 'INACTIVO', value: 'INACTIVO' }] }]

const columns = [
  { name: 'acciones', label: 'Acciones', sortable: false },
  { name: 'activo', label: 'Activo', sortable: true },
  { name: 'persona', label: 'Persona', sortable: true },
  { name: 'rol', label: 'Rol', sortable: true },
  { name: 'cargo', label: 'Cargo', sortable: true },
  { name: 'unidad', label: 'Unidad', sortable: true },
  { name: 'estado', label: 'Estado', sortable: false }
]

const Http = inject('http')
const Message = inject('message')

const url = ref('system/perfil')

const perfil = ref({
  personaId: null,
  rolId: null,
  cargoId: null,
  unidadId: null,
  motivoBaja: null,
  estado: 'ACTIVO'
})

const resetForm = () => {
  perfil.value = {
    personaId: null,
    rolId: null,
    cargoId: null,
    unidadId: null,
    motivoBaja: null,
    estado: 'ACTIVO'
  }
}

const openModal = async (openExpandible, id) => {
  resetForm()

  if (id) {
    perfil.value = await Http.get(`${url.value}/${id}`)
  }

  openExpandible()
}

const closeModal = (close) => {
  resetForm()
  close()
}

const guardar = async (update, close) => {
  let mennsaje = 'Perfil creado de manera exitosa.'

  if (perfil.value.id) {
    mennsaje = 'Perfil actualizado de manera exitosa.'

    await Http.put(`${url.value}/${perfil.value.id}`, perfil.value)
  } else {
    await Http.post(`${url.value}`, perfil.value)
  }

  Message.success(mennsaje)

  await update()

  closeModal(close)
}

const nombreCompleto = (persona) => {
  return `${persona.nombres} ${persona.apellidoPaterno} ${persona.apellidoMaterno}`
}
</script>

<template>
  <q-page>
    <Titulo
      titulo="Perfil"
      icono="account_circle" />

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
          label="Nuevo perfil"
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
              {{ perfil.id ? 'Editar' : 'Agregar' }} perfil
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
            <Perfil
              v-model:valores="perfil"
              @guardar="guardar(update, closeExpandible)"
              @cancelar="closeModal(closeExpandible)"
            ></Perfil>
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
          <q-td>{{ nombreCompleto(row.persona) }}</q-td>
          <q-td>{{ row.rol?.nombre }}</q-td>
          <q-td>{{ row.cargo?.nombre }}</q-td>
          <q-td>{{ row.unidad?.nombre }}</q-td>
          <q-td>
            <Estado :estado="row.estado" />
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>
