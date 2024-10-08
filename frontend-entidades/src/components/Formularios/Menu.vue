<script>
console.log('ingresaaaa...')
import { useVModel } from '../../composables/useVModel.js'
import { ref, onMounted, inject } from 'vue'
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
console.log('export default...')
export default {
  props: {
    valores: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const Http = inject('http')
    const valoresModel = useVModel(props, 'valores')
    const menus = ref([])
    const IconList = ref(IconListOriginal)
    const urlMenu = ref('system/menus/padre')
    const menusPadres = ref([])

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

    console.log('onMounted...')
    onMounted(async () => {
      console.log('intenta_peticion')
      const menusPeticion = await Http.get(`${urlMenu.value}`)
      menusPadres.value = menusPeticion
      console.log('menus_padres', menusPadres)
    })

    return {
      IconList,
      IconListOriginal,
      valoresModel,
      valoresRules,
      menus,
      menusPadres,
      filtrarOpciones
    }
  }
}

</script>
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
    <q-select
      filled
      class="col-xs-12 col-md-6"
      v-model="valoresModel.menuPadreId"
      :options="menusPadres"
      label="Menu padre"
      option-value="id"
      option-label="nombre"
      emit-value
      map-options
    />
    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Ruta"
      v-model="valoresModel.ruta"
      :rules="valoresRules.ruta"
    />

    <q-input
      filled
      class="col-xs-12 col-md-6"
      label="Descripcion"
      v-model="valoresModel.descripcion"
      :rules="valoresRules.descripcion"
    />

    <q-select
      filled
      use-input
      class="col-xs-12 col-md-6"
      label="Icono"
      :options="IconList"
      v-model="valoresModel.icono"
      :rules="valoresRules.icono"
      @filter="filtrarOpciones"
    >
      <template v-slot:append>
        <q-icon
          size="md"
          color="secondary"
          :name="valoresModel.icono"
          class="q-ml-md"
        />
      </template>

      <template v-slot:option="props">
        <q-item
          v-bind="props.itemProps"
          v-on="props.itemEvents"
        >
          <q-item-section avatar>
            <q-icon :name="props.opt" />
          </q-item-section>
          <q-item-section>
            <q-item-label><span v-html="props.opt"></span></q-item-label>
            <q-item-label caption>{{ props.opt }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>

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
