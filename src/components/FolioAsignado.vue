<template>
  <div>
    <v-text-field
      v-model="filtroSearch"
      v-on:change="changeFiltro()"
      outlined
      label="Buscar por Nombre"
      append-icon="mdi-magnify"
      dense
    ></v-text-field>
    <imprimir :opcion="'todos'" :cupon="foliosAsignados" />
    <v-row>
      <v-col cols="6" class="pa-2" v-for="(folio,i) in foliosAsignados" :key="folio.id">
        <v-card class="card" >
          <div class="d-flex headerEstudio flex-row justify-start align-center" :style="'background-color:'+estudios[folio.estudioId-1].color">
            <div class="rounded-circle iconEstudio mx-2">
              <i v-if="folio.parentEstudioId==1" class="icon-densitometria" :style="'color:'+estudios[folio.parentEstudioId-1].color"></i>
              <i v-else-if="folio.parentEstudioId==2" class="icon-laboratorio" :style="'color:'+estudios[folio.parentEstudioId-1].color"></i>
              <i v-else-if="folio.parentEstudioId==3" class="icon-mastografia" :style="'color:'+estudios[folio.parentEstudioId-1].color"></i>
              <i v-else-if="folio.parentEstudioId==4" class="icon-papanicolau" :style="'color:'+estudios[folio.parentEstudioId-1].color"></i>
              <i v-else-if="folio.parentEstudioId==5" class="icon-rayos-x" :style="'color:'+estudios[folio.parentEstudioId-1].color"></i>
              <i v-else-if="folio.parentEstudioId==6" class="icon-ultrasonido" :style="'color:'+estudios[folio.parentEstudioId-1].color"></i>
              <i v-else-if="folio.parentEstudioId==7" class="icon-electrocardiograma" :style="'color:'+estudio[folio.estudioId-1].color"></i>
              <i v-else-if="folio.parentEstudioId==8" class="icon-tomografia" :style="'color:'+estudios[folio.parentEstudioId-1].color"></i>
              <i v-else-if="folio.parentEstudioId==9" class="icon-resonancia" :style="'color:'+estudios[folio.parentEstudioId-1].color"></i>
              <i v-else-if="folio.parentEstudioId==10" class="icon-nutricion2" :style="'color:'+estudios[folio.parentEstudioId-1].color"></i>
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
          <imprimir :opcion="'solo'" :cupon="[folio]" />
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
    flecha:[true,true,true,true,true,true,true,true],
    dataUser:null,
    foliosA:null,
    filtroSearch:null
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
  methods:{ 
    // clicFlecha(index){
    //   if (this.foliosAsignados[index].flecha==undefined){
    //       this.foliosAsignados[index].flecha=true
    //   }else
    //     this.foliosAsignados[index].flecha=!this.foliosAsignados[index].flecha
    //   console.log(this.foliosAsignados[index].flecha,index)
    // },
   getFoliosAsignados(filtro){
     console.log(filtro)
      foliosService.getAsignados(this.dataUser.institution.id,filtro).then(res=>{
        let data=res.map(x=>{
        return{
          beneficiaryId:x.beneficiaryId,
          beneficiaryName:x.beneficiaryName,
          beneficiaryMaternalName:x.beneficiaryMaternalName,
          beneficiaryPaternalName:x.beneficiaryPaternalName,
          clincaName:x.clincaName,
          clinicaId:x.clinicaId,
          estudioDescription:x.estudioDescription,
          estudioId:x.estudioId,
          estudioName:x.estudioName,
          estudioPreparacion:x.estudioPreparacion,
          flecha:true,
          folio:x.folio,
          id:x.id,
          statusSolicitude:x.statusSolicitude,
        }
        });
        console.log(data)
        this.foliosAsignados=data;
      })
    },
    llenarDatos(f){
      this.foliosA=f
    },
    changeFiltro(){
      console.log(this.filtroSearch)
      this.getFoliosAsignados(this.filtroSearch)
    }
  }

}
</script>