<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          class="my-5"
        >
         <v-icon>mdi-printer</v-icon>  Imprimir todos 
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title><v-icon>mdi-printer</v-icon> Vista previa</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Imprimir</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <cupon />
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
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
  components: {
    Cupon
  },
}
</script>