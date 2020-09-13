<template>
  <div class="d-flex flex-column h-94">
    <div class="flex-1-1">
      <v-expansion-panels accordion flat v-model="panel">
        <v-expansion-panel >
          <v-expansion-panel-header>
            Folios solicitados
            <template v-slot:actions>
              <v-icon color="primary" class="flechaAzul">$expand</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-for="folio in folios" :key="folio.id" class="fSolicitados">
              <span class="float-right">{{folio.cuenta}}</span>
              <p>{{folio.nombre}}</p>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel >
          <v-expansion-panel-header>
            Solicitar folios
            <template v-slot:actions>
              <v-icon color="primary" class="flechaAzul">$expand</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-for="solicitar in solicitable" :key="solicitar.id" class="fSolicitados">
              <div class="float-right">
                <i class="mdi mdi-minus"></i>
                <input type="number" value="0" class="contador" />
                <i class="mdi mdi-plus-thick"></i>
              </div>
                
              <p>{{solicitar.nombre}}</p>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="botonesBajos">
      <div class="my-2">
        <v-btn
          @click="logIn"
          class="letraNormal btnSolicitar"
          color="primary"
          :loading="status"
          :disabled="!disabled"
        >Solicitar estudio <i class="mdi mdi-chevron-right"></i></v-btn>
      </div>
    </div>
  </div>
</template>
<style>
.flex-1-1{
  flex: 1 1 auto;
}
.mdi-plus-thick, .mdi-minus{
  color: #0074D9;
  font-size: 16px;
}
.h-94{
  height: 94%;
  margin-top: 2px;
}
.botonesBajos{
  flex: 0 1 auto;
  width: 100%;
  box-shadow: 0px -3px 6px #00000029;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btnSolicitar{
  width: 324px;
  height: 40px;
}
.mdi-chevron-right{
  font-size: 22px;
}
.fSolicitados{
  border-bottom: 1px solid rgb(206, 206, 206);
  margin-bottom: 10px;
}
.v-expansion-panel-header{
  font-size: 18px!important;
  font-weight: 600;
}
.flechaAzul{
  font-size: 40px!important;
}
.contador{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 1px 3px #00000029;
  border-radius: 4px;
  width: 50px;
  text-align: end;
}
</style>
<script>
export default {
  name: "Solicitar",

  components: {},

  data: () => ({
    status:false,
    disabled:false,
    panel:0,
    folios:[{nombre:'Cargando...',cuenta:'0 estudios'},],
    solicitable:[{nombre:'Cargando...',cuenta:'0 estudios'},],
    s:[0,0,0]
  }),
};
</script>