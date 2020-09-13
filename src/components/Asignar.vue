<template>
  <div class="d-flex flex-column h-94">
    <div class="flex-1-1 contenedor" v-if="!listo">
      <div v-show="panel!=2" class="sd-navs-areas">
        <div class="sd-previous" @click="derecha=false">
            <i class="icon-angle-left-4"></i>
        </div>
        <div class="sd-next" @click="derecha=true">
            <i class="icon-angle-right-4"></i>
        </div>
      </div>
      <div v-show="panel!=2" class="miniCarrusel flex-row" :class="{'carruselD':derecha, 'd-flex': panel!=2}">
        <div id="carrusel" class="rounded-circle estudioCarrusel ma-2" v-for="estudio in estudios" :key="estudio.id" :style="'border:2px solid '+estudio.color+';'+(activo==estudio.id?('background-color:'+estudio.color+'; fill: #fff;'):'')" @click="activo=estudio.id, study=estudio" >
          <i v-if="estudio.id==1" :class="{'activo':activo==estudio.id}" class="icon-densitometria" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==2" :class="{'activo':activo==estudio.id}" class="icon-laboratorio" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==3" :class="{'activo':activo==estudio.id}" class="icon-mastografia" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==4" :class="{'activo':activo==estudio.id}" class="icon-papanicolau" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==5" :class="{'activo':activo==estudio.id}" class="icon-rayos-x" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==6" :class="{'activo':activo==estudio.id}" class="icon-ultrasonido" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==7" :class="{'activo':activo==estudio.id}" class="icon-electrocardiograma" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==8" :class="{'activo':activo==estudio.id}" class="icon-tomografia" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==9" :class="{'activo':activo==estudio.id}" class="icon-resonancia" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==10" :class="{'activo':activo==estudio.id}" class="icon-nutricion2" :style="'color:'+estudio.color"></i>
        </div>
      </div>
      <v-expansion-panels accordion v-model="panel">
        <v-expansion-panel >
          <v-expansion-panel-header>
            Generar folio 
            <template v-slot:actions>
              <v-icon color="primary" class="flechaAzul">$expand</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
           <div v-for="estudio in estudioF" :key="estudio.id" class="d-flex">
             <p class="flex-1-1">{{estudio.nombre}}</p>
             <v-checkbox v-model="checkGenerar[estudio.id]" class="checkL" ></v-checkbox>
             
           </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel >
          <v-expansion-panel-header>
            Asignar folio
            <template v-slot:actions>
              <v-icon color="primary" class="flechaAzul">$expand</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <asignarFolio :foliosDisponibles="foliosD" :estudio="study" />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel >
          <v-expansion-panel-header>
            Folios asignados
            <template v-slot:actions>
              <v-icon color="primary" class="flechaAzul">$expand</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <folioAsignado :estudios="estudios" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else>
      <div class="d-flex flex-column pa-10 justify-center align-center">
        <h1 class="text-center gris">Folios generados</h1>
        <img src="../assets/imgs/iconos/Check.svg" alt="Palomita Verde">
         <div class="my-2">
          <v-btn
            @click="listo=false"
            class="letraNormal mt-14"
            color="success"
          >Aceptar</v-btn>
        </div>
      </div>
        
      
    </div>
    <div v-if="panel==0" class="botonesBajos">
      <div class="my-2">
        <v-btn
          @click="generar"
          class="letraNormal btnSolicitar"
          color="primary"
          :loading="status"
          :disabled="checkGenerar.lenght==0"
        >Generar Folio <i class="mdi mdi-chevron-right"></i></v-btn>
        
      </div>
    </div>
  </div>
</template>
<style>
  .estudioCarrusel{
    height: 50px;
    width: 50px;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 10px;
    cursor: pointer;
    animation: 0.3s all;
    transition: 0.3s all;
  }
  .contenedor{
    overflow-x: hidden;
  }
  .estudioCarrusel .activo{
    color:rgb(255, 255, 255)!important
  }
  .checkL{
    margin-top: 0!important;
    padding-top: 0;
  }
  .gris{
    color:#616161
  }
  .sd-navs-areas {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
  }
  .sd-navs-areas .sd-previous {
    margin-right: 5px;
  }
  .sd-navs-areas .sd-previous, .sd-navs-areas .sd-next {
    cursor: pointer;
  }
  .sd-navs-areas i {
    color: #0074D9;
    font-size: 20px;
    line-height: 14px;
  }
  .sd-navs-areas i {
    color: #0074D9;
    font-size: 20px;
    line-height: 14px;
  }
  .estudioCarrusel i{
    font-size: 30px;
  }
  .carruselD{
    transform: translateX(-90px);
  }
</style>
<script>
import AsignarFolio from './AsignarFolio'
import FolioAsignado from './FolioAsignado'
export default {
  name: 'Asignar',

  components: {
    AsignarFolio,
    FolioAsignado
  },

  data: () => ({
    activo:1,
    study:{
      id:1,
      nombre:'Densitometría',
      color:'#7F95A1'
    },
    panel:null,
    derecha:false,
    checkGenerar:[],
    listo:false,
    estudios:[{
      id:1,
      nombre:'Densitometría',
      color:'#7F95A1'
    },{
      id:2,
      nombre:'Laboratorio',
      color:'#359FDA'
    },{
      id:3,
      nombre:'Mastografía',
      color:'#ED4F83'
    },{
      id:10,
      nombre:'Nutrición',
      color:'#60A463'
    },{
      id:4,
      nombre:'Papanicolao',
      color:'#AD65C2'
    },{
      id:5,
      nombre:'Rayos X',
      color:'#755FB8'
    },{
      id:9,
      nombre:'Resonancia Magnética',
      color:'#896F67'
    },{
      id:8,
      nombre:'Tomografía',
      color:'#A19B54'
    },{
      id:6,
      nombre:'Ultrasonido',
      color:'#49A5AD'
    },{
      id:7,
      nombre:'Electrocardiograma',
      color:'#db5859'
    },
    ],
    estudioF:[{id:0, nombre:'Cargando...'},],
    foliosD:[{nombre:'Christian', apellidoP:'Pulido',apellidoM:'Quintero', clinica:'Navolato',status:0,folio:500000, preparacion:'Sin preparacion'}]
  }),
  methods:{
    moverCarrusel(){
      var carrusel = document.getElementById('carrusel')
      carrusel.setAttribute("style", "transform: rotate(" + this.cuenta + "deg)")
    },
    generar(){
      this.panel=null
      this.listo=true
    }
  }
};
</script>