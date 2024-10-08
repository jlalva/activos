<template>
  <q-page>
    <Titulo
      titulo="Roles"
      icono="engineering"
    />

    <CrudTable
      :filters="filters"
      :columns="columns"
      :url="url"
      :order="'fecha_creacion'"
    >
      <template v-slot:buttons="{ open }">
        <q-btn
          icon="add"
          color="secondary"
          @click="openModal(open)"
          label="Nuevo rol"
        />
      </template>
      <template v-slot:form="{ close, update }">
        <q-card style="width: 600px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="engineering"
              size="md"
            />
            <q-toolbar-title>
              {{ rol.id ? 'Editar' : 'Agregar' }} rol
            </q-toolbar-title>
            <q-space />
            <q-btn
              flat
              round
              icon="close"
              @click="closeModal(close)"
            />
          </q-toolbar>
          <q-card-section>
            <Rol
              v-model:valores="rol"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Rol>
          </q-card-section>
        </q-card>
      </template>
      <template v-slot:row="{ row, open, eliminar, cambiarEstado }">
        <q-tr>
          <q-td>
            <q-btn
              class="q-pa-xs"
              flat
              round
              icon="edit"
              @click="openModal(open, row.id)"
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
          <q-td>{{ row.entidad?.nombre }}</q-td>
          <q-td>
            <li
              v-for="(item, index) of row.menus"
              :key="index"
            >{{ item.nombre }}</li>
          </q-td>
          <q-td>
            <Estado :estado="row.estado" />
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>

<script>
import { ref, inject } from 'vue'
import CrudTable from 'components/common/CrudTable.vue'
import Rol from 'components/Formularios/Rol.vue'

const filters = [
  {
    label: 'Nombre',
    field: 'nombre',
    type: 'input'
  },
  {
    label: 'Descripcion',
    field: 'descripcion',
    type: 'input'
  },
  {
    label: 'Estado',
    field: 'estado',
    type: 'select',
    options: [
      { label: 'ACTIVO', value: 'ACTIVO' },
      { label: 'INACTIVO', value: 'INACTIVO' }
    ]
  }
]

const columns = [
  {
    name: 'acciones',
    label: 'Acciones',
    sortable: false
  },
  {
    name: 'activo',
    label: 'Activo',
    sortable: false
  },
  {
    name: 'nombre',
    label: 'Nombre',
    sortable: false
  },
  {
    name: 'descripcion',
    label: 'Descripcion',
    sortable: false
  },
  {
    name: 'entidad',
    label: 'Entidad',
    sortable: false
  },
  {
    name: 'menus',
    label: 'Menus',
    sortable: false
  },
  {
    name: 'estado',
    label: 'Estado',
    sortable: false
  }
]

export default {
  components: { CrudTable, Rol },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('rol')
    const rol = ref({
      nombre: null,
      descripcion: null,
      idEntidad: null,
      permisos: [],
      menu: []
    })

    const resetForm = () => {
      rol.value = {
        nombre: null,
        descripcion: null,
        idEntidad: null,
        permisos: [],
        menu: []
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        rol.value = await _http.get(`${url.value}/${id}`)
        rol.value.menu = rol.value.menu.map(x => x.id)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      if (rol.value.id) {
        await _http.put(`${url.value}/${rol.value.id}`, rol.value)
      } else {
        await _http.post(`${url.value}`, rol.value)
      }
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      rol,
      filters,
      columns,
      url,
      closeModal,
      openModal,
      getNombreCompleto,
      guardar
    }
  }
}
</script>
