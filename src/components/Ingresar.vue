<template>
  <v-container class="h-100">
    <v-row class="text-center h-100 centroVertical">
      <v-col cols="12" md="4" class="loginCont">
        <div class="d-flex flex-column">
          <v-img :src="require('../assets/imgs/user.png')" class="my-3" contain height="150" />
          <div class="contUsuario">
            <i class="icon-usuario"></i>
            <input
              type="text"
              v-model="user"
              class="inputUser required"
              placeholder="Usuario"
              required
            />
          </div>
          <div class="contPass">
            <i  class="icon-contraseña"></i>
            <input
              type="password"
              v-model="pass"
              class="inputPass required"
              placeholder="Contraseña"
              required
            />
          </div>
          <div class="alert alert-danger mb-none alert-dismissible fade" :class="{show: this.alert}" role="alert">
                            {{error}}
                            <!-- <button type="button" class="close">
                                <span aria-hidden="true">&times;</span>
                            </button> -->
                        </div>
          <div class="my-2" style="padding-top:2em">
            <v-btn 
              @click="logIn"
              class="btnIniciarSesion letraNormal"
              color="primary"
              :loading="!status"
            >Iniciar sesión</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.loginCont {
  background: rgba(255,255,255,0.75);
  border-radius: 15px;
  align-self: flex-start;
  flex: 0 1 auto;
}
.h-100 {
  height: 100%;
}
.centroVertical {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
}
.user {
  border: 0px solid #666;
  border-radius: 64px;
  height: 134px;
  width: 134px;
}

.contUsuario,
.contPass {
  background-color: #fff;
  color: gray;
  border: 1px solid #afafaf;
  border-radius: 5px;
  width: 340px;
  align-self: center;
  margin-top: 20px;
  height: 40px;
  font-size: 16px;
}
.mb-none {
  margin-bottom: -47px;
}
.inputPass,
.inputUser {
  width: 296px;
  border-radius: 0px 10px 10px 0px;
}
.inputPass:focus,
.inputUser:focus {
  outline: none;
}
.contUsuario i,
.contPass i {
  font-size: 22px;
  position: relative;
  top: 2px;
  left: 3px;
}
.contUsuario:focus-within,
.contPass:focus-within {
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.25);
  transition: 0.3s;
}
.btnIniciarSesion {
  width: 340px;
  margin-top: 30px;
  height: 40px;
  font-size: 16px;
}
.letraNormal .v-btn__content {
  text-transform: none;
}
</style>
<script>
import loginService from '../services/login'
export default {
  name: "HelloWorld",

  data: () => ({
    user: null,
    status: true,
    error:null,
    alert:false,
    pass:null
  }),
  methods:{
    logIn(){
      this.status=false
      loginService.login(this.user.toLowerCase(), this.pass).then(res => {
                console.log(res)
        if(res.status==true){
        console.log(res)
        sessionStorage.setItem('dataUser',JSON.stringify(res.data))
        sessionStorage.setItem('token', res.accesToken)
        window.location.href = '/inicio'
        }
        else{
          this.alert = true
          this.status= true
          this.error=res.message
        }
      }).catch(err => {
          this.alert = true
          this.status= true
          if (err == 'Error: Network Error'){
              this.error = 'No hay conexión con servidor'
          }else if(err == 'Error: Request failed with status code 404'){
              this.error = 'Usuario o contraseña incorrecto'
          }else if(err == 'Error: Request failed with status code 500'){
              this.error = 'Reintentar en 1 minuto, Error 500'
          }
          else {
            this.error = err
          }

      })
    }
  }
};
</script>
