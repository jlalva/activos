<template>
  <div class="row">
    <div class="col-xs-12">
      <q-dialog
        v-model="crudTableModal"
        persistent
      >
        <slot
          name="form"
          :close="closeModal"
          :update="updateList"
        >Agregue su formulario aquí</slot>
      </q-dialog>
    </div>

    <div class="col-xs-12">
      <q-card class="q-ma-md">
        <div class="row q-col-gutter-md">
          <div
            v-if="isOpenExpandible"
            :class="{ 'col-md-12': true, 'col-lg-5': isOpenExpandible }">
            <slot
              name="expandible"
              :close="closeModal"
              :closeExpandible="closeExpandible"
              :update="updateList"
                ></slot>
          </div>

          <div :class="{ 'col-md-12': true, 'col-lg-7': isOpenExpandible }">
            <q-toolbar
              inset
              class="q-gutter-md q-px-md q-pb-md"
            >
              <slot
                name="buttons"
                :open="openModal"
                :openExpandible="openExpandible"
              ></slot>

              <q-btn
                v-if="csvName"
                label="Exportar datos"
                icon="download"
                color="positive"
                @click="exportCsv">

              </q-btn>

              <q-btn
                v-if="filters.length > 0"
                @click="toggleSearch()"
              >
                <q-icon
                  center
                  :name="enableSearch ? 'close' : 'search'"
                />
                <q-tooltip>{{ enableSearch ? 'Cerrar filtros' : 'Abrir filtros' }}</q-tooltip>
              </q-btn>
              <q-btn @click="updateList()">
                <q-icon
                  center
                  name="refresh"
                />
                <q-tooltip>Actualizar página</q-tooltip>
              </q-btn>
              <slot name="buttons-end"></slot>
            </q-toolbar>

            <q-table
              v-model:pagination="pagination"
              :grid="grid"
              :rows="registros"
              :columns="getColumns"
              :loading="loading"
              :rows-per-page-options="[10, 25, 50, 100]"
              :pagination-label="getPaginationLabel"
              no-data-label="No existe registros disponibles"
              no-results-label="No existe registros"
              loading-label="Cargando..."
              rows-per-page-label="Filas por pagina"
              v-model:selected="selectedModel"
              @request="getData"
              :wrap-cells="true"
            >
              <template
                v-slot:top v-if="enableSearch">
                <div class="row q-col-gutter-md no-padding full-width">
                  <div
                    v-for="(item, index) of filters"
                    :key="index"
                    align="center"
                    class="col-grow"
                  >
                    <q-select
                      v-if="item.type === 'select'"
                      v-model="search[item.field]"
                      :options="item.options"
                      :label="item.label"
                      behavior="menu"
                      clearable
                      filled
                      dense
                      emit-value
                      map-options
                      :autofocus="index === 0"
                    />
                    <q-checkbox
                      v-if="item.type === 'checkbox'"
                      v-model="search[item.field]"
                      :label="item.label"
                      filled
                      dense
                      :autofocus="index === 0"
                    />
                    <q-input
                      v-if="item.type === 'input'"
                      v-model="search[item.field]"
                      :label="item.label"
                      clearable
                      filled
                      dense
                      :autofocus="index === 0"
                    />
                    <q-input
                      v-if="item.type === 'date'"
                      v-model="search[item.field]"
                      :label="item.label"
                      clearable
                      filled
                      dense
                    >
                      <template
                        v-slot:append
                      >
                        <q-icon
                          name="event"
                          class="cursor-pointer"
                        ></q-icon>
                        <q-popup-proxy
                          :ref="item.field"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="search[item.field]"
                            color="secondary"
                            mask="YYYY-MM-DD"
                            @update:model-value="$refs[item.field].hide()"
                          />
                        </q-popup-proxy>
                      </template>
                    </q-input>
                  </div>
                </div>
              </template>
              <template v-slot:body="props">
                <slot
                  :props="props"
                  :row="props.row"
                  :open="openModal"
                  :openExpandible="openExpandible"
                  :update="updateList"
                  :eliminar="eliminar"
                  :cambiarEstado="cambiarEstado"
                  name="row"
                />
              </template>

              <template v-slot:item="props">
                <slot
                  :row="props.row"
                  :selected="selectedModel"
                  :open="openModal"
                  :openExpandible="openExpandible"
                  :update="updateList"
                  :cambiarEstado="cambiarEstado"
                  name="item"
                />
              </template>

            </q-table>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, inject, watch, onMounted, computed } from 'vue'
import { useQuasar, exportFile } from 'quasar'
import { useVModel } from 'src/composables/useVmodel'

export default {
  name: 'CrudTable',
  props: {
    filters: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    url: {
      type: String,
      default: 'url'
    },
    order: {
      type: String,
      default: () => ''
    },
    grid: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Array,
      default: () => ([])
    },
    csvName: { type: String, default: '' }
  },
  setup (props) {
    const _http = inject('http')
    const _message = inject('message')
    const $q = useQuasar()

    const urlCrud = ref(props.url)
    const loading = ref(false)
    const search = ref({})
    const enableSearch = ref('')
    const registros = ref([])
    const pagination = ref({
      sortBy: props.order,
      descending: true,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
      'rows-per-page-label': 'Páginas'
    })
    const division = ref(12)
    const tamanioColumna = ref(12)
    const crudTableModal = ref(false)
    const selectedModel = useVModel(props, 'selected')

    const isOpenExpandible = ref(false)

    onMounted(() => {
      division.value = parseInt(props.filters.length / 12)
      tamanioColumna.value = division.value > 1 ? division.value : 2
      updateList()
    })

    const updateList = async () => {
      await getData({
        pagination: pagination.value,
        filter: undefined
      })
    }

    const getData = async (props) => {
      loading.value = true
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const query = {
        limit: rowsPerPage === 0 ? 99999 : rowsPerPage,
        page
      }
      if (sortBy) {
        query.order = (descending ? '-' : '') + sortBy
      }

      if (Object.keys(search.value).length) {
        for (const key of Object.keys(search.value)) {
          if (search.value[key]) {
            if (search.value[key].toString().length > 0) {
              query[key] = search.value[key]
            }
          }
        }
      }
      const { rows, count } = await _http.get(_http.convertQuery(urlCrud.value, query), false)
      if (rows) {
        registros.value = rows
        pagination.value = props.pagination
        pagination.value.rowsNumber = count
      }
      loading.value = false
    }

    const toggleSearch = () => {
      enableSearch.value = !enableSearch.value
      search.value = {}
    }

    const getColumns = computed(() => {
      const items = []
      for (const el of props.columns) {
        el.align = 'center'
        items.push(el)
      }
      return items
    })

    const getPaginationLabel = (firstRowIndex, endRowIndex, totalRowsNumber) => {
      return `${firstRowIndex} - ${endRowIndex} de ${totalRowsNumber}`
    }

    watch(() => { return { ...search.value } }, async (value) => {
      await getData({
        pagination: pagination.value,
        filter: undefined
      })
    })

    const eliminar = ({ titulo, mensaje, aceptar, cancelar, url }) => {
      $q.dialog({
        title: titulo || 'Confirmacion',
        message: mensaje || '¿Esta seguro de eliminar el registro?',
        persistent: true,
        ok: {
          color: 'primary',
          label: 'Aceptar'
        },
        cancel: {
          color: 'white',
          'text-color': 'black',
          label: 'Cancelar'
        }
      }).onOk(async () => {
        if (aceptar) {
          await aceptar()
        } else {
          await _http.delete(url)
        }
        _message.success('Eliminado de manera correcta.')
        await updateList()
      }).onCancel(async () => {
        if (cancelar) {
          await cancelar()
        }
      })
    }

    const cambiarEstado = async ({ registro, url, titulo, mensaje, aceptar, cancelar }) => {
      const estadoOriginal = registro.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'
      $q.dialog({
        title: titulo || 'Confirmacion',
        message: mensaje || `Esta seguro de que quiere ${registro.estado === 'ACTIVO' ? 'activar' : 'desactivar'} este registro?`,
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
        if (aceptar) {
          await aceptar()
        } else {
          await _http.put(url, registro)
        }
        _message.success(`Se ${registro.estado === 'ACTIVO' ? 'activo' : 'desactivo'} el registro de manera exitosa.`)
        await updateList()
      }).onCancel(async () => {
        if (cancelar) {
          await cancelar()
        } else {
          registro.estado = estadoOriginal
        }
      })
    }

    const jsonToCsv = (jsonData) => {
      if (!jsonData || jsonData.length === 0) {
        return ''
      }

      // Obtener las claves (encabezados) del primer objeto en el JSON
      const headers = Object.keys(jsonData[0])

      // Crear una fila de encabezado CSV
      const csvHeader = headers.join(',') + '\n'

      // Mapear los datos JSON a filas CSV
      const csvRows = jsonData.map((row) =>
        headers.map((header) => {
          // Escapar las comas dentro de los valores
          const escapedValue = row[header]?.toString()?.replace(/,/g, '\\,')
          return `"${escapedValue}"`
        }).join(',')
      )

      // Unir las filas en un formato CSV completo
      const csvContent = csvHeader + csvRows.join('\n')

      return csvContent
    }

    const exportCsv = () => {
      const contenidoCsv = jsonToCsv(registros.value)
      const status = exportFile(`${props.csvName}.csv`, contenidoCsv)

      if (status === true) {
        // browser allowed it
      } else {
        // browser denied it
        console.log('Error: ' + status)
      }
    }

    return {
      exportCsv,
      persistent: ref(true),
      search,
      enableSearch,
      registros,
      pagination,
      urlCrud,
      getColumns,
      page: ref(1),
      limit: ref(5),
      loading,
      crudTableModal,
      selectedModel,
      eliminar,
      cambiarEstado,
      getData,
      toggleSearch,
      updateList,
      openModal: () => { crudTableModal.value = true },
      closeModal: () => { crudTableModal.value = false },
      isOpenExpandible,
      openExpandible: () => { isOpenExpandible.value = true },
      closeExpandible: () => { isOpenExpandible.value = false },
      getPaginationLabel
    }
  }
}
</script>
