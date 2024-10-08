<script setup>
import validations from 'src/common/validations'
import { inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const authModelValidation = {
  correo: [
    validations.requerido,
    validations.correo
  ],
  contrasena: [
    validations.requerido,
    validations.contrasena
  ]
}

const Router = useRouter()
const Message = inject('message')

const recuperacionModel = ref({
  correo: 'demo.persona@yopmail.com',
  contrasena: 'Developer',
  repetirContrasena: 'Developer'
})
const codigo = ref()

const cancelar = () => {
  Router.replace('/')
}

const enviarCorreo = async () => {
  try {
    await axios({
      method: 'POST',
      url: `${process.env.BACKEND_URL}/auth/recuperar-contrasena`,
      data: { correo: recuperacionModel.value.correo }
    })

    Message.success('Correo de recuperacion enviado de forma exitosa.')

    Router.replace('/')
  } catch (error) {
    let mensaje = 'Error al cambiar la contraseña, comuniquese con el administrador'

    const { response } = error

    response.data.mensaje && (mensaje = response.data.mensaje)

    Message.error(mensaje)
  }
}

const cambiarContrasena = async () => {
  try {
    await axios({
      method: 'POST',
      url: `${process.env.BACKEND_URL}/auth/cambiar-contrasena`,
      data: {
        contrasena: recuperacionModel.value.contrasena,
        codigo: Router.currentRoute.value?.query?.codigo
      }
    })

    Message.success('Cambio de contraseña realizado con exito')

    Router.replace('/')
  } catch (error) {
    let mensaje = 'Error al cambiar la contraseña, comuniquese con el administrador'

    const { response } = error

    response.data.mensaje && (mensaje = response.data.mensaje)

    Message.error(mensaje)
  }
}

onMounted(() => {
  codigo.value = Router.currentRoute.value.query.codigo
})
</script>

<template>
  <q-page class="full-height" padding>
    <section class="h-screen full-width column justify-center">
      <div class="row justify-center">
        <div v-if="!codigo" class="col-xs-12 col-sm-8 col-md-4">
          <q-card>
            <q-card-section>
              <q-form @submit="enviarCorreo" class="row q-col-gutter-md">
                <div class="col-xs-12">
                  <p class="text-primary text-bold">Ingrese la dirección de correo electrónico verificada de su cuenta de usuario y le enviaremos un enlace para restablecer su contraseña.</p>
                </div>

                <q-input
                  v-model="recuperacionModel.correo"
                  class="col-xs-12"
                  filled
                  label="Correo electronico"
                  :rules="authModelValidation.correo"/>

                <div class="col-xs-12 text-center q-gutter-lg">
                  <q-btn
                    icon="close"
                    label="Cancelar"
                    @click="cancelar"/>

                  <q-btn
                    color="primary"
                    icon="done_all"
                    label="Enviar correo"
                    type="submit" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>

        <div v-if="codigo" class="col-xs-12 col-sm-8 col-md-4">
          <q-card>
            <q-card-section>
              <q-form @submit="cambiarContrasena" class="row q-col-gutter-md">
                <div class="col-xs-12">
                  <p class="text-primary text-bold">Ingrese la nueva contraseña para el ingreso al sistema.</p>
                </div>

                <q-input
                  v-model="recuperacionModel.contrasena"
                  class="col-xs-12"
                  filled
                  label="Nueva contraseña"
                  :rules="authModelValidation.contrasena"/>

                <q-input
                  v-model="recuperacionModel.repetirContrasena"
                  class="col-xs-12"
                  filled
                  label="Repetir contraseña"
                  :rules="authModelValidation.contrasena"/>

                <div class="col-xs-12 text-center q-gutter-lg">
                  <q-btn
                    icon="close"
                    label="Cancelar"
                    @click="cancelar"/>

                  <q-btn
                    :disable="recuperacionModel.contrasena !== recuperacionModel.repetirContrasena || !recuperacionModel.contrasena?.length"
                    color="primary"
                    icon="done_all"
                    label="Cambiar la contraseña"
                    type="submit" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>
  </q-page>
</template>

<style scoped>
.h-screen {
  height: 100vh;
}
</style>
