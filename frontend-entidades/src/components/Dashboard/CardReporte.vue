<script setup>
const props = defineProps({
  titulo: String,
  cantidad: [String, Number],
  color: String,
  icono: String,
  count: Number
})

</script>

<template>
  <q-card :class="`text-${props.color}`">
    <q-card-section class="text-center">
      <h5 class="text-bold">{{ props.titulo }}</h5>

      <h1 class="text-bold">
        <q-icon :name="icono"/>
      </h1>

      <h5 class="text-bold text-info">{{ count || 2 }} Registros</h5>
    </q-card-section>
  </q-card>
</template>
