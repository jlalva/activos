<template>
  <q-page>
    <Titulo
      titulo="Entidades"
      icono="business"
    ></Titulo>

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
          label="Nueva entidad"
        />
      </template>

      <template v-slot:form="{ close, update}">
        <q-card style="width: 700px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="home_work"
              size="md"
            />
            <q-toolbar-title>
              {{ entidad.id ? 'Editar' : 'Agregar' }} entidad
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
            <Entidad
              v-model:valores="entidad"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)"
            ></Entidad>
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
          <q-td>
            <img :src="row.logo" alt="Logo" width="100"/>
          </q-td>
          <q-td>{{ row.codigo }}</q-td>
          <q-td>{{ row.nombre }}</q-td>
          <q-td>{{ row.sigla }}</q-td>
          <q-td>{{ row.correo_electronico }}</q-td>
          <q-td>{{ row.telefono }}</q-td>
          <q-td>{{ row.direccion }}</q-td>
          <q-td><a :href="row.pagina_web" target="_blank">{{ row.pagina_web }}</a></q-td>
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
import Entidad from 'components/Formularios/Entidad.vue'

const filters = [
  {
    label: 'Nombre',
    field: 'nombre',
    type: 'input'
  },
  {
    label: 'Sigla',
    field: 'sigla',
    type: 'input'
  },
  {
    label: 'Correo electronico',
    field: 'correo_electronico',
    type: 'input'
  }
]

const columns = [
  { name: 'acciones', label: 'Acciones', sortable: false },
  { name: 'activo', label: 'Activo', sortable: false },
  { name: 'logo', label: 'Logo', sortable: false },
  { name: 'codigo', label: 'Codigo', sortable: false },
  { name: 'nombre', label: 'Nombre', sortable: false },
  { name: 'sigla', label: 'Sigla', sortable: false },
  { name: 'email', label: 'Correo electronico', sortable: false },
  { name: 'telefono', label: 'Telefono', sortable: false },
  { name: 'direccion', label: 'Dirccion', sortable: false },
  { name: 'pagina_web', label: 'Pagina web', sortable: false },
  { name: 'estado', label: 'Estado', sortable: false }
]

export default {
  components: { CrudTable, Entidad },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('entidad')
    const entidad = ref({
      descripcion: null,
      direccion: null,
      email: null,
      idEntidad: null,
      nivel: null,
      nombre: null,
      sigla: null,
      telefono: null,
      web: null
    })

    const resetForm = () => {
      entidad.value = {
        descripcion: null,
        direccion: null,
        email: null,
        idEntidad: null,
        nivel: null,
        nombre: null,
        sigla: null,
        telefono: null,
        web: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()

      if (id) {
        entidad.value = await _http.get(`${url.value}/${id}`)
      }

      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      if (entidad.value.id) {
        await _http.put(`${url.value}/${entidad.value.id}`, entidad.value)
      } else {
        await _http.post(`${url.value}`, entidad.value)
      }
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}`
    }

    return {
      entidad,
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
