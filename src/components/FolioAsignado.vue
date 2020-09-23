<template>
  <div>
    <v-text-field
      v-model="filtroSearch"
      outlined
      label="Buscar por Nombre"
      append-icon="mdi-magnify"
      :loading="loading"
      dense
    ></v-text-field>
    <imprimir :opcion="'todos'" :cupon="foliosAsignados" :id="'0'" v-show="foliosAsignados.length!=0" />
    <v-row >
      <v-col cols="6" class="pa-2" v-for="(folio,i) in foliosAsignados" :key="folio.id">
        <v-card class="card" >
          <div class="d-flex headerEstudio flex-row justify-start align-center" :class="{'bg-densi': folio.parentEstudioId==1,'bg-lab': folio.parentEstudioId==2, 'bg-masto': folio.parentEstudioId==3,'bg-papa': folio.parentEstudioId==4,'bg-ultra': folio.parentEstudioId==6, 'bg-electro': folio.parentEstudioId==7}">
            <div class="rounded-circle iconEstudio mx-2">
              <i v-if="folio.parentEstudioId==1" class="icon-densitometria color-densi" ></i>
              <i v-else-if="folio.parentEstudioId==2" class="icon-laboratorio color-lab" ></i>
              <i v-else-if="folio.parentEstudioId==3" class="icon-mastografia color-masto" ></i>
              <i v-else-if="folio.parentEstudioId==4" class="icon-papanicolau color-papa" ></i>
              <!-- <i v-else-if="folio.parentEstudioId==5" class="icon-rayos-x" :style="'color:'+estudios[folio.parentEstudioId-1].color"></i> -->
              <i v-else-if="folio.parentEstudioId==6" class="icon-ultrasonido color-ultra" ></i>
              <i v-else-if="folio.parentEstudioId==7" class="icon-electrocardiograma color-electro" ></i>
              <!-- <i v-else-if="folio.parentEstudioId==8" class="icon-tomografia" :style="'color:'+estudios[folio.parentEstudioId-1].color"></i>
              <i v-else-if="folio.parentEstudioId==9" class="icon-resonancia" :style="'color:'+estudios[folio.parentEstudioId-1].color"></i>
              <i v-else-if="folio.parentEstudioId==10" class="icon-nutricion2" :style="'color:'+estudios[folio.parentEstudioId-1].color"></i> -->
            </div>
            <span class="tituloEstudio">{{folio.estudioName}}</span>
          </div>
          <div>
            <div class="d-flex flex-row justify-center align-center">
              <button class="estudioInfo" @click="foliosAsignados[i].flecha=true">
                <span class="text-center">Datos <i color="primary" class="mdi flechaUpDown" :class="{'mdi-chevron-up':(folio.flecha||folio.flecha===undefined||folio.flecha==null),'mdi-chevron-down':!folio.flecha}"></i></span>
              </button>
              <button class="estudioInfo bl-1-gray" @click="foliosAsignados[i].flecha=false">
                <span class="text-center">Preparación <i color="primary" class="mdi flechaUpDown" :class="{'mdi-chevron-down':(folio.flecha||folio.flecha===undefined||folio.flecha==null),'mdi-chevron-up':!folio.flecha}"></i></span>
              </button>
            </div>
          </div>
          <div v-if="folio.flecha==true || folio.flecha==undefined" class="pa-2 infoFolio">
            <b>Folio:</b>  {{folio.folio}}
            <br />
            <b>Nombre:</b>  {{folio.beneficiaryName}}
            <br />
            <b>Apellido P:</b>  {{ folio.beneficiaryPaternalName }}
            <br />
            <b>Apellido M:</b> {{ folio.beneficiaryMaternalName }}
            <br />
            <b>Clínica:</b> {{ folio.clincaName }}
            <br />
            <!-- <b>Estatus:</b> {{ folio.status }} -->
          </div>
          <div v-else class="pa-4 prepaFolio">
            {{ folio.estudioPreparacion }}
          </div>
          <!-- <div class="d-flex flex-row justify-center align-center pa-1">
            <a href="#"  class="datosFolio text-center">Imprimir</a>
          </div> -->
          <imprimir :opcion="'solo'" :cupon="[folio]" :id="folio.folio" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<style>
  .card{
    width: 262px;
    margin: 10px;
  }
  
</style>
<script>
import Imprimir from './Imprimir'
import foliosService from '../services/folios'

export default {
  name:'FolioAsignado',
  data: () => ({
    dataUser:null,
    foliosA:null,
    filtroSearch:null,
    loading:false
    // foliosAsignados:[{estudioId:2,estudio:'Laboratorio',nombre:'Christian', apellidoP:'Pulido',apellidoM:'Quintero', clinica:'Navolato',status:0,folio:14021996, preparacion:'Sin preparacion'}]
  }),
  mounted(){
    this.dataUser = JSON.parse(sessionStorage.getItem('dataUser'))
    // this.getFoliosAsignados()
  },
  components: {
    Imprimir
  }, 
  props:{
    estudios:{},
   foliosAsignados:null,
    
  },
  watch: {
      filtroSearch: function () {
        this.loading=true
        if (!this.awaitingSearch) {
            setTimeout(() => {
              this.getFoliosAsignados(this.filtroSearch)
          }, 2000); // 1 sec delay
        }
      
      }
  },
  methods:{ 
   getFoliosAsignados(filtro){
     console.log(filtro)
      foliosService.getAsignados(this.dataUser.institution.id,filtro).then(res=>{
        let data=res.map(x=>{
        x.flecha=true
        return x
        })
        this.foliosAsignados=data
        this.loading=false
      })
    },
    llenarDatos(f){
      this.foliosA=f
    },
  }
}
</script>