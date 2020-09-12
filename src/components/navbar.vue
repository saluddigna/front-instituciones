<template>
  <v-app-bar
  app
  color="white"
  >
    <v-img
      alt="La salud es para todos"
      class="ml-4 logoSD"
      contain
      src="../assets/imgs/logo.svg"
      max-width="200"
    />
    
  <v-spacer></v-spacer>
    <v-img
      alt="Mas por los demás"
      class="shrink mt-1 mr-5"
      contain
      min-width="100"
      src="../assets/imgs/Mas.svg"
      width="100"
    />
  <v-spacer v-if="ruta=='/inicio'"></v-spacer>

    <v-btn v-show="ruta=='/inicio'"
      text
      @click="cerrarSesion"
    >
      <v-img
        alt="Mas por los demás"
        class="mr-2"
        contain
        min-width="9"
        src="../assets/imgs/iconos/Icono login.svg"
        width="15"
      />
      <span class="mr-2 letraNormal">Cerrar sesión</span>
      
    </v-btn>
  </v-app-bar>
</template>
<style>
  .logoSD{
    position: relative;
    left: 40px
  }
  .letraNormal{
    text-transform: initial;
  }
</style>
<script>
export default {
  name: "Navbar",
  data: () => ({
    ruta:window.location.pathname
  }),
  methods:{
    cerrarSesion(){
      window.location.href = '/'
      sessionStorage.clear()
    }
  }
}
</script>