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
            <v-btn dark text @click="imprimir">Imprimir</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div :id="id" ref="printMe">
          <cupon :cupones="cupon" />
        </div>
        <div  >
          <img :src="output">
        </div>
        
      </v-card>
    </v-dialog>
</template>
<script>
import Cupon from './Cupon'
import folioPrin from '../services/folios'
export default {
  name:'impresion',
  data () {
      return {
        dialog: false,
        output:null
      }
    },
  components: {
    Cupon
  },
  props:{
    opcion:String,
    cupon:[],
    id:null,
  },
  methods: {
    imprimir(){
      
      // const el = this.$refs.printMe
      // const options = {
      //   type: 'dataURL'
      // }
      // this.output = await this.$html2canvas(el, options)
      // console.log('Imprimiendo')
      let imprimir = '';
      imprimir=document.getElementById(this.id)
      var ventana = '';
      ventana=window.open('', 'PRINT', 'height=400,width=600')
      ventana.document.write('<html><head><title>' + document.title + '</title>')
      ventana.document.write('<link rel="stylesheet" href="./cupon.css">')
      ventana.document.write('</head><body >')
      ventana.document.write(imprimir.innerHTML)
      ventana.document.write('</body></html>')
      ventana.document.close()
      ventana.focus()
      setTimeout(() => {
              ventana.print()
          }, 2000)
      
      this.dialog=false
      folioPrin.updateImpresos(this.cupon)
    },

  }

}
</script>