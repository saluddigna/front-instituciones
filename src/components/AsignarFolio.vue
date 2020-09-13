<template>
  <div>
    <v-col v-if="vista==0" cols="6" class="pa-0">
      <v-card v-for="(folio,i) in foliosDisponibles" :key="folio.id">
        <div class="d-flex headerEstudio flex-row justify-start align-center" :style="'background-color:'+estudio.color">
          <div class="rounded-circle iconEstudio mx-2">
            <i v-if="estudio.id==1" class="icon-densitometria" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==2" class="icon-laboratorio" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==3" class="icon-mastografia" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==4" class="icon-papanicolau" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==5" class="icon-rayos-x" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==6" class="icon-ultrasonido" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==7" class="icon-electrocardiograma" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==8" class="icon-tomografia" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==9" class="icon-resonancia" :style="'color:'+estudio.color"></i>
          <i v-else-if="estudio.id==10" class="icon-nutricion2" :style="'color:'+estudio.color"></i>
          </div>
          <span class="tituloEstudio">{{estudio.nombre}}</span>
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
          <b>Nombre:</b>  {{folio.nombre}}
          <br />
          <b>Apellido P:</b>  {{ folio.apellidoP }}
          <br />
          <b>Apellido M:</b> {{ folio.apellidoM }}
          <br />
          <b>Clínica:</b> {{ folio.clinica }}
          <br />
          <b>Estatus:</b> {{ folio.status }}
        </div>
        <div v-else class="pa-4 prepaFolio">
          {{ folio.preparacion }}
        </div>
        <div class="d-flex flex-row justify-center align-center pa-1">
          <a href="#" class="datosFolio text-center">Omitir datos</a>
          <a href="#" @click="llenarDatos(folio)" class="datosFolio text-center">Llenar datos</a>
        </div>
      </v-card>
    </v-col>
    <v-col v-else cols="12" class="pa-0">
      <v-card>
        <div class="d-flex headerEstudio flex-row justify-start align-center" :style="'background-color:'+estudio.color">
            <div class="rounded-circle iconEstudio mx-2">
              <i v-if="estudio.id==1" class="icon-densitometria" :style="'color:'+estudio.color"></i>
            <i v-else-if="estudio.id==2" class="icon-laboratorio" :style="'color:'+estudio.color"></i>
            <i v-else-if="estudio.id==3" class="icon-mastografia" :style="'color:'+estudio.color"></i>
            <i v-else-if="estudio.id==4" class="icon-papanicolau" :style="'color:'+estudio.color"></i>
            <i v-else-if="estudio.id==5" class="icon-rayos-x" :style="'color:'+estudio.color"></i>
            <i v-else-if="estudio.id==6" class="icon-ultrasonido" :style="'color:'+estudio.color"></i>
            <i v-else-if="estudio.id==7" class="icon-electrocardiograma" :style="'color:'+estudio.color"></i>
            <i v-else-if="estudio.id==8" class="icon-tomografia" :style="'color:'+estudio.color"></i>
            <i v-else-if="estudio.id==9" class="icon-resonancia" :style="'color:'+estudio.color"></i>
            <i v-else-if="estudio.id==10" class="icon-nutricion2" :style="'color:'+estudio.color"></i>
            </div>
            <span class="tituloEstudio">{{estudio.nombre}}</span>
          </div>
          <div class="pa-5 d-flex flex-column justify-center">
            <div v-if="vista==1">
              <v-text-field
                label="Nombre"
                v-model="nombre"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                label="Apellido Paterno"
                v-model="apellidoP"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                label="Apellido Materno"
                v-model="apellidoM"
                outlined
                dense
              ></v-text-field>
              <v-select
              :items="items"
              v-model="clinica"
              label="Clínica"
              outlined
              dense
            ></v-select>
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
                @click="vista=1"
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
  }
  .centrar{
    align-self: center;
  }
</style>
<script>
export default {
  name:'AsignarFolio',
  data: () => ({
    flecha:[true,true,true,true,true,true,true,true],
    vista:0,
    folioSeleccionado:{}
  }),
  props:{
    foliosDisponibles:[],
    estudio:{},
    
  },
  methods:{
    llenarDatos(folio){
      this.folioSeleccionado=folio
      this.vista=1
    },
    guardarFolio(){
      this.vista=2
    }
  }
}
</script>