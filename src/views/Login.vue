<template>
  <div class="login">
    <ingresar />
  </div>
</template>
<style>
  .login{
    background-image: url("../assets/imgs/fondos/Imagen login.png");
    background-repeat: no-repeat;
    background-size: cover;
    overflow-x: hidden;
    height: 100%;
  }
</style>
<script>
// @ is an alias to /src
import Ingresar from '@/components/Ingresar.vue'

export default {
  name: 'Home',
  components: {
    Ingresar
  }
}
</script>
