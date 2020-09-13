<template>
  <div>
    <v-text-field
      outlined
      label="Buscar por Nombre"
      append-icon="mdi-magnify"
      dense
    ></v-text-field>
    <imprimir />
    <v-col cols="6" class="pa-0">
      <v-card v-for="(folio,i) in foliosAsignados" :key="folio.id">
        <div class="d-flex headerEstudio flex-row justify-start align-center" :style="'background-color:'+estudios[folio.estudioId-1].color">
          <div class="rounded-circle iconEstudio mx-2">
            <i v-if="folio.estudioId==1" class="icon-densitometria" :style="'color:'+estudios[folio.estudioId-1].color"></i>
            <i v-else-if="folio.estudioId==2" class="icon-laboratorio" :style="'color:'+estudios[folio.estudioId-1].color"></i>
            <i v-else-if="folio.estudioId==3" class="icon-mastografia" :style="'color:'+estudios[folio.estudioId-1].color"></i>
            <i v-else-if="folio.estudioId==4" class="icon-papanicolau" :style="'color:'+estudios[folio.estudioId-1].color"></i>
            <i v-else-if="folio.estudioId==5" class="icon-rayos-x" :style="'color:'+estudios[folio.estudioId-1].color"></i>
            <i v-else-if="folio.estudioId==6" class="icon-ultrasonido" :style="'color:'+estudios[folio.estudioId-1].color"></i>
            <i v-else-if="folio.estudioId==7" class="icon-electrocardiograma" :style="'color:'+estudio[folio.estudioId-1].color"></i>
            <i v-else-if="folio.estudioId==8" class="icon-tomografia" :style="'color:'+estudios[folio.estudioId-1].color"></i>
            <i v-else-if="folio.estudioId==9" class="icon-resonancia" :style="'color:'+estudios[folio.estudioId-1].color"></i>
            <i v-else-if="folio.estudioId==10" class="icon-nutricion2" :style="'color:'+estudios[folio.estudioId-1].color"></i>
          </div>
          <span class="tituloEstudio">{{folio.estudio}}</span>
        </div>
        <div>
          <div class="d-flex flex-row justify-center align-center">
            <button class="estudioInfo" @click="flecha[i]= true">
              <span class="text-center">Datos <i color="primary" class="mdi flechaUpDown" :class="{'mdi-chevron-up':(flecha[i]||flecha[i]===undefined||flecha[i]==null),'mdi-chevron-down':!flecha[i]}"></i></span>
            </button>
            <button class="estudioInfo bl-1-gray" @click="flecha[i]= false">
              <span class="text-center">Preparación <i color="primary" class="mdi flechaUpDown" :class="{'mdi-chevron-down':(flecha[i]||flecha[i]===undefined||flecha[i]==null),'mdi-chevron-up':!flecha[i]}"></i></span>
            </button>
          </div>
        </div>
        <div v-if="flecha[i]" class="pa-2 infoFolio">
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
          <!-- {{ folio.preparacion }} -->
        </div>
        <div class="d-flex flex-row justify-center align-center pa-1">
          <a href="#" @click="llenarDatos(folio)" class="datosFolio text-center">Imprimir</a>
        </div>
      </v-card>
    </v-col>
  </div>
</template>
<script>
import Imprimir from './Imprimir'
import foliosService from '../services/folios'

export default {
  name:'FolioAsignado',
  data: () => ({
    flecha:[true,true,true,true,true,true,true,true],
    dataUser:null,
    // foliosAsignados:[{estudioId:2,estudio:'Laboratorio',nombre:'Christian', apellidoP:'Pulido',apellidoM:'Quintero', clinica:'Navolato',status:0,folio:14021996, preparacion:'Sin preparacion'}]
  }),
  mounted(){
    this.dataUser = JSON.parse(sessionStorage.getItem('dataUser'))
  },
  components: {
    Imprimir
  }, 
  props:{
    estudios:{},
    foliosAsignados:null
  },
  async getFoliosAsignados(){
      await foliosService.getAsignados(this.dataUser.institution.id).then(res=>{
        this.foliosAsignados=res;
        console.log(this.foliosDisponibles)
      })
    }
}
</script>