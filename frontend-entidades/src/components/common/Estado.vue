<template>
  <section>
    <q-chip
      v-if="estado === 'ACTIVO'"
      square
      color="info"
      text-color="white"
      label="ACTIVO"
    />

    <q-chip
      v-if="estado === 'INACTIVO'"
      square
      color="warning"
      text-color="white"
      label="INACTIVO"
    />

    <q-chip
      v-if="estado === 'BORRADOR'"
      square
      color="negative"
      text-color="white"
      label="BORRADOR" />

    <q-chip
      v-if="estado === 'PRE APROBADO'"
      square
      color="info"
      text-color="white"
      label="PRE APROBADO" />

    <q-chip
      v-if="estado === 'OBSERVADO'"
      square
      color="negative"
      text-color="white"
      label="OBSERVADO" />

    <q-chip
      v-if="estado === 'APROBADO'"
      square
      color="primary"
      text-color="white"
      label="APROBADO" />

    <q-chip
      v-if="estado === 'DESEMBOLSADO'"
      square
      color="positive"
      text-color="white"
      label="DESEMBOLSADO" />

    <q-chip
      v-if="estado === 'PENDIENTE'"
      square
      color="warning"
      text-color="white"
      label="PENDIENTE" />

    <q-chip
      v-if="estado === 'PAGADO'"
      square
      color="positive"
      text-color="white"
      label="PAGADO" />

    <q-chip
      v-if="estado === 'COMPLETADO'"
      square
      color="positive"
      text-color="white"
      label="COMPLETADO" />

      <!-- ESTADOS CAJA / BOVEDA -->
    <q-chip
      v-if="estado === 'CERRADA'"
      square
      color="negative"
      text-color="white"
      label="CERRADA" />

    <q-chip
      v-if="estado === 'ABIERTA'"
      square
      color="positive"
      text-color="white"
      label="ABIERTA" />
  </section>
</template>
<script>
export default {
  props: {
    estado: {
      type: String,
      default: () => 'ACTIVO'
    }
  }
}
</script>
