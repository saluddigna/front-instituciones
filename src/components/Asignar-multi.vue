<template>
  <div class="d-flex flex-column h-94">
    <div class="flex-1-1 contenedor" v-if="!listo">
      <!-- <div v-show="panel!=2" class="sd-navs-areas">
        <div class="sd-previous" @click="derecha=false">
            <i class="icon-angle-left-4"></i>
        </div>
        <div class="sd-next" @click="derecha=true">
            <i class="icon-angle-right-4"></i>
        </div>
      </div> -->
      <div v-show="panel!=2" class="miniCarrusel flex-row" :class="{'carruselD':derecha, 'd-flex': panel!=2}">
        <div id="carrusel" class="rounded-circle estudioCarrusel ma-2" v-for="estudio in estudios" :key="estudio.id" :style="'border:2px solid '+estudio.color+';'+(activo==estudio.id?('background-color:'+estudio.color+'; fill: #fff;'):'')" @click="changeSelected(estudio.id,estudio)" >
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
              <i v-if="estudio.id==1" :class="{'activo':activo==estudio.id}" class="icon-densitometria" :style="'color:'+estudio.color" v-bind="attrs" v-on="on"></i>
              <i v-else-if="estudio.id==2" :class="{'activo':activo==estudio.id}" class="icon-laboratorio" :style="'color:'+estudio.color" v-bind="attrs" v-on="on"></i>
              <i v-else-if="estudio.id==3" :class="{'activo':activo==estudio.id}" class="icon-mastografia" :style="'color:'+estudio.color" v-bind="attrs" v-on="on"></i>
              <i v-else-if="estudio.id==4" :class="{'activo':activo==estudio.id}" class="icon-papanicolau" :style="'color:'+estudio.color" v-bind="attrs" v-on="on"></i>
              <i v-else-if="estudio.id==5" :class="{'activo':activo==estudio.id}" class="icon-rayos-x" :style="'color:'+estudio.color" v-bind="attrs" v-on="on"></i>
              <i v-else-if="estudio.id==6" :class="{'activo':activo==estudio.id}" class="icon-ultrasonido" :style="'color:'+estudio.color" v-bind="attrs" v-on="on"></i>
              <i v-else-if="estudio.id==7" :class="{'activo':activo==estudio.id}" class="icon-electrocardiograma" :style="'color:'+estudio.color" v-bind="attrs" v-on="on"></i>
              <i v-else-if="estudio.id==8" :class="{'activo':activo==estudio.id}" class="icon-tomografia" :style="'color:'+estudio.color" v-bind="attrs" v-on="on"></i>
              <i v-else-if="estudio.id==9" :class="{'activo':activo==estudio.id}" class="icon-resonancia" :style="'color:'+estudio.color" v-bind="attrs" v-on="on"></i>
              <i v-else-if="estudio.id==10" :class="{'activo':activo==estudio.id}" class="icon-nutricion2" :style="'color:'+estudio.color" v-bind="attrs" v-on="on"></i>
          </template>
          <span>{{estudio.nombre}}</span>
        </v-tooltip>
        </div>
      </div>
      <v-expansion-panels accordion v-model="panel">
        <v-expansion-panel >
          <v-expansion-panel-header>
            Generar folio X
            <template v-slot:actions>
              <v-icon color="primary" class="flechaAzul">$expand</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="d-flex">
                <p class="flex-1-1">Seleccionar todo</p>
                <v-checkbox @change="seleccionarTodosFolios()" v-model="todosFolios" class="checkL" ></v-checkbox>
            </div>
           <div  v-for="folio in foliosSolicitados" :key="folio.id" class="d-flex">
            <!-- {{folio}},{{activo}} -->
             <p v-if="folio.parentEstudioId==activo || activo==null" class="flex-1-1">{{folio.estudioName}}</p>
             <v-checkbox v-if="folio.parentEstudioId==activo || activo==null" v-model="folio.generar" class="checkL" ></v-checkbox>
             
           </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- <v-expansion-panel >
          <v-expansion-panel-header @click="getFoliosGenerados()">
            Asignar folio
            <template v-slot:actions>
              <v-icon color="primary" class="flechaAzul">$expand</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <asignarFolio v-if="foliosD.length!=0" :foliosDisponibles="foliosD" :estudio="study" />
            
            <div v-else>
               {{(foliosD.length!=0)?('Aun no se ha generado ningun folio de '+study.nombre):'Ningun folio se ha generado'}}.
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel> -->
        <v-expansion-panel >
          <v-expansion-panel-header @click="getFoliosAsignados()">
            Folios asignados
            <template v-slot:actions>
              <v-icon color="primary" class="flechaAzul">$expand</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <folioAsignado :foliosAsignados="foliosA" :estudios="estudios" :opcion="filtro" :foliosid="foliosID" />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- <v-expansion-panel >
          <v-expansion-panel-header @click="getFoliosAsignadosImpresos()">
            Folios asignados Reimprimir
            <template v-slot:actions>
              <v-icon color="primary" class="flechaAzul">$expand</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <folioAsignadoReimprimir :folioAsignadosReimprimir="foliosA" :estudios="estudios" />
          </v-expansion-panel-content>
        </v-expansion-panel> -->
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
  .miniCarrusel{
    transform: translateX(0px);
    transition: 0.3s all;
    animation: 0.3s all;
    justify-content: center;
  }
  .carruselD{
    transition: 0.3s all;
    animation: 0.3s all;
    transform: translateX(-90px);
  }
  .bg-densi{
    background-color: #7F95A1;
  }
  .color-densi{
    color: #7F95A1;
  }
  .bg-lab{
    background-color: #359FDA;
  }
  .color-lab{
    color: #359FDA;
  }
  .bg-masto{
    background-color: #ED4F83;
  }
  .color-masto{
    color: #ED4F83;
  }
  .bg-papa{
    background-color: #AD65C2
  }
  .color-papa{
    color: #AD65C2
  }
  .bg-ultra{
    background-color: #49A5AD
  }
  .color-ultra{
    color: #49A5AD
  }
  .bg-electro{
    background-color:#db5859
  }
  .color-electro{
    color: #db5859
  }
</style>
<script>
// import AsignarFolio from './AsignarFolio'
import FolioAsignado from './FolioAsignado'
// import FolioAsignadoReimprimir from './FolioAsignadoReimprimir'
import foliosService from '../services/folios'
import utilsService from '../services/utils-services'

export default {
  name: 'AsignarMulti',
  components: {
    FolioAsignado,
    // FolioAsignadoReimprimir
  },             
  mounted(){
    this.dataUser = JSON.parse(sessionStorage.getItem('dataUser'))
    this.get()
    this.getFoliosGenerados()
  },
  data: () => ({
    status:null,
    dataUser:null,
    activo:null,
    study: null,
    panel:null,
    derecha:false,
    checkGenerar:[],
    listo:false,
    foliosSolicitados:null,
    todosFolios: false,
    filtro:false,
    estudios:[
      {
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
      id:4,
      nombre:'Papanicolaou',
      color:'#AD65C2'
    },{
      id:6,
      nombre:'Ultrasonido',
      color:'#49A5AD'
    },{
      id:7,
      nombre:'Electrocardiograma',
      color:'#db5859'
    }
    ],
    estudioF:[{id:0, nombre:'Cargando...'},],
    foliosD:[{}],
    foliosA:[{}],
    foliosID:null,
    institucion:JSON.parse(sessionStorage.getItem('dataUser')).institution.id,
  }),
  created(){
    this.$bus.$off('impreso')
    this.$bus.$on('impreso', () => {
      if(this.filtro){
        this.getFoliosAsignadosImpresos()
      }else{
        this.getFoliosAsignados()
      }
    })
    this.$bus.$off('yaImpresos')
    this.$bus.$on('yaImpresos', filtro => {
      filtro?this.getFoliosAsignadosImpresos():this.getFoliosAsignados()
      this.filtro=filtro
    })
  },
  methods:{
    get(){
      foliosService.getSolicitados(this.dataUser.institution.id).then(res=>
    {
       let data=res.map(x=>{
        return{
        folioId:x.id,
        estudioId:x.clinicalStudy.id,
        parentEstudioId:x.clinicalStudy.idEstudio,
        estudioName:x.clinicalStudy.description,
        generar:false,
        }
      })
      this.foliosSolicitados=data;
    })
    },
    moverCarrusel(){
      var carrusel = document.getElementById('carrusel')
      carrusel.setAttribute("style", "transform: rotate(" + this.cuenta + "deg)")
    },
    generar(){
        let body = {
            institution: this.institucion
        }
      let foliosGenerar=[]
      console.log(this.checkGenerar)
      this.foliosSolicitados.map(x=>
      {
        if(x.generar)
          foliosGenerar.push(x.folioId)
      })
      if(foliosGenerar.length==0){
        alert('Debes marcar al menos un folio para generar')
        return
      }
      console.log(foliosGenerar)
      body.idFoliosToAssign = foliosGenerar

      foliosService.generaryCrear(body).then(res=>{
        console.log(res)
        if(res.status){
            this.get()
            this.listo=true
            this.panel=null
        }
      })
    },
    getFoliosGenerados(){
      foliosService.getGenerados(this.dataUser.institution.id).then(res=>{
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
          parentEstudioId: x.parentEstudioId,
          estudioName:x.estudioName,
          estudioPreparacion:x.estudioPreparacion,
          flecha:true,
          folio:x.folio,
          id:x.id,
          statusSolicitude:x.statusSolicitude,
        }
        });
        if(this.activo!=null)
          data=data.filter(x=>x.parentEstudioId==this.activo)
        this.foliosD=data;
        console.log(this.foliosD)
      })
    },
    getFoliosAsignados(){
      foliosService.getAsignados(this.dataUser.institution.id,null).then(res=>{
        let data=res.map(x=>{
        x.flecha=true
        return x
        })
        console.log(data)
        this.foliosA=data
        this.getFoliosAsignadosIdFolios()
      })

    },
    getFoliosAsignadosIdFolios(){
      foliosService.getAsignadosIdFolio(this.dataUser.institution.id,null).then(res=>{
        this.foliosID=res
      })
    },
    getFoliosAsignadosImpresos(){
      foliosService.getAsignadosImpresos(this.dataUser.institution.id,null).then(res=>{
        let data=res.map(x=>{
        x.flecha=true
        return x
        })
        console.log(data)
        this.foliosA=data
      })
    },
    changeSelected(estudioId,estudio){
      if(this.activo==estudioId){
        this.activo=null
          utilsService.setFiltroEstudio(null)
      }else{
        this.activo=estudioId
        this.study=estudio
        console.log(this.study);
      }
      this.getFoliosGenerados()
      // console.log(this.foliosSolicitados,this.activo)
      // this.foliosSolicitados=this.foliosSolicitados.filter(x => x.estudioId==this.activo);
      // console.log(this.foliosSolicitados)
    },
    seleccionarTodosFolios(){
        console.log(this.institucion)
        this.foliosSolicitados.forEach(element => {
            console.log(element)
            element.generar = this.todosFolios
        })
    }
  }
};
</script>