<script setup>
import CrudTable from 'components/common/CrudTable.vue'
import Unidad from 'components/Formularios/Unidad.vue'
import { ref, onMounted, inject } from 'vue'

const filters = [
  { label: 'Nombre', field: 'nombre', type: 'input' },
  { label: 'Representante', field: 'representante', type: 'input' },
  { label: 'Estado', field: 'estado', type: 'select', options: [{ label: 'ACTIVO', value: 'ACTIVO' }, { label: 'INACTIVO', value: 'INACTIVO' }] }]

const columns = [
  { name: 'acciones', label: 'Acciones', sortable: false },
  { name: 'activo', label: 'Activo', sortable: true },
  { name: 'nombre', label: 'Nombre', sortable: true },
  { name: 'abreviado', label: 'Abreviado', sortable: true },
  { name: 'representante', label: 'Representante', sortable: true },
  { name: 'estado', label: 'Estado', sortable: false }
]

const Http = inject('http')
const Message = inject('message')

const url = ref('system/unidad')

const unidad = ref({
  empresaId: null,
  grupoId: null,
  sedeId: null,
  nombre: null,
  abreviado: null,
  representante: null,
  cargo: null,
  estado: 'ACTIVO'
})

const resetForm = () => {
  unidad.value = {
    empresaId: null,
    grupoId: null,
    sedeId: null,
    nombre: null,
    abreviado: null,
    representante: null,
    cargo: null,
    estado: 'ACTIVO'
  }
}

const openModal = async (openExpandible, id) => {
  resetForm()

  if (id) {
    unidad.value = await Http.get(`${url.value}/${id}`)
  }

  openExpandible()
}

const closeModal = (close) => {
  resetForm()
  close()
}

const guardar = async (update, close) => {
  let mennsaje = 'Unidad creada de manera exitosa.'

  if (unidad.value.id) {
    mennsaje = 'Unidad actualizada de manera exitosa.'

    await Http.put(`${url.value}/${unidad.value.id}`, unidad.value)
  } else {
    await Http.post(`${url.value}`, unidad.value)
  }

  Message.success(mennsaje)

  await update()

  closeModal(close)
}

const urlEmpresas = ref('system/empresa')
const urlGrupos = ref('system/grupo')
const urlSedes = ref('system/sede')
const empresas = ref([])
const grupos = ref([])
const sedes = ref([])

onMounted(async () => {
  const empresasPeticion = await Http.get(`${urlEmpresas.value}`)
  empresas.value = empresasPeticion?.rows
  const gruposPeticion = await Http.get(`${urlGrupos.value}`)
  grupos.value = gruposPeticion?.rows
  const sedesPeticion = await Http.get(`${urlSedes.value}`)
  sedes.value = sedesPeticion?.rows
})
</script>

<template>
  <q-page>
    <Titulo
      titulo="Unidad"
      icono="lan" />

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
          label="Nueva unidad"
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
              {{ unidad.id ? 'Editar' : 'Agregar' }} unidad
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
            <Unidad
              v-model:valores="unidad"
              :empresas="empresas"
              :grupos="grupos"
              :sedes="sedes"
              @guardar="guardar(update, closeExpandible)"
              @cancelar="closeModal(closeExpandible)"
            ></Unidad>
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
          <q-td>{{ row.abreviado }}</q-td>
          <q-td>{{ row.representante }} {{ row.cargo }}</q-td>
          <q-td>
            <Estado :estado="row.estado" />
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>
