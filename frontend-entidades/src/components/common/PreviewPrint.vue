<script setup>
import { ref } from 'vue'

const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  tipo: {
    type: String,
    default: 'normal'
  },
  color: {
    type: String,
    default: 'primary'
  },
  icon: {
    type: String,
    default: 'print'
  },
  buttonLabel: {
    type: String,
    default: 'Imprimir'
  },
  label: {
    type: String,
    default: 'Descargar'
  }
})

const dialog = ref(false)
const urlLocal = ref(props.url)

const openDialog = () => {
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
  urlLocal.value = props.url
}

const imprimir = () => {
  urlLocal.value += '?print=true'
}
</script>

<template>
  <q-btn v-if="tipo === 'mini'" round flat :color="color" :icon="icon" @click="openDialog">
    <q-tooltip :class="`bg-${color} text-body2`">
      {{ label }}
    </q-tooltip>
  </q-btn>

  <div class="row">
    <div class="col-xs-12 text-center">
      <q-btn v-if="tipo === 'normal'" :color="color" :icon="icon" :label="label"  @click="imprimir"/>
    </div>
    <div class="col-xs-12" v-if="tipo === 'normal'">
      <iframe :src="urlLocal" frameborder="0" width="100%" height="800px"></iframe>
    </div>
    <div class="col-xs-12">
      <q-dialog v-model="dialog" persistent>
        <q-card style="width: 900px; max-width: 90vw;">
          <q-toolbar class="q-pa-md">
            <q-icon :name="icon" size="md" />

            <q-toolbar-title>
              {{ label }}
            </q-toolbar-title>

            <q-space />

            <q-btn flat round icon="close" @click="closeDialog" />
          </q-toolbar>

          <q-card-section class="q-pt-none">
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 text-center">
                <q-btn :color="color" :icon="icon" :label="buttonLabel" @click="imprimir" />
              </div>

              <div class="col-xs-12">
                <iframe  ame :src="urlLocal" frameborder="0" width="100%" height="630"></iframe>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
