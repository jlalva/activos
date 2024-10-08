<template>
  <q-form
    class="row q-col-gutter-md"
    @submit="$emit('guardar')"
  >
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Nombre"
      v-model="valoresModel.nombre"
      :rules="valoresRules.nombre"
    />

    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Descripcion"
      v-model="valoresModel.descripcion"
      :rules="valoresRules.descripcion"
    />

    <div class="col-xs-12">
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">
              <span class="text-primary text-bold">
                Menu
              </span>
            </th>

            <th class="text-left">
              <span class="text-primary text-bold">
                Ver
              </span>
            </th>

            <th class="text-left">
              <span class="text-primary text-bold">
                Agregar
              </span>
            </th>

            <th class="text-left">
              <span class="text-primary text-bold">
                Editar
              </span>
            </th>

            <th class="text-left">
              <span class="text-primary text-bold">
                Eliminar
              </span>
            </th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(menu, index) of valoresModel.menus"
            :key="index">
            <td class="text-left">
              <span class="text-info text-bold">
                <q-icon :name="menu.icono" size="sm" class="q-mr-md"/>

                {{ menu.nombre }}
              </span>
            </td>

            <td class="text-left">
              <q-toggle v-model="valoresModel.menus[index].ver"/>
            </td>

            <td class="text-left">
              <q-toggle v-model="valoresModel.menus[index].agregar"/>
            </td>

            <td class="text-left">
              <q-toggle v-model="valoresModel.menus[index].editar"/>
            </td>

            <td class="text-left">
              <q-toggle v-model="valoresModel.menus[index].eliminar"/>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <div class="col-xs-12 text-right">
      <q-btn
        class="q-ml-sm"
        icon="close"
        label="Cancelar"
        @click="$emit('cancelar')"
      />
      <q-btn
        class="q-ml-sm"
        icon="check"
        color="primary"
        label="Guardar"
        type="submit"
      />
    </div>
  </q-form>
</template>
<script>

import { useVModel } from '../../composables/useVModel.js'
import { ref } from 'vue'
import validaciones from '../../common/validations'
import IconListOriginal from '../../common/IconList'

const valoresRules = {
  nombre: [
    validaciones.requerido
  ],
  ruta: [
    validaciones.requerido
  ],
  icono: [
    validaciones.requerido
  ],
  orden: [
    validaciones.requerido
  ]
}

export default {
  props: {
    valores: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const valoresModel = useVModel(props, 'valores')
    const menus = ref([])
    const IconList = ref(IconListOriginal)

    const filtrarOpciones = (val, update) => {
      if (val === '') {
        update(() => {
          IconList.value = IconListOriginal
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        IconList.value = IconListOriginal.filter(v => v.toLowerCase().includes(needle))
      })
    }

    return {
      IconList,
      IconListOriginal,
      valoresModel,
      valoresRules,
      menus,
      filtrarOpciones
    }
  }
}
</script>
