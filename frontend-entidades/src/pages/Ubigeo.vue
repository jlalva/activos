<script setup>
import { ref, inject } from 'vue'
import CrudTable from 'components/common/CrudTable.vue'
import Ubigeo from 'components/Formularios/Ubigeo.vue'

const filters = [
  { label: 'Departamento', field: 'departamento', type: 'input' },
  { label: 'Provincia', field: 'provincia', type: 'input' },
  { label: 'Distrito', field: 'distrito', type: 'input' },
  { label: 'Estado', field: 'estado', type: 'select', options: [{ label: 'ACTIVO', value: 'ACTIVO' }, { label: 'INACTIVO', value: 'INACTIVO' }] }]

const columns = [
  { name: 'acciones', label: 'Acciones', sortable: false },
  { name: 'activo', label: 'Activo', sortable: true },
  { name: 'departamento', label: 'Departamento', sortable: true },
  { name: 'provincia', label: 'Provincia', sortable: true },
  { name: 'distrito', label: 'Distrito', sortable: true },
  { name: 'estado', label: 'Estado', sortable: false }
]

const Http = inject('http')
const Message = inject('message')

const url = ref('system/ubigeo')

const ubigeo = ref({
  departamento: null,
  provincia: null,
  distrito: null,
  estado: 'ACTIVO'
})

const resetForm = () => {
  ubigeo.value = {
    departamento: null,
    provincia: null,
    distrito: null,
    estado: 'ACTIVO'
  }
}

const openModal = async (openExpandible, id) => {
  resetForm()

  if (id) {
    ubigeo.value = await Http.get(`${url.value}/${id}`)
  }

  openExpandible()
}

const closeModal = (close) => {
  resetForm()
  close()
}

const guardar = async (update, close) => {
  let mennsaje = 'Ubicación creada de manera exitosa.'

  if (ubigeo.value.id) {
    mennsaje = 'Ubicación actualizada de manera exitosa.'

    await Http.put(`${url.value}/${ubigeo.value.id}`, ubigeo.value)
  } else {
    await Http.post(`${url.value}`, ubigeo.value)
  }

  Message.success(mennsaje)

  await update()

  closeModal(close)
}
</script>

<template>
  <q-page>
    <Titulo
      titulo="Ubicación geográfica"
      icono="travel_explore" />

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
          label="Nueva ubicación geográfica"
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
              {{ ubigeo.id ? 'Editar' : 'Agregar' }} ubigeo
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
            <Ubigeo
              v-model:valores="ubigeo"
              @guardar="guardar(update, closeExpandible)"
              @cancelar="closeModal(closeExpandible)"
            ></Ubigeo>
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
          <q-td>{{ row.departamento }}</q-td>
          <q-td>{{ row.provincia }}</q-td>
          <q-td>{{ row.distrito }}</q-td>
          <q-td>
            <Estado :estado="row.estado" />
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>
