<template>
  <div class="inicio">
    <v-container>
      <v-row>
        <v-col cols="12" md="6" class="offset-md-6">
        <div class="tabs d-flex px-5">
              <div class="tab" @click="multi=0" :class="{'activo': multi==0}">
                <h4>Instituciones</h4>
              </div>
              <div class="tab" @click="multi=1" :class="{'activo': multi==1}">
                <h4>Congreso Médico Internacional</h4>
              </div>
        </div>
        </v-col>

        <v-col cols="12" md="6" class="offset-md-6" v-if="!multi">
          <h2 class="text-center">{{institucion}}</h2>
          <!-- <h3 class="text-center">{{ext}}</h3> -->
          <v-card class="h-75">
            <div class="tabs d-flex px-5">
              <div class="tab" @click="activar=0" :class="{'activo': activar==0}">
                <h4>Solicitar nuevos folios</h4>
              </div>
              <div class="tab" @click="activar=1" :class="{'activo': activar==1}">
                <h4>Asignar folio a beneficiario</h4>
              </div>
            </div>
            <solicitar v-if="!activar" multi='false' />
            <asignar v-else />
          </v-card>
        </v-col>
        <v-col cols="12" md="6" class="offset-md-6" v-if="multi">
          <h2 class="text-center">{{institucion}} Congreso Médico</h2>
          <!-- <h3 class="text-center">{{ext}}</h3> -->
          <v-card class="h-75">
            <div class="tabs d-flex px-5">
              <div class="tab" @click="activar=0" :class="{'activo': activar==0}">
                <h4>Solicitar nuevos folios</h4>
              </div>
              <div class="tab" @click="activar=1" :class="{'activo': activar==1}">
                <h4>Asignar folio a beneficiario</h4>
              </div>
            </div>
            <solicitar v-if="!activar" multi='true' />
            <AsignarMulti v-else />
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
   position: relative;
    top: 2px;
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
import AsignarMulti from '../components/Asignar-multi'
export default {
  name: "Inicio",
  components: {
    Solicitar,
    Asignar,
    AsignarMulti
  },
  data: () => ({
    institucion:JSON.parse(sessionStorage.getItem('dataUser')).institution.name,
    ext:'Facultad de Ingeniería',
    activar:0,
    multi:0
  }),
  mounted(){
       let dataUser = JSON.parse(sessionStorage.getItem('dataUser'))   
          if(!dataUser){
              window.location.href ='/'
          }    
  }
  // ,
  // methods:{
  //     validaUsuario(){ 
  //         let dataUser = JSON.parse(sessionStorage.getItem('dataUser'))   
  //         if(!dataUser){
  //             window.location.href ='/'
  //         }                
  //     }
  // }
}
</script>