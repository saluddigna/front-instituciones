<template>
    <div class="d-flex flex-column h-94">
    <div class="flex-1-1">
    </div>
    <div class="botonesBajos">
      <div class="my-2">
        <v-btn
          @click="logIn"
          class="letraNormal btnSolicitar"
          color="primary"
          :loading="status"
          :disabled="!disabled"
        >Generar Folio <i class="mdi mdi-chevron-right"></i></v-btn>
      </div>
    </div>
    </div>
</template>
<script>
export default {
  name: 'Asignar',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>