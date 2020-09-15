<template>
  <div>
    <v-row v-if="vista==0" >
      <v-col  cols="6" class="pa-2" v-for="(folio,index) in foliosDisponibles" :key="folio.id">
        <v-card class="card">
          <div class="d-flex headerEstudio flex-row justify-start align-center" :style="'background-color:'+ (estudio!=null?estudio.color:'rgb(246 97 0)')">
            <div class="rounded-circle iconEstudio mx-2">
              <i v-if="folio.parentEstudioId==1" class="icon-densitometria" :style="'color:'+ (estudio!=null?estudio.color:'rgb(246 97 0)')"></i>
            <i v-else-if="folio.parentEstudioId==2" class="icon-laboratorio" :style="'color:'+ (estudio!=null?estudio.color:'rgb(246 97 0)')"></i>
            <i v-else-if="folio.parentEstudioId==3" class="icon-mastografia" :style="'color:'+ (estudio!=null?estudio.color:'rgb(246 97 0)')"></i>
            <i v-else-if="folio.parentEstudioId==4" class="icon-papanicolau" :style="'color:'+ (estudio!=null?estudio.color:'rgb(246 97 0)')"></i>
            <i v-else-if="folio.parentEstudioId==5" class="icon-rayos-x" :style="'color:'+ (estudio!=null?estudio.color:'rgb(246 97 0)')"></i>
            <i v-else-if="folio.parentEstudioId==6" class="icon-ultrasonido" :style="'color:'+ (estudio!=null?estudio.color:'rgb(246 97 0)')"></i>
            <i v-else-if="folio.parentEstudioId==7" class="icon-electrocardiograma" :style="'color:'+ (estudio!=null?estudio.color:'rgb(246 97 0)')"></i>
            <i v-else-if="folio.parentEstudioId==8" class="icon-tomografia" :style="'color:'+ (estudio!=null?estudio.color:'rgb(246 97 0)')"></i>
            <i v-else-if="folio.parentEstudioId==9" class="icon-resonancia" :style="'color:'+ (estudio!=null?estudio.color:'rgb(246 97 0)')"></i>
            <i v-else-if="folio.parentEstudioId==10" class="icon-nutricion2" :style="'color:'+ (estudio!=null?estudio.color:'rgb(246 97 0)')"></i>
            </div>
            <span class="tituloEstudio">{{folio.estudioName}}</span>
          </div>
          <div>
            <div class="d-flex flex-row justify-center align-center">
              <button class="estudioInfo" @click="folio.flecha= true">
                <span class="text-center">Datos <i color="primary" class="mdi flechaUpDown" :class="{'mdi-chevron-up':(folio.flecha||folio.flecha===undefined||folio.flecha==null),'mdi-chevron-down':!folio.flecha}"></i></span>
              </button>
              <button class="estudioInfo bl-1-gray" @click="folio.flecha= false">
                <span class="text-center">Preparación <i color="primary" class="mdi flechaUpDown" :class="{'mdi-chevron-down':(folio.flecha||folio.flecha===undefined||folio.flecha==null),'mdi-chevron-up':folio.flecha}"></i></span>
              </button>
            </div>
          </div>
          <div v-if="folio.flecha" class="pa-2 infoFolio">
            <b>Nombre:</b>{{folio.beneficiaryName}} 
            <br />
            <b>Apellido P:</b> {{folio.beneficiaryPaternalName }}
            <br />
            <b>Apellido M:</b> {{ folio.beneficiaryMaternalName }}
            <br />
            <b>Clínica:</b>{{ folio.clincaName }} 
            <br />
            <!-- <b>Estatus:</b> {{ folio.status }} -->
          </div>
          <div v-else class="pa-4 prepaFolio">
            {{ folio.estudioPreparacion }}
          </div>
          <div class="d-flex flex-row justify-center align-center pa-1">
            <a href="#" class="datosFolio text-center" @click="guardarFolioOmitir(folio)">Omitir datos</a>
            <a href="#" @click="llenarDatos(folio,index)" class="datosFolio text-center">Llenar datos</a>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-col v-else cols="12" class="pa-0">
      <v-card>
        <div class="d-flex headerEstudio flex-row justify-start align-center" :style="'background-color:'+(estudio!=null?estudio.color:'rgb(246 97 0)')">
            <div class="rounded-circle iconEstudio mx-2">
              <i v-if="foliosDisponibles[selectedIndex].id==1" class="icon-densitometria" ></i>
              <!-- :style="'color:'+estudio.color" -->
          <i v-else-if="foliosDisponibles[selectedIndex].id==2" class="icon-laboratorio" ></i>
          <i v-else-if="foliosDisponibles[selectedIndex].id==3" class="icon-mastografia" ></i>
          <i v-else-if="foliosDisponibles[selectedIndex].id==4" class="icon-papanicolau"></i>
          <i v-else-if="foliosDisponibles[selectedIndex].id==5" class="icon-rayos-x"></i>
          <i v-else-if="foliosDisponibles[selectedIndex].id==6" class="icon-ultrasonido" ></i>
          <i v-else-if="foliosDisponibles[selectedIndex].id==7" class="icon-electrocardiograma"></i>
          <i v-else-if="foliosDisponibles[selectedIndex].id==8" class="icon-tomografia" ></i>
          <i v-else-if="foliosDisponibles[selectedIndex].id==9" class="icon-resonancia"></i>
          <i v-else-if="foliosDisponibles[selectedIndex].id==10" class="icon-nutricion2" ></i>
            </div>
            <span class="tituloEstudio">{{foliosDisponibles[selectedIndex].estudioName}}</span>
          </div>
          <div >
            <div v-if="vista==1" class="pa-5 d-flex flex-column justify-center">
              <v-text-field
                label="Nombre"
                v-model="folioSeleccionado.foliosToAssign[0].name"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                label="Apellido Paterno"
                v-model="folioSeleccionado.foliosToAssign[0].paternal"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                label="Apellido Materno"
                v-model="folioSeleccionado.foliosToAssign[0].maternal"
                outlined
                dense
              ></v-text-field>
              <v-text-field
              v-model="folioSeleccionado.foliosToAssign[0].clinicaName"
              label="Clínica"
              outlined
              dense
              disabled
            ></v-text-field>
            <v-btn
              @click="guardarFolio"
              class="letraNormal btnSolicitar centrar"
              color="primary"
              :loading="status"
            >Aceptar</v-btn>
          </div>
          <div v-else class="d-flex flex-column pa-10 justify-center align-center">
            <h1 class="text-center gris">Datos agregados con éxito</h1>
            <img src="../assets/imgs/iconos/Check.svg" alt="Palomita Verde">
            <div class="my-2">
              <v-btn
                @click="vista=0"
                class="letraNormal mt-14"
                color="success"
              >Aceptar</v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-col>
  </div>
</template>
<style>
  .iconEstudio{
    background-color: white;
    padding: 3px;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tituloEstudio{
    font-weight: 600;
    color: #fafafa;
  }
  .headerEstudio{
    height: 45px;
  }
  .estudioInfo{
    background: #FAFAFA 0% 0% no-repeat padding-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0px;
    color: #616161;
    height: 40px;
  }
  .estudioInfo:focus {
    outline: none!important;
  }
  .flechaUpDown{
    font-size: 20px;
    color: rgb(9, 121, 250);
  }
  .datosFolio{
    width: 100%;
    text-decoration: none;
  }
  .infoFolio{
    line-height: 28px;
    border-top: 1px solid #E5E5E5;
  }
  .bl-1-gray{
    border-left: 1px solid #E5E5E5;
  }
  .prepaFolio{
    height: 160px;
    overflow-y: auto;
  }
  .centrar{
    align-self: center;
  }
</style>
<script>
import foliosService from '../services/folios'
export default {
  name:'AsignarFolio',
  data: () => ({
    vista:0,
    dataUser:null,
    folioSeleccionado:{},
    ver:false,
    selectedIndex:null
  }),
  mounted(){
    this.dataUser = JSON.parse(sessionStorage.getItem('dataUser'))
    // if(this.foliosDisponibles==[{}])
    //   this.ver=true
  },
  props:{
    foliosDisponibles:null,
    estudio:{},
    
  },
  methods:{
    llenarDatos(folio,index){
      // console.log(folio)
      this.selectedIndex=index
      let selected={institution:this.dataUser.institution.id,foliosToAssign:[{folio:folio.id,clinicaId:folio.clinicaId,clinicaName:folio.clincaName,name:folio.beneficiaryName,paternal:folio.beneficiaryPaternalName,maternal:folio.beneficiaryMaternalName}]}
      this.folioSeleccionado=selected
      // console.log(this.folioSeleccionado.foliosToAssign[0].folio)
      this.vista=1
      // console.log(this.vista)
    },
    guardarFolio(){
      foliosService.asignarBeneficiario(this.folioSeleccionado).then(res=>
      {
        // console.log(res)
        this.getFoliosGenerados();
        this.vista=2
      })
    },
    guardarFolioOmitir(folio){
        let selected={institution:this.dataUser.institution.id,foliosToAssign:[{folio:folio.id,clinicaId:folio.clinicaId,clinicaName:folio.clincaName,name:"",paternal:"",maternal:""}]}
        this.folioSeleccionado=selected

      foliosService.asignarBeneficiario(this.folioSeleccionado).then(res=>
      {
        // console.log(res)
        this.getFoliosGenerados();
        this.vista=2
      })
    },
    async getFoliosGenerados(){
      await foliosService.getGenerados(this.dataUser.institution.id).then(res=>{
        this.foliosDisponibles=res.map(x=>{
        return{
          beneficiaryId:x.beneficiaryId,
          beneficiaryName:x.beneficiaryName,
          beneficiaryMaternalName:x.beneficiaryMaternalName,
          beneficiaryPaternalName:x.beneficiaryPaternalName,
          clincaName:x.clincaName,
          clinicaId:x.clinicaId,
          estudioDescription:x.estudioDescription,
          estudioId:x.estudioId,
          parentEstudioId:x.parentEstudioId,
          estudioName:x.estudioName,
          estudioPreparacion:x.estudioPreparacion,
          flecha:true,
          folio:x.folio,
          id:x.id,
          statusSolicitude:x.statusSolicitude,
        }
        });
      })
    }
  }
}
</script>