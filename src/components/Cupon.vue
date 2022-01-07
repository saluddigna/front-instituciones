<template>
  <div class="sd-contenedor-cupones">
    <div v-for="(cupon, c) in cupones" :key="cupon.folio" class="sd-cupon-general">
        <div class="sd-item-cupon" v-if="dataUser.congreso === 0">
            <div class="sd-item-content">
                <div class="sd-item-logo">
                    <img src="../assets/imgs/logo.svg" alt="Logo Salud Digna">
                    <p class="sd-text">INSTITUCIÓN DE APOYO A LA PREVENCIÓN Y EL DIAGNOSTICO OPORTUNO</p>
                </div>
                <div v-if="cupon.clinicaId != 20">
                    <div class="logo-instituciones">
                        <img src="../assets/imgs/Mas.svg" alt="Logo campaña">
                        <img v-if="cupon.parentEstudioId==3 && (dataUser.institution && dataUser.institution.id != 399)" src="../assets/imgs/logo_coppel.png" alt="Logo Coppel">
                    </div>
                </div>
                <div v-if="cupon.estudioName == 'Ultrasonido'" class="sd-politicas-uso">
                    <ul>
                        <li>Estudio no acumulable. Limitado a una cortesía por persona. Estudio valido solo con previa cita. Sin cita, el paciente no podrá ser atendido.</li>
                        <li>Cupón no valido sin el sello y/o nombre de la institución.</li>
                        <li>Excepto: Doppler, mamario, musculo tendionoso, transfontanelar y transvaginal.</li>
                    </ul>
                </div>
                <div v-else-if="cupon.lentes == 1 && cupon.clinicaId == 16" class="sd-politicas-uso">
                    <ul>
                        <li>Válido para un par de lentes monofocales o bifocales, en Cr-39 o 1.56 Blanco, sin tratamientos hasta + - 3.75 dioptrías, a partir de +-4 dioptrías en policarbonato, con armazón de selección especial</li>
                        <li>Armazones, diseño, tratamiento y material no son intercambiables.</li>
                        <li>Válido un cupón por persona. No aplica para devoluciones en efectivo ni con tarjeta.</li>
                        <li>Valido para niños menores a 10 años.</li>
                    </ul>
                </div>
                <div v-else-if="(dataUser.institution && dataUser.institution.id == 399)" class="sd-politicas-uso">
                    <ul>
                        <li>Estudio no acumulable/ limitado a una cortesía por persona.</li>
                        <li>Cupón no valido sin el sello y/o nombre de la institución.</li>
                        <!-- <li>Valido solo en clínica La Paz.</li>
                        <li>Dirección: Blvd. Forjadores #3110, Adolfo Ruíz Cortínez, 23040 La Paz, B.C.S.</li> -->
                    </ul>
                </div>
                <div v-else-if="cupon.lentes == 1" class="sd-politicas-uso">
                    <ul>
                        <li>Válido para un par de lentes monofocales o bifocales, en CR-39 Blanco, sin tratamientos hasta + - 3.75 dioptrías, a partir de +-4 dioptrías en policarbonato, con armazón económico.</li>
                        <li>Armazones, diseño, tratamiento y material no son intercambiables.</li>
                        <li>Valido un cupón por persona. No es válido para devoluciones para devoluciones en  efectivo ni con tarjeta.</li>
                    </ul>
                </div>
                <div v-else-if="cupon.clinicaId == 20" class="sd-politicas-uso-2">
                    <div v-if="cupon.estudioName == 'Paquete Qs3'">
                        <ul>
                            <li>Estudio no acumulable. Limitado a una cortesía por persona.</li>
                            <li>Estudio valido solo con previa cita.</li>
                            <li>Cupón valido por Biometría Hematica, QS 3 elementos, ferritina, Dimero D y Proteína C reactiva.</li>
                        </ul>
                    </div>
                    <div v-else class="sd-politicas-uso-2">
                        <ul>
                            <li>Estudio no acumulable. Limitado a una cortesía por persona.</li>
                            <li>Estudio valido solo con previa cita.</li>
                        </ul>
                    </div>
                </div>
                <div v-else class="sd-politicas-uso">
                    <ul>
                        <li>Estudio no acumulable. Limitado a una cortesía por persona.</li>
                        <li>Estudio valido solo con previa cita. Sin cita, el paciente no podrá ser atendido.</li>
                        <li>Cupón no valido sin el sello y/o nombre de la institución.</li>
                    </ul>
                </div>

                <div v-if="cupon.lentes == 0 || dataUser.institution.id == 399" class="sd-contendor-sucursal">
                    <div v-if="cupon.clinicaId == 20">
                        <p class="sd-sucursal">Válido en cualquier clínica de Salud Digna en <b>Culiacán</b>.</p>
                    </div>
                    <div v-else>
                        <div v-if="cupon.clinicaId == 30">
                            <p class="sd-sucursal">Válido en las clínicas de</p>
                            <p class="sd-text-ma">
                                <strong class="sd-clinica">{{cupon.clincaName}}</strong>
                            </p>
                        </div>
                        <div v-else>
                            <p class="sd-sucursal">Válido solo en clínica</p>
                            <p class="sd-text">
                                <strong class="sd-clinica">{{cupon.clincaName}}</strong>
                            </p>
                        </div>
                    </div>
                </div>
        <!-- <div class="sd-nota">
                    <p class="sd-text">
                        Este cupón es una cortesía y su venta está prohibida.
                        <br>
                        No es negociable, intercambiable ni representa moneda legal.
                    </p>
                </div> -->
            </div>
            <div class="sd-item-content">
                <div v-if="cupon.lentes == 1" class="sd-datos-folio">
                    <p  v-if="dataUser.institution.id == 399" class="sd-direccion-sucursal">{{cupon.clinicalAddress}}</p>
                    <div class="sd-content-folio">
                        <p class="sd-text">Folio</p>
                        <p class="sd-folio">{{cupon.folio}}</p>
                        <p class="sd-estudio">LENTES</p>
                    </div>
                    <div class="sd-codigo-barras">
                        <barcode :value="cupon.folio" height="15"  background="#EDEDED" displayValue="false" width="1" >
                        No se pudo generar el Código de barras
                        </barcode>
                    </div>
                    <div class="sd-vigencia">
                        <div v-if="cupon.clinicaId == 30">
                            <p class="sd-text2">{{dateFormat(cupon.vigencia)}}</p>
                        </div>
                        <div v-else>
                            <p class="sd-text">{{dateFormat(cupon.vigencia)}}</p>
                        </div>
                        <p class="sd-text-lentes">
                            Este cupón es una cortesía y su venta esta prohibida. <br>
                            No es negociable, intercambiable ni representa moneda legal.
                        </p>
                    </div>
                </div>
                <div v-else class="sd-datos-folio">
                    <div v-if="cupon.clinicaId == 30">
                        <p class="sd-direccion-sucursal2" style = "white-space: pre-wrap;">{{cupon.clinicalAddress}}</p>
                    </div>
                    <div v-else>
                        <p class="sd-direccion-sucursal">{{cupon.clinicalAddress}}</p>
                    </div>
                    <div v-if="cupon.estudioName == 'Paquete Qs3'">
                        <div class="sd-content-folio">
                            <p class="sd-text">Folio</p>
                            <p class="sd-folio">{{cupon.folio}}</p>
                            <p v-if="(dataUser.institution && dataUser.institution.id == 399)">QS3</p>
                        </div>
                    </div>
                    <div v-else>
                        <div class="sd-content-folio">
                            <p class="sd-text">Folio</p>
                            <p class="sd-folio">{{cupon.folio}}</p>
                            <p class="sd-estudio">{{cupon.estudioName}}</p>
                        </div>
                    </div>
                    <div class="sd-codigo-barras">
                        <barcode :value="cupon.folio" height="15"  background="#EDEDED" displayValue="false" width="1" >
                        No se pudo generar el Código de barras
                        </barcode>
                    </div>
                        <div v-if="cupon.clinicaId == 30">
                            <div class="sd-vigencia">
                                <p class="sd-text2">{{dateFormat(cupon.vigencia)}}</p>
                                <p class="sd-text2">
                                    Este cupón es una cortesía y su venta esta prohibida. <br>
                                    No es negociable, intercambiable ni representa moneda legal.
                                </p>
                            </div>
                        </div>
                        <div v-else>
                            <div class="sd-vigencia">
                                <p class="sd-text">{{dateFormat(cupon.vigencia)}}</p>
                                <p class="sd-text">
                                    Este cupón es una cortesía y su venta esta prohibida. <br>
                                    No es negociable, intercambiable ni representa moneda legal.
                                </p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <div class="sd-item-cupon" v-else>
            <div class="sd-item-content congreso-content" style="position: relative">
                <img src="../assets/imgs/fondo.png" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;" />
                <div class="sd-item-logo" style="z-index: 1">
                    <img src="../assets/imgs/logo-sd-congreso.svg" alt="Logo Salud Digna">
                    <p class="sd-text" style="color: #cdd1d1;">INSTITUCIÓN DE APOYO A LA PREVENCIÓN Y EL DIAGNOSTICO OPORTUNO</p>
                </div>
                <div v-if="cupon.clinicaId != 20" style="z-index: 1">
                    <div class="logo-instituciones">
                        <img src="../assets/imgs/logo_congreso.png" alt="Logo campaña">
                        <img v-if="cupon.parentEstudioId==3" src="../assets/imgs/logo_coppel.png" alt="Logo Coppel">
                    </div>
                </div>
                <div v-if="cupon.estudioName == 'Ultrasonido'" class="sd-politicas-uso" style="padding: 0px 5px; color: white; z-index: 1">
                    <ul>
                        <li>Válido por cualquier tipo de ultrasonido excepto <b>doppler, mamario tendionoso, transfontanelar y transvaginal.</b></li>
                        <li>No acumulable, limitado a una cortesía por persona.</li>
                        <li>Estudios válidos solo con previa cita.</li>
                    </ul>
                </div>
                <div v-else-if="cupon.estudioName == 'Paquete Qs6 Parámetros'" class="sd-politicas-uso" style="padding: 0px 5px; color: white; z-index: 1">
                    <ul>
                        <li>Química Sanguínea de seis elementos <b>(glucosa, colesterol, triglicéridos, ácido úrico, urea y creatinina).</b></li>
                        <li>No acumulable, limitado a una cortesía por persona.</li>
                        <li>Estudios válidos solo con previa cita.</li>
                    </ul>
                </div>
                <div v-else-if="cupon.estudioName == 'Densitometría'" class="sd-politicas-uso" style="padding: 0px 5px; color: white; z-index: 1">
                    <ul>
                        <li>Válido por un estudio de densitometría.</li>
                        <li>No acumulable, limitado a una cortesía por persona.</li>
                        <li>Estudios válidos solo con previa cita.</li>
                    </ul>
                </div>
                <div v-else-if="cupon.estudioName == 'Papanicolaou'" class="sd-politicas-uso" style="padding: 0px 5px; color: white; z-index: 1">
                    <ul>
                        <li>Válido por un estudio de papanicolaou en base líquida.</li>
                        <li>No acumulable, limitado a una cortesía por persona.</li>
                        <li>Estudios válidos solo con previa cita.</li>
                    </ul>
                </div>
                <div v-else-if="cupon.lentes == 1" class="sd-politicas-uso" style="padding: 0px 5px; color: white; z-index: 1">
                    <ul>
                        <li>Válido por un par de <b>lentes graduados con antireflejante.</b></li>
                        <li>No acumulable, limitado a una cortesía por persona.</li>
                        <li>Estudios válidos solo con previa cita.</li>
                    </ul>
                </div>
                <div v-else-if="cupon.estudioName == 'Mastografía'" class="sd-politicas-uso" style="padding: 0px 5px; color: white; z-index: 1">
                    <ul>
                        <li>Válido por un estudio de mastografía.</li>
                        <li>No acumulable, limitado a una cortesía por persona.</li>
                        <li>Estudios válidos solo con previa cita.</li>
                    </ul>
                </div>
                <div v-else-if="cupon.estudioName == 'Electrocardiograma'" class="sd-politicas-uso" style="padding: 0px 5px; color: white; z-index: 1">
                    <ul>
                        <li>Válido por un estudio de electrocardiograma.</li>
                        <li>No acumulable, limitado a una cortesía por persona.</li>
                        <li>Estudios válidos solo con previa cita.</li>
                    </ul>
                </div>

                <div class="sd-contendor-sucursal" style="background-color: #fbb03f; z-index: 1">
                    <div>
                        <p class="sd-sucursal"><b>Válido en todas las clínicas de Salud Digna México y Nicaragua </b>presentando este cupón en físico.</p>
                    </div>
                </div>
        <!-- <div class="sd-nota">
                    <p class="sd-text">
                        Este cupón es una cortesía y su venta está prohibida.
                        <br>
                        No es negociable, intercambiable ni representa moneda legal.
                    </p>
                </div> -->
            </div>
            <div class="sd-item-content">
                <div style="text-align: center">
                    <img v-if="cupon.estudioName == 'Densitometría'" style="width: 40%" src="../assets/imgs/congreso-iconos/densitometria.svg" />
                    <img v-if="cupon.estudioName == 'Electrocardiograma'" style="width: 40%" src="../assets/imgs/congreso-iconos/electrocardiograma.svg" />
                    <img v-if="cupon.estudioName == 'Mastografía'" style="width: 40%" src="../assets/imgs/congreso-iconos/mastografia.svg" />
                    <img v-if="cupon.estudioName == 'Paquete Qs6 Parámetros'" style="width: 40%" src="../assets/imgs/congreso-iconos/quimicasanguinea.svg" />
                    <img v-if="cupon.estudioName == 'Ultrasonido'" style="width: 40%" src="../assets/imgs/congreso-iconos/ultrasonido.svg" />
                    <img v-if="cupon.estudioName == 'Papanicolaou'" style="width: 40%" src="../assets/imgs/congreso-iconos/papanicolaou.svg" />
                    <img v-if="cupon.lentes == 1" style="width: 40%" src="../assets/imgs/congreso-iconos/lentes.svg" />
                </div>
                <div v-if="cupon.lentes == 1" class="sd-datos-folio">
                    <p class="sd-direccion-sucursal"></p>
                    <div class="sd-content-folio">
                        <p class="sd-text">Folio</p>
                        <p class="sd-folio">{{cupon.folio}}</p>
                        <p class="sd-estudio">LENTES</p>
                    </div>
                    <div class="sd-codigo-barras">
                        <barcode :value="cupon.folio" height="15"  background="#EDEDED" displayValue="false" width="1" >
                        No se pudo generar el Código de barras
                        </barcode>
                    </div>
                    <div class="sd-vigencia">
                        <p class="sd-text">{{dateFormat(cupon.vigencia)}}</p>
                    </div>
                </div>
                <div v-else class="sd-datos-folio">
                    <div v-if="cupon.clinicaId == 30">
                        <p class="sd-direccion-sucursal2" style = "white-space: pre-wrap;">{{cupon.clinicalAddress}}</p>
                    </div>
                    <div v-else>
                        <p class="sd-direccion-sucursal">{{cupon.clinicalAddress}}</p>
                    </div>
                    <div v-if="cupon.estudioName == 'Paquete Qs3'">
                        <div class="sd-content-folio">
                            <p class="sd-text">Folio</p>
                            <p class="sd-folio">{{cupon.folio}}</p>
                        </div>
                    </div>
                    <div v-else>
                        <div class="sd-content-folio">
                            <p class="sd-text">Folio</p>
                            <p class="sd-folio">{{cupon.folio}}</p>
                            <p class="sd-estudio">{{cupon.estudioName === 'Paquete Qs6 Parámetros' ? 'Química Sanguínea de seis elementos' : cupon.estudioName}}</p>
                        </div>
                    </div>
                    <div class="sd-codigo-barras">
                        <barcode :value="cupon.folio" height="15"  background="#EDEDED" displayValue="false" width="1" >
                        No se pudo generar el Código de barras
                        </barcode>
                    </div>
                    <div class="sd-vigencia">
                        <p class="sd-text">{{dateFormat(cupon.vigencia)}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="sd-preparacion-estudio" :class="{'marginHoja': ((c+1)%6)==0}">
            <table>
                <thead>
                    <th colspan="2">Información importante:</th>
                </thead>
                <tbody>
                    <tr height="80px">
                        <div v-if="cupon.lentes == 1">
                            <div v-if="cupon.clinicaId == 15 || cupon.clinicaId == 16">
                                <td>
                                    <li>Cupón valido en la clínica de {{cupon.clincaName}}, Dirreccion: {{cupon.clinicalAddress}}</li>
                                </td>
                            </div>
                            <div v-else-if="(dataUser.institution && dataUser.institution.id == 399)">
                                <td>
                                    <li>Valido por un par de lentes monofocal/bifocal para niños de 6 a 15 años, material CR-39 blanco (en caso de graduación superior a 5 dioptrías será fabricado en policarbonato), sin tratamiento, armazón económico en estuche sencillo. garantía de 15 días en graduación y tres meses por defecto de fábrica</li>
                                </td>
                            </div>
                            <div v-else>
                                <td>
                                    <li>Cupón valido en las clínicas de: Oaxaca, Tuxtla Gutierrez, Tuxtla Gutierrez 5ta Norte, San Cristobal, Chihuahua, Chihuahua Deportista, Ciudad Juárez, Mérida y Mérida Altabrisa.</li>
                                </td>
                            </div>
                        </div>
                        <div v-else>
                            <td>
                                <li>Para evitar aglomeraciones, es importante que asista la persona que solo se realizará el estudio. Llevar acompañante solo en caso de ser necesario.</li>
                                <li>Es importante que asista a clínica con su cubre bocas.</li>
                                <li>Puedes <a style="color: #FF0000;">agendar tu cita, consultar preparaciones y  tus resultados</a> al <strong>01 800 008 2828</strong> o en la página de internet: <a href="" style="color: #0000FF;">https://salud-digna.org/</a></li>
                            </td>
                        </div>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
*{
  font-family: 'Open Sans', sans-serif;
}
.marginHoja{
    margin-bottom: 100px;
}
.sd-contenedor-cupones{
    margin: 0 auto;
    width: 792px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    
}
.sd-contenedor-cupones  .v-application p{
    margin-bottom: 0!important;
}
.sd-item-cupon{
    width: 392px;
    display: flex;
    background-color: #EDEDED;
    padding: 10px 5px;
    margin-bottom: 15px;
    height: 230px;
}

.sd-item-cupon .sd-item-content:nth-child(1){
    width: 303px;
    padding-right: 5px;
    border-right: 2px dashed #AFAFAF;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sd-item-cupon .sd-item-content:nth-child(2){
    width: 167px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    padding-left: 5px;
}

.sd-item-logo{
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    width: 100%;
}

.sd-item-logo .sd-text{
    font-size: 7px;
    color: #1C9545;
    text-align: center;
    font-weight: bold;
}

.sd-item-logo img:nth-child(1){
    width: 88px;
    height: auto;
    margin-right: 5px;
}

.logo-instituciones{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.logo-instituciones img:nth-child(1){
    width: 90px;
    height: auto;
}

.logo-instituciones img:nth-child(2){
    width: 100px;
    height: auto;
    margin-left: 10px;
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

.sd-direccion-sucursal{
    font-size: 7px;
    margin: 0 0 2px 0;
    font-weight: bold;
}

.sd-direccion-sucursal2{
    font-size: 4.5px;
    margin: 0 0 2px 0;
    font-weight: bold;
}

.sd-sucursal{
    font-size: 10px;
    font-weight: 600;
    margin: 0 0 5px 0;
    line-height: 11px;
    margin-bottom: 0!important;
}

.sd-content-folio{
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px dashed #FBAB1F;
    padding: 8px;
    margin-bottom: 10px;
    width: 95%;
    height: 75px;
    justify-content: center;
    text-align: center;
    line-height: 30px;
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
    line-height: 11px;
    margin-bottom: 0!important;
}

.sd-text-ma{
    font-size: 10px;
    margin: 0;
    line-height: 11px;
    margin-bottom: 0!important;
}

.sd-text-lentes{
    font-size: 8px;
    margin: 0;
    line-height: 11px;
    margin-bottom: 0!important;
}

.sd-estudio{
    font-size: 10px;
    margin: 0;
    line-height: 11px;
}

.sd-politicas-uso ul{
    padding: 0 0 0 15px;
    margin: 10px 0;
    line-height: 10px;
}

.sd-politicas-uso ul li{
    font-size: 10px;
}

.sd-politicas-uso-2 ul li{
    font-size: 12px;
}

.sd-contendor-sucursal{
    width: 80%;
    background-color:#00af50;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 3px;
    padding: 5px;
}
.sd-clinica{
    text-transform: uppercase;
}

.sd-nota{
    margin-top: 10px;
}

.sd-nota .sd-text{
    font-size: 8px;
    color: #000;
    text-align: center;
    font-weight: bold;
}

.sd-vigencia .sd-text{
    color: #1C9545;
    font-weight: bold;
    font-size: 8px;
    text-align: left;
}

.sd-vigencia .sd-text:nth-child(2){
    color: #111;
    font-size: 4.2px;
    text-align: center;
    line-height: 6px;
}

.sd-vigencia .sd-text2{
    color: #1C9545;
    font-weight: bold;
    font-size: 7.5px;
    text-align: left;
    margin: 0;
}

.sd-vigencia .sd-text2:nth-child(2){
    color: #111;
    font-size: 4.2px;
    text-align: center;
    line-height: 6px;
    padding: 5px 0px 0px 0px;
}

.sd-cupon-general{
    width: 392px;
    margin-bottom: 15px;
}

.sd-preparacion-estudio table{
    width: 100%;
    border-spacing: 0;
    font-size: 10px;
    height: 80px;
    font-weight: bold;
}

.sd-preparacion-estudio table td{
    text-align: left;
    vertical-align: middle;
    border: 1px solid;
    border-color: #111;
    border-spacing: 0;
    font-size: 8px;
    padding: 2px;
}


.sd-preparacion-estudio table th{
    text-align: left;
    vertical-align: middle;
    border: 1px solid;
    border-color: #111;
    border-spacing: 0;
    border-bottom-width: 0;
    text-align: left;;
    font-weight: bold;
}

/* CONGRESO MEDICO INTERNACIONAL */
.sd-item-cupon .congreso-content{
    background-size: cover;
    padding: 0px 5px;
}
</style>
<script>
import VueBarcode from 'vue-barcode';
export default {
  name:"cuponera",
  components: {
    'barcode': VueBarcode
  },
  mounted(){
    this.dataUser = JSON.parse(sessionStorage.getItem('dataUser'))
    console.log(this.dataUser.congreso)
  },
  data:()=>({
      dataUser:null,
      imageMask: {
          Ultrasonido: "ultrasonido.svg",
          Densitometría: "densitometria.svg",
          Papanicolaou: "",
          Lentes: "",
          Mastografía: "mastografia.svg",
          Electrocardiograma: "electrocardiograma.svg",
          QuimicaSanguinea: "quimicasanguinea.svg"
      }
  }),
  props:{
    cupones:[]
  },
  methods: {
      dateFormat(date){
        var strArray=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        var d = new Date(date);
        var day = d.getUTCDate();
        var month = strArray[d.getUTCMonth()];
        var year = d.getUTCFullYear();

        return 'Vigencia al ' + (day <= 9 ? '0' + day : day) + ' de ' + month + ' de ' + year;
    }
  }
}
</script>