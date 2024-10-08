<template>
  <q-page>
    <Titulo
      titulo="Dashboard"
      icono="dashboard"
    ></Titulo>
    <q-card
      class="q-mx-md"
      style="min-height: 300px;"
    >
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div
            v-for="(menu, index) of menus"
            :key="index"
            class="col-xs-12 col-md-3 col-lg-2"
            @click="$router.push(menu.ruta)">
            <CardReporte
              color="primary"
              :titulo="menu.nombre"
              :icono="menu.icono" />
          </div>
        </div>
        <!-- <p class="text-h5 text-bold text-center">Dahsboard en contrucco</p> -->
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CardReporte from 'components/Dashboard/CardReporte.vue'
import { useCoreStore } from 'src/stores/coreStore'

const coreStore = useCoreStore()
const menus = ref([])

onMounted(async () => {
  menus.value = coreStore.getMenu()
})

</script>
