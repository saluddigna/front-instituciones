<template>
  <div class="inicio">
    <v-container>
      <v-row>
        <v-col cols="12" md="6" class="offset-md-6">
          <h2 class="text-center">{{institucion}}</h2>
          <h3 class="text-center">{{ext}}</h3>
          <v-card class="h-75">
            <div class="tabs d-flex px-5">
              <div class="tab" @click="activar=0" :class="{'activo': activar==0}">
                <h4>Solicitar nuevos folios</h4>
              </div>
              <div class="tab" @click="activar=1" :class="{'activo': activar==1}">
                <h4>Asignar folio a beneficiario</h4>
              </div>
            </div>
            <solicitar v-if="!activar" />
            <asignar v-else />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style>
 .inicio{
    background-image: url("../assets/imgs/fondos/Imagen principal.png");
    background-position-x: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow-x: hidden;
    height: 100%;
 }
 .h-75{
   height: 75vh;
 }
 .tabs{
   flex-direction: row;
   margin-bottom: -2px;
   border-bottom: 2px solid #e5e5e5;
 }
 .tab{
   flex: 1 1 auto;
   background-color:white;
   height: 40px;
   display: flex;
   justify-content: center;
   align-items: center;
   color: #AFAFAF;
   cursor: pointer;
   border-bottom: 2px solid #e5e5e5;
   font-weight:normal!important;
 }
 .tab h4{
   font-weight: normal;
   font-size: 18px;
 }
 .tab.activo{
   border-top: 2px solid #E5E5E5;
   border-left: 2px solid #E5E5E5;
   border-right: 2px solid #E5E5E5;
   border-bottom: 0;
   border-radius: 2px 2px 0 0;
   color: #666;
   cursor: default;
 }
</style>
<script>
import Solicitar from '../components/Solicitar'
import Asignar from '../components/Asignar'
export default {
  name: "Inicio",
  components: {
    Solicitar,
    Asignar
  },
  data: () => ({
    institucion:'Universidad Autónoma de Sinaloa',
    ext:'Facultad de Ingeniería',
    activar:0
  }),
}
</script>