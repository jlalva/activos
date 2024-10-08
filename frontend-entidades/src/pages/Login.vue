<script setup>
import { reactive, ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import validaciones from '../common/validations'

const rulesLogin = {
  usuario: [validaciones.requerido],
  contrasena: [
    validaciones.requerido,
    validaciones.contrasena
  ]
}

const Router = useRouter()

const isPwd = ref(true)
const Auth = inject('auth')

const formulario = reactive({
  usuario: '',
  contrasena: ''
})

const login = async () => {
  await Auth.login({ usuario: formulario.usuario, clave: formulario.contrasena })
}

const recuperarContrasena = () => {
  Router.push('/recuperar-contrasena')
}
</script>

<template>
  <q-page >
    <div class="row q-col-gutter-xs h-screen">
        <div class="gt-xs col-xs-12 col-sm-6 col-md-8 col-lg-9">
          <div class="full-height column full-width main-background">
            <p class="text-bold text-h2 text-center text-primary q-mt-xl">SISTEMA DE GESTION DE ACTIVOS FIJOS</p>
          </div>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 bg-white full-height">
          <div class="full-height column full-width justify-center">
            <img class="xs" src="~assets/inventory_2.jpg" alt="" style="width:100%;">

            <p class="text-center text-bold text-h5 text-primary">SISTEMA DE GESTION DE ACTIVOS FIJOS</p>

            <p class="text-bold text-info q-ml-md">Ingresar como usuario</p>

            <q-card flat>
              <q-card-section>
                <q-form @submit="login" class="row q-col-gutter-sm">
                  <q-input
                    class="col-xs-12"
                    filled
                    v-model="formulario.usuario"
                    label="Usuario o correo electrónico"
                    lazy-rules
                    square
                    autofocus
                    :rules="rulesLogin.usuario"
                  >
                    <template v-slot:append>
                      <q-icon
                        name="people"
                        color="primary"
                      />
                    </template>
                  </q-input>

                  <q-input
                    filled
                    v-model="formulario.contrasena"
                    label="Contraseña"
                    lazy-rules
                    square
                    :type="isPwd ? 'password' : 'text'"
                    :rules="rulesLogin.clave"
                    class="col-xs-12"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                        color="primary" />
                    </template>
                  </q-input>

                  <div class="col-xs-12">
                    <q-btn
                      color="primary"
                      type="submit"
                      no-caps
                      class="full-width"
                      label="Ingresar" />
                  </div>

                  <div class="col-xs-12">
                    <q-btn
                      flat
                      color="info"
                      no-caps
                      class="full-width"
                      label="Olvide mi contraseña"
                      @click="recuperarContrasena"/>
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </div>
    </div>
  </q-page>
</template>

<style lang="scss">
.h-screen {
  height: 100vh;
}

.h-full {
  height: 100%;
}

.w-full {
  width: 100%;
}

.absolute {
  position: absolute;
}

.b-0 {
  bottom: 0;
}

.main-background {
  top: 0;
  left: 0;
  background: url('assets/inventory_2.jpg') no-repeat;
  background-position: center;
  background-position-y: center;
  background-size: contain;

}

.main-background-color {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba($color: #000000, $alpha: 0.5) ;
  background-size: cover;
}

.main-content {
  z-index: 3;
}
</style>
