<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        v-if="opcion=='todos'"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          class="my-5"
        >
         <v-icon>mdi-printer</v-icon>  Imprimir todos 
        </v-btn>
        <div v-else-if="opcion=='solo'" class="d-flex flex-row justify-center align-center pa-1">
            <a href="#" v-on="on" class="datosFolio text-center">Imprimir</a>
          </div>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title><v-icon>mdi-printer</v-icon> Vista previa</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @print="'imprimir'">Imprimir</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div id="imprimir">
          <cupon :cupones="cupon" />
        </div>
      </v-card>
    </v-dialog>
</template>
<script>
import Cupon from './Cupon'
export default {
  name:'impresion',
  data () {
      return {
        dialog: false,
      }
    },
  components: {
    Cupon
  },
  props:{
    opcion:String,
    cupon:[]
  },
  mounted(){
    if(this.opcion=='solo'){
      this.cupon=[this.cupon]
    }
  },
  methods: {
      
  }

}
</script>