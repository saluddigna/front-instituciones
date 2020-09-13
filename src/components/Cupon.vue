<template>
  <div class="sd-contenedor-cupones">
    <div v-for="cupon in cupones" :key="cupon.folio" class="sd-item-cupon">
        <div class="sd-item-content">
            <div class="sd-item-logo">
                <img src="../assets/imgs/logo.svg" alt="Logo Salud Digna">
                <img src="../assets/imgs/Mas.svg" alt="Logo campaña">
            </div>
            <p class="sd-titulo-preparacion">Preparación</p>
            <div class="sd-item-preparacion">
                {{cupon.estudioPreparacion}}
            </div>
        </div>
        <div class="sd-item-content">
            <div class="sd-datos-folio">
                <p class="sd-sucursal">Valido solo en Clínica {{cupon.clincaName}}</p>
                <div class="sd-content-folio">
                    <p class="sd-text">Folio</p>
                    <p class="sd-folio">{{cupon.folio}}</p>
                    <p class="sd-estudio">{{cupon.estudioName}}</p>
                </div>
                <div class="sd-codigo-barras">
                    <barcode :value="cupon.folio" height="15"  background="#EDEDED" displayValue="false" width="1" >
                      No se pudo generar el Código de barras
                    </barcode>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
*{
  font-family: 'Open Sans', sans-serif;
}
.sd-contenedor-cupones{
    margin: 0 auto;
    width: 720px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.sd-item-cupon{
    width: 350px;
    display: flex;
    background-color: #EDEDED;
    padding: 14px 10px;
    margin-bottom: 10px;
    margin-top: 10px;
}

.sd-item-cupon .sd-item-content:nth-child(1){
    width: 197px;
    padding-right: 5px;
    border-right: 2px dashed #AFAFAF;
}

.sd-item-cupon .sd-item-content:nth-child(2){
    width: 153px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.sd-item-logo{
    display: flex;
    margin-bottom: 10px;
}

.sd-item-logo img:nth-child(1){
    width: 91px;
    height: auto;
    margin-right: 20px;
}

.sd-item-logo img:nth-child(2){
    width: 47px;
    height: auto;
}

.sd-titulo-preparacion{
    margin: 0 0 5px 0;
    font-size: 12px;
    font-weight: 600;
}

.sd-item-preparacion{
    font-size: 10px;
    color: #616161;
}

.sd-datos-folio{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sd-sucursal{
    font-size: 10px;
    font-weight: 600;
    margin: 0 0 10px 0;
    text-align: center;
}

.sd-content-folio{
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px dashed #FBAB1F;
    padding: 5px 6px 2px 6px;
    line-height: 20px;
    margin-bottom: 10px;
}
.sd-content-folio>p{
  margin-bottom: 0;
}
.sd-folio{
    font-size: 18px;
    font-weight: 600;
    color: #FBAB1F;
    margin: 0;
}

.sd-text{
    font-size: 14px;
    margin: 0;
}

.sd-estudio{
    font-size: 10px;
    margin: 0;
    text-align: center;
}
</style>
<script>
import VueBarcode from 'vue-barcode';
export default {
  name:"cuponera",
  components: {
    'barcode': VueBarcode
  },
  data:()=>({
  }),
  props:{
    cupones:[]
  },
}
</script>