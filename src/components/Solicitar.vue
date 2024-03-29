<template>
  <div class="d-flex flex-column h-94">
    <div v-if="!listo" class="flex-1-1">
      <v-expansion-panels accordion flat v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header>
            Folios disponibles
            <template v-slot:actions>
              <v-icon color="primary" class="flechaAzul">$expand</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div
              v-for="folio in folios"
              :key="folio.description"
              class="fSolicitados"
            >
              <span class="float-right">{{ folio.count }}</span>
              <p>{{ folio.description }}</p>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Solicitar nuevos folios
            <template v-slot:actions>
              <v-icon color="primary" class="flechaAzul">$expand</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="contenedor-estudios">
            <div v-if="estudios.length != 0">
              <div
                v-for="(estudio, index) in estudios"
                :key="estudio.id"
                class="fSolicitados"
              >
                <div class="float-right">
                  <a class="mdi mdi-minus" @click="quitar(index)"></a>
                  <input
                    type="number"
                    value="0"
                    class="contador"
                    @change="checkChange(index)"
                    v-model="estudio.cantidad"
                  />
                  <a
                    :disabled="disabledAdd"
                    class="mdi mdi-plus-thick"
                    @click="agregar(index)"
                  ></a>
                </div>
                <p>{{ estudio.name }}</p>
              </div>
            </div>
            <div v-else>
              <p>Sin estudios</p>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else-if="listo">
      <div class="d-flex flex-column pa-10 justify-center align-center">
        <h1 class="text-center gris">Folios generados</h1>
        <img src="../assets/imgs/iconos/Check.svg" alt="Palomita Verde" />
        <div class="my-2">
          <v-btn @click="aceptar" class="letraNormal mt-14" color="success"
            >Aceptar</v-btn
          >
        </div>
      </div>
    </div>
    <div v-show="!listo" class="botonesBajos">
      <div class="my-2">
        <v-btn
          @click="solicitarFolios"
          class="letraNormal btnSolicitar"
          color="primary"
          :loading="status"
          :disabled="disabled"
          >Solicitar estudio <i class="mdi mdi-chevron-right"></i
        ></v-btn>
      </div>
    </div>
    <v-snackbar v-model="snackbar" color="info" top right dark>
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Aceptar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<style>
.flex-1-1 {
  flex: 1 1 auto;
}
.mdi-plus-thick,
.mdi-minus {
  color: #0074d9;
  font-size: 16px;
}
.h-94 {
  height: 94%;
  margin-top: 2px;
}
.botonesBajos {
  flex: 0 1 auto;
  width: 100%;
  box-shadow: 0px -3px 6px #00000029;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btnSolicitar {
  width: 324px;
  height: 40px;
}
.mdi-chevron-right {
  font-size: 22px;
}
.fSolicitados {
  border-bottom: 1px solid rgb(206, 206, 206);
  margin-bottom: 10px;
}
.v-expansion-panel-header {
  font-size: 18px !important;
  font-weight: 600;
}
.flechaAzul {
  font-size: 40px !important;
}
.contador {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 1px 3px #00000029;
  border-radius: 4px;
  width: 50px;
  text-align: end;
}
.contenedor-estudios {
  max-height: 480px;
  overflow-y: scroll;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  padding: 0px 5px;
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
<script>
import estudiosService from "../services/estudios";
import foliosService from "../services/folios";

export default {
  name: "Solicitar",

  components: {},
  props: ["multi"],

  data: () => ({
    estudios: [{}],
    status: false,
    disabled: false,
    disabledAdd: false,
    panel: 0,
    folios: [{ nombre: "Cargando...", cuenta: "0 estudios" }],
    solicitable: [{ nombre: "Cargando...", cuenta: "0 estudios" }],
    s: [0, 0, 0],
    dataUser: null,
    listo: false,
    snackbar: false,
    text: "Sin folios disponibles",
  }),
  created() {
    this.dataUser = JSON.parse(sessionStorage.getItem("dataUser"));
  },
  mounted() {
    this.getEstudios();
    this.getFoliosDisponibles();
  },
  methods: {
    agregar(index) {
      this.disabledAdd = true;
      foliosService
        .checkDisponibilidad(
          this.estudios[index].id,
          this.estudios[index].cantidad + 1,
          this.dataUser.institution.id
        )
        .then((res) => {
          if (res.status == true) this.estudios[index].cantidad++;
          else {
            this.snackbar = true;
            this.text = "Sin folios disponibles";
            console.log("folios no disponibles");
          }
          this.disabledAdd = false;
        });
    },
    checkChange(index) {
      foliosService
        .checkDisponibilidad(
          this.estudios[index].id,
          this.estudios[index].cantidad,
          this.dataUser.institution.id
        )
        .then((res) => {
          if (res.status != true) {
            this.estudios[index].cantidad = 0;
            this.snackbar = true;
            this.text = "Sin folios disponibles";
            console.log("folios no disponibles");
          }
          this.disabledAdd = false;
        });
    },
    quitar(index) {
      if (this.estudios[index].cantidad > 0) this.estudios[index].cantidad--;
    },
    solicitarFolios() {
      let foliosSolicitud = [];
      this.estudios.map((x) => {
        x.institution = this.dataUser.institution.id;
        if (x.cantidad > 0) foliosSolicitud.push(x);
      });
      if (foliosSolicitud.length == 0) {
        this.snackbar = true;
        this.text =
          "La cantidad total de folios a solictar debe ser al menos 1";
        return;
      }
      console.log(foliosSolicitud);
      if (this.multi === "true") {
        foliosService.solicitarFoliosMasivos(foliosSolicitud).then((res) => {
        if (res.status) {
          this.listo = true;
          this.snackbar = true;
          this.text = "Folios solicitados";
        }
      });
      } else {
        foliosService.solicitarFolios(foliosSolicitud).then((res) => {
          if (res.status) {
            this.listo = true;
            this.snackbar = true;
            this.text = "Folios solicitados";
          }
        });
      }
    },
    getEstudios() {
      estudiosService.getEstudios(this.dataUser.institution.id).then((res) => {
        let data = res.map((x) => {
          return {
            id: x.id,
            name: x.description,
            cantidad: 0,
          };
        });
        this.estudios = data;
      });
    },
    getFoliosDisponibles() {
      foliosService.getDisponibles(this.dataUser.institution.id).then((res) => {
        this.folios = res;
      });
    },
    aceptar() {
      this.listo = false;
      this.getEstudios();
      this.getFoliosDisponibles();
    },
  },
};
</script>