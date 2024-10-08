<script setup>
import { ref, inject } from 'vue'
import CrudTable from 'components/common/CrudTable.vue'
import Rol from 'components/Formularios/Rol.vue'

const filters = [
  { label: 'Nombre', field: 'nombre', type: 'input' },
  { label: 'Descripcion', field: 'descripcion', type: 'input' },
  { label: 'Estado', field: 'estado', type: 'select', options: [{ label: 'ACTIVO', value: 'ACTIVO' }, { label: 'INACTIVO', value: 'INACTIVO' }] }]

const columns = [
  { name: 'acciones', label: 'Acciones', sortable: false },
  { name: 'activo', label: 'Activo', sortable: true },
  { name: 'nombre', label: 'Nombre', sortable: true },
  { name: 'descripcion', label: 'Descripcion', sortable: true },
  { name: 'estado', label: 'Estado', sortable: false }
]

const Http = inject('http')
const Message = inject('message')

const url = ref('system/rol')

const rol = ref({
  nombre: null,
  descripcion: null,
  estado: 'ACTIVO'
})

const resetForm = () => {
  rol.value = {
    nombre: null,
    descripcion: null,
    estado: 'ACTIVO'
  }
}

const getMenus = async () => {
  const { rows } = await Http.get('system/menu')

  return rows || []
}

const openModal = async (openExpandible, id) => {
  resetForm()

  rol.value.menus = (await getMenus()).map(menu => ({
    id: menu.id,
    nombre: menu.nombre,
    icono: menu.icono,
    ver: false,
    agregar: false,
    editar: false,
    eliminar: false
  }))

  if (id) {
    rol.value = await Http.get(`${url.value}/${id}`)
  }

  openExpandible()
}

const closeModal = (close) => {
  resetForm()
  close()
}

const guardar = async (update, close) => {
  let mennsaje = 'rol creado de manera exitosa.'

  if (rol.value.id) {
    mennsaje = 'rol actualizado de manera exitosa.'

    await Http.put(`${url.value}/${rol.value.id}`, rol.value)
  } else {
    await Http.post(`${url.value}`, rol.value)
  }

  Message.success(mennsaje)

  await update()

  closeModal(close)
}
</script>

<template>
  <q-page>
    <Titulo
      titulo="Rol"
      icono="engineering" />

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
          label="Nuevo rol"
        />
      </template>
      <template v-slot:expandible="{ closeExpandible, update}">
        <q-card flat fit>
          <q-toolbar class="q-pa-md">
            <q-icon
              name="group"
              size="md"
            />
            <q-toolbar-title shrink>
              {{ rol.id ? 'Editar' : 'Agregar' }} rol
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
            <Rol
              v-model:valores="rol"
              @guardar="guardar(update, closeExpandible)"
              @cancelar="closeModal(closeExpandible)" />
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
          <q-td>
            <Estado :estado="row.estado" />
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>
