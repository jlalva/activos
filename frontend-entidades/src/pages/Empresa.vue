<script setup>
import { ref, inject } from 'vue'
import CrudTable from 'components/common/CrudTable.vue'
import Empresa from 'components/Formularios/Empresa.vue'

const filters = [
  { label: 'Razón social', field: 'razonSocial', type: 'input' },
  { label: 'Descripción', field: 'descripcion', type: 'input' },
  { label: 'Estado', field: 'estado', type: 'select', options: [{ label: 'ACTIVO', value: 'ACTIVO' }, { label: 'INACTIVO', value: 'INACTIVO' }] }]

const columns = [
  { name: 'acciones', label: 'Acciones', sortable: false },
  { name: 'activo', label: 'Activo', sortable: true },
  { name: 'razonSocial', label: 'Razón social', sortable: true },
  { name: 'siglas', label: 'Siglas', sortable: true },
  { name: 'direccion', label: 'Dirección', sortable: true },
  { name: 'telefono', label: 'Teléfono', sortable: true },
  { name: 'fechaFundacion', label: 'Fecha de fundacion', sortable: true },
  { name: 'logo', label: 'Logo', sortable: true },
  { name: 'banner', label: 'Banner', sortable: true },
  { name: 'descripcion', label: 'Descripción', sortable: true },
  { name: 'estado', label: 'Estado', sortable: false }
]

const Http = inject('http')
const Message = inject('message')

const url = ref('system/empresa')

const empresa = ref({
  razonSocial: null,
  siglas: null,
  direccion: null,
  telefono: null,
  fechaFundacion: null,
  logo: null,
  banner: null,
  descripcion: null,
  idUbigeo: null,
  estado: 'ACTIVO'
})

const resetForm = () => {
  empresa.value = {
    razonSocial: null,
    siglas: null,
    direccion: null,
    telefono: null,
    fechaFundacion: null,
    logo: null,
    banner: null,
    descripcion: null,
    idUbigeo: null,
    estado: 'ACTIVO'
  }
}

const openModal = async (openExpandible, id) => {
  resetForm()

  if (id) {
    empresa.value = await Http.get(`${url.value}/${id}`)
  }

  openExpandible()
}

const closeModal = (close) => {
  resetForm()
  close()
}

const guardar = async (update, close) => {
  let mennsaje = 'Empresa creada de manera exitosa.'

  if (empresa.value.id) {
    mennsaje = 'Empresa actualizada de manera exitosa.'

    await Http.put(`${url.value}/${empresa.value.id}`, empresa.value)
  } else {
    await Http.post(`${url.value}`, empresa.value)
  }

  Message.success(mennsaje)

  await update()

  closeModal(close)
}
</script>

<template>
  <q-page>
    <Titulo
      titulo="Empresa"
      icono="apartment" />

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
          label="Nueva empresa"
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
              {{ empresa.id ? 'Editar' : 'Agregar' }} empresa
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
            <Empresa
              v-model:valores="empresa"
              @guardar="guardar(update, closeExpandible)"
              @cancelar="closeModal(closeExpandible)"
            ></Empresa>
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
          <q-td>{{ row.razonSocial }}</q-td>
          <q-td>{{ row.siglas }}</q-td>
          <q-td>{{ row.direccion }}</q-td>
          <q-td>{{ row.telefono }}</q-td>
          <q-td>{{ row.fechaFundacion }}</q-td>
          <q-td>{{ row.logo }}</q-td>
          <q-td>{{ row.banner }}</q-td>
          <q-td>{{ row.descripcion }}</q-td>
          <q-td>
            <Estado :estado="row.estado" />
          </q-td>
        </q-tr>
      </template>
    </CrudTable>
  </q-page>
</template>
