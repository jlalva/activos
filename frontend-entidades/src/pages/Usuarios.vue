<template>
  <q-page>
    <Titulo
      titulo="Usuarios"
      icono="person" />

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
          label="Nuevo usuario"
        />
      </template>
      <template v-slot:form="{ close, update}">
        <q-card style="width: 800px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon
              name="person"
              size="md"
            />
            <q-toolbar-title>
              {{ usuario.id ? 'Editar' : 'Agregar' }} usuario
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
            <Usuario
              v-model:valores="usuario"
              @guardar="guardar(update, close)"
              @cancelar="closeModal(close)" />
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
          <q-td>{{ row.usuario }}</q-td>
          <q-td>{{ row.persona?.numero_documento }}</q-td>
          <q-td>{{ getNombreCompleto(row) }}</q-td>
          <q-td>{{ row.rol?.nombre }}</q-td>
          <q-td>{{ row.caja?.nombre }}</q-td>
          <q-td>{{ row.correo_electronico }}</q-td>
          <q-td>{{ row.persona?.celular }}</q-td>
          <q-td>{{ row.persona?.telefono }}</q-td>
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
import Usuario from 'components/Formularios/Usuario.vue'

const filters = [
  { label: 'Usuario', field: 'usuario', type: 'input' },
  { label: 'DNI/RUC', field: 'numero_documento', type: 'input' },
  { label: 'Nombres', field: 'nombres', type: 'input' },
  { label: 'Primer Apellido', field: 'primer_apellido', type: 'input' },
  { label: 'Segundo Apellido', field: 'segundo_apellido', type: 'input' },
  { label: 'Rol', field: 'rol', type: 'input' },
  {
    label: 'Estado',
    field: 'estado',
    type: 'select',
    options: [
      {
        label: 'ACTIVO',
        value: 'ACTIVO'
      },
      {
        label: 'INACTIVO',
        value: 'INACTIVO'
      }
    ]
  }
]

const columns = [
  { name: 'acciones', label: 'Acciones', sortable: false },
  { name: 'activo', label: 'Activo', sortable: false },
  { name: 'nombre', label: 'Nombre Usuario', sortable: false },
  { name: 'numeroDocumento', label: 'Numero documento', sortable: false },
  { name: 'nombrePersona', label: 'Nombre completo', sortable: false },
  { name: 'cargo', label: 'Rol', sortable: false },
  { name: 'cargo', label: 'Caja', sortable: false },
  { name: 'celular', label: 'Correo electronico', sortable: false },
  { name: 'celular', label: 'Celular', sortable: false },
  { name: 'celular', label: 'Telefono', sortable: false },
  { name: 'estado', label: 'Estado', sortable: false }
]

export default {
  components: { CrudTable, Usuario },
  name: 'Dashboard',
  setup () {
    const _http = inject('http')
    const url = ref('usuario')
    const usuario = ref({
      persona: {
        numero_documento: null,
        fecha_nacimiento: null,
        nombres: null,
        primer_apellido: null,
        segundo_apellido: null,
        telefono: null,
        celular: null,
        correo_electronico: null,
        pais: 'PERU'
      },
      correo_electronico: null,
      foto_perfil: null,
      activo: true,
      usuario: null,
      contrasena: null,
      id_persona: null,
      id_rol: null,
      intentos_login: 0,
      codigo_desbloqueo: null,
      tiempo_bloqueo: null,
      ruta_inicio: null,
      id_caja: null
    })

    const resetForm = () => {
      usuario.value = {
        persona: {
          numero_documento: null,
          fecha_nacimiento: null,
          nombres: null,
          primer_apellido: null,
          segundo_apellido: null,
          telefono: null,
          celular: null,
          correo_electronico: null,
          pais: 'PERU'
        },
        correo_electronico: null,
        foto_perfil: null,
        activo: true,
        usuario: null,
        contrasena: null,
        id_persona: null,
        id_rol: null,
        intentos_login: 0,
        codigo_desbloqueo: null,
        tiempo_bloqueo: null,
        ruta_inicio: null,
        id_caja: null
      }
    }

    const openModal = async (open, id) => {
      resetForm()
      if (id) {
        usuario.value = await _http.get(`${url.value}/${id}`)
      }
      open()
    }

    const closeModal = (close) => {
      resetForm()
      close()
    }

    const guardar = async (update, close) => {
      if (usuario.value.id) {
        await _http.put(`${url.value}/${usuario.value.id}`, usuario.value)
      } else {
        await _http.post(`${url.value}`, usuario.value)
      }
      await update()
      closeModal(close)
    }

    const getNombreCompleto = (usuario) => {
      return `${usuario.persona.nombres || ''} ${usuario.persona.primer_apellido || ''} ${usuario.persona.segundo_apellido || ''}`
    }

    return {
      usuario,
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
