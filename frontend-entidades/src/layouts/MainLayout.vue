<template>
  <q-layout view="lHh LpR lFf">
    <q-header :class="{ 'bg-primary': ! $q.dark.isActive, 'q-dark': $q.dark.isActive }">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          class="text-white"
          icon="menu"
          color="white"
          @click="toggleLeftDrawer"
        />
        <q-btn
          dense
          flat
          round
          class="text-white"
          :icon="mini?'keyboard_arrow_right':'keyboard_arrow_left'"
          color="white"
          @click="toogleMini"
        />
        <div class="text-h6 text-weight-bold">
          {{appName}}
        </div>
        <q-space />

        <q-toggle
          v-model="darkMode"
          icon="dark_mode"
          @click="darkModeChange"
        />

        <q-item
          clickable
          v-ripple
        >
          <q-item-section v-if="usuario">
            <q-avatar
              color="secondary text-white"
              v-if="usuario.usuario"
            >
              {{
                  usuario?.foto_perfil
                    ? ""
                    : usuario?.usuario?.toUpperCase().charAt(0)
                }}
              <img
                v-if="usuario.foto_perfil"
                :src="`${rutaImagen}/Src/Uploads/${usuario.foto_perfil}`"
                style="max-width: 80px"
              />
            </q-avatar>
          </q-item-section>

          <q-menu
            anchor="bottom right"
            self="top right"
          >
            <q-list style="min-width: 300px">
              <q-item class="text-secondary">
                <q-item-section>
                  <div class="row">
                    <div class="col-xs-2 column justify-center">
                      <q-avatar
                        color="primary text-white"
                        style="vertical-align: middle"
                        v-if="usuario.usuario"
                      >
                        {{
                            usuario.foto_perfil
                              ? ""
                              : usuario?.usuario?.toUpperCase().charAt(0)
                          }}
                        <img
                          v-if="usuario.foto_perfil"
                          :src="`${rutaImagen}/Src/Uploads/${usuario.foto_perfil}`"
                          style="max-width: 80px"
                        />
                      </q-avatar>
                    </div>
                    <div class="col-xs-10 q-pl-md">
                      <p class="text-h6">
                      </p>
                      <p class="text-weight-regular">
                        <q-icon
                          name="people"
                          size="xs"
                          color="primary"
                        /> {{ usuario.usuario }}
                      </p>
                      <p class="text-weight-regular">
                        <q-icon
                          name="email"
                          size="xs"
                          color="primary"
                        />

                        {{ usuario.correoElectronico }}
                      </p>
                      <q-list class="no-padding">
                        <q-item
                          class="no-padding"
                          tag="label"
                          v-ripple
                          v-for="(cargo, index) of usuario.cargos"
                          :key="index"
                        >

                          <q-item-section side>
                            <q-icon
                              size="xs"
                              color="primary"
                              name="people"
                            />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ cargo.descripcion }}</q-item-label>
                          </q-item-section>
                          <q-item-section
                            side
                            top
                          >
                            <q-chip
                              v-if="cargo.id === usuario.idCargo"
                              size="sm"
                              text-color="white"
                              color="positive"
                              label="ACTIVO"
                            />
                          </q-item-section>
                        </q-item>

                      </q-list>
                    </div>
                  </div>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                @click="verPerfil"
              >
                <q-item-section avatar>
                  <q-icon
                    color="primary"
                    name="person_outline"
                  />
                </q-item-section>
                <q-item-section>Mi cuenta</q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                v-close-popup
                @click="logout"
              >
                <q-item-section avatar>
                  <q-icon
                    color="primary"
                    name="exit_to_app"
                  />
                </q-item-section>
                <q-item-section>Cerrar sesión</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      :breakpoint="700"
      class="bg-secondary"
      :width="250"
      :mini="mini"
    >
      <div class="text-center">
        <div
          class="text-center q-pa-md"
          v-if="!mini"
        >
          <q-avatar
            v-if="usuario?.nombres"
            size="64px"
            font-size="42px"
            color="info"
            text-color="white"
          >
            {{ usuario?.usuario[0]?.toUpperCase() }}

          </q-avatar>
          <div class="text-weight-bold text-white q-mt-sm">{{ usuario?.usuario }}</div>
          <div class="text-weight-bold text-white q-mt-sm">{{ usuario?.correoElectronico }}</div>
        </div>
        <div v-else>
          <q-avatar
            v-if="usuario?.nombres"
            size="40px"
            font-size="35px"
            color="info"
            text-color="white"
            class="q-my-md"
          >
            <q-tooltip
              anchor="center end"
              self="center start"
              class="bg-info text-white text-body2"
            >
              {{ `${usuario.nombres} ${usuario.primerApellido} ${usuario.segundoApellido}` }}
            </q-tooltip>
            {{ usuario?.nombres[0]?.toUpperCase() }}
          </q-avatar>
        </div>
      </div>
      <!-- <pre class="text-white">{{ usuario }}</pre> -->
      <q-select
        v-if="!mini"
        v-model="perfilSeleccionado"
        :options="perfiles"
        map-options
        emit-value
        option-value="id"
        option-label="nombre"
        class="q-px-xs"
        outlined
        bg-color="white"
        label="Seleccionar perfil" />

        <div class="text-white">
          <q-list>
            <q-expansion-item
              v-for="menu in menu"
              :key="menu.nombre"
              :icon="menu.icono"
              :label="menu.nombre"
              :default-opened="false"
              @click="menu.ruta ? $router.push(`/app/${menu.ruta}`) : ''"
            >
              <q-item
                class="col-xs-10 q-pl-md"
                v-for="item in menu.submenus"
                :key="item.ruta"
                :active="esSeleccionado(item)"
                clickable
                v-ripple
                active-class="bg-primary text-white"
                @click="$router.push(`/app/${item.ruta}`)"
              >
                <q-item-section avatar>
                  <q-icon
                    :name="item.icono"
                    :color="esSeleccionado(item) ? 'white' : 'grey'"
                  >
                    <q-tooltip
                      v-if="mini"
                      anchor="center end"
                      self="center start"
                      class="bg-secondary text-white text-body2"
                    >
                      {{ item.nombre }}
                    </q-tooltip>
                  </q-icon>
                </q-item-section>

                <q-item-section :class="esSeleccionado(item) ? 'text-white' : 'text-grey'">
                  {{ item.nombre }}
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-list>
        </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <q-footer
      v-if="!coreStore?.usuario?.noVidente"
      class="bg-white text-primary q-mt-xl"
      bordered
    >
      <q-toolbar>
        <q-space></q-space>
        <q-toolbar-title>
          <div class="text-bold text-body2 text-right">
            © Web solutions {{ new Date().getFullYear() }}
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed, inject, onBeforeMount } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { useCoreStore } from 'src/stores/coreStore'

export default defineComponent({
  name: 'MainLayout',
  setup (props, context) {
    const verBuscador = ref(false)
    const Auth = inject('auth')
    const coreStore = useCoreStore()
    // const publicVapidKey = 'BMOfX236PiL1l4hYQnHv5vEZGWbxbLDXPyOc8fcGu-uhk6vkryhTTYMk9BI03AGN7vtYGyEzDEz2j9utIZy2SOs'
    const _router = useRouter()
    const perfiles = ref([])
    const perfilSeleccionado = ref(null)

    onBeforeMount(() => {
      Auth.initStore()

      perfiles.value = coreStore.usuario?.perfiles

      perfilSeleccionado.value = coreStore.usuario?.perfil.id
    })

    const Quasar = useQuasar()
    const darkMode = ref(Quasar.dark.isActive)
    const leftDrawerOpen = ref(false)
    const route = useRoute()
    const mini = ref(false)
    const mostrar = ref(false)
    const dialogSearch = ref(true)
    const search = ref('')
    const appName = 'SISTEMA DE GESTION DE ACTIVOS FIJOS'

    const logout = async () => {
      await Auth.logout()
    }

    function verPerfil () {
      _router.push({ name: 'mi-perfil', params: { id: coreStore.usuario.id } })
    }

    function verTutoriales () {
      window.open('')
    }

    return {
      perfilSeleccionado,
      perfiles,
      appName,
      verTutoriales,
      verPerfil,
      verBuscador,
      logout,
      darkMode,
      darkModeChange () {
        Quasar.dark.set(!Quasar.dark.isActive)
      },
      menu: computed(() => coreStore.menu),
      usuario: computed(() => coreStore.usuario),
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      esSeleccionado (item) {
        return (route.path.includes(item.ruta) && item.ruta !== '') || (item.ruta === '' && route.path === '/')
      },
      mini,
      toogleMini () {
        leftDrawerOpen.value = true
        mini.value = !mini.value
      },
      search,
      mostrar,
      dialogSearch,
      buscar () {
        mostrar.value = true
      }
    }
  }
})
</script>

<style lang="scss">
$aside: #1e1e2d;
$aside-dark: #1b1b28;
$height: 190px;

.aside-dark {
  background-color: $aside;
  color: #9899ac;

  .aside-scroll {
    height: calc(100% - 190px);
    margin-top: $height;
  }

  .aside-header {
    height: $height;
    background-color: $aside-dark;
  }

  .aside-title {
    color: white;
    margin: 0;
    font-size: 1.4rem;
    font-weight: bold;
    // text-align: center;
    line-height: 3.2rem;
    background: #1b1b28;
    padding: 0 28px;
  }

  .aside-email {
    font-size: 0.75rem;
  }

  .q-item {
    padding: 6px 25px;
    min-height: 46px;

    &.q-router-link--active,
    &:hover {
      transition: color 0.2s ease, background-color 0.2s ease;
      background-color: $aside-dark;

      .q-item__section--main {
        color: white;
      }

      .q-icon {
        color: $primary;
      }
    }

    .q-item__section--avatar {
      padding-right: 10px;
      min-width: 40px;
    }

    &.q-hoverable:hover {
      & > .q-focus-helper {
        opacity: 0;
      }
    }

    .q-icon {
      color: #494b74;
    }
  }
}
</style>
