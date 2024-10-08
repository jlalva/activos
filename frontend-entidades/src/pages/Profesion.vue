<script setup>
import { ref, inject } from 'vue'
import CrudTable from 'components/common/CrudTable.vue'
import Profesion from 'components/Formularios/Profesion.vue'

const filters = [
  { label: 'Nombre', field: 'nombre', type: 'input' },
  { label: 'Descripcion', field: 'descripcion', type: 'input' },
  { label: 'Estado', field: 'estado', type: 'select', options: [{ label: 'ACTIVO', value: 'ACTIVO' }, { label: 'INACTIVO', value: 'INACTIVO' }] }]

const columns = [
  { name: 'acciones', label: 'Acciones', sortable: false },
  { name: 'activo', label: 'Activo', sortable: true },
  { name: 'nombre', label: 'Nombre', sortable: true },
  { name: 'descripcion', label: 'Descripcion', sortable: true },
  { name: 'sigla', label: 'Sigla', sortable: true },
  { name: 'estado', label: 'Estado', sortable: false }
]

const Http = inject('http')
const Message = inject('message')

const url = ref('system/profesion')

const profesion = ref({
  nombre: null,
  descripcion: null,
  sigla: null,
  estado: 'ACTIVO'
})

const resetForm = () => {
  profesion.value = {
    nombre: null,
    descripcion: null,
    sigla: null,
    estado: 'ACTIVO'
  }
}

const openModal = async (openExpandible, id) => {
  resetForm()

  if (id) {
    profesion.value = await Http.get(`${url.value}/${id}`)
  }

  openExpandible()
}

const closeModal = (close) => {
  resetForm()
  close()
}

const guardar = async (update, close) => {
  let mennsaje = 'Profesión creado de manera exitosa.'

  if (profesion.value.id) {
    mennsaje = 'Profesión actualizado de manera exitosa.'

    await Http.put(`${url.value}/${profesion.value.id}`, profesion.value)
  } else {
    await Http.post(`${url.value}`, profesion.value)
  }

  Message.success(mennsaje)

  await update()

  closeModal(close)
}
</script>

<template>
  <q-page>
    <Titulo
      titulo="Profesión"
      icono="school" />

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
          label="Nueva profesión"
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
              {{ profesion.id ? 'Editar' : 'Agregar' }} profesion
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
            <Profesion
              v-model:valores="profesion"
              @guardar="guardar(update, closeExpandible)"
              @cancelar="closeModal(closeExpandible)"
            ></Profesion>
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
          <q-td>{{ row.nombre }}</q-td>
          <q-td>{{ row.descripcion }}</q-td>
          <q-td>{{ row.sigla }}</q-td>
          <q-td>
            <Estado :estado="row.estado" />
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>
