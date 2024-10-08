# FRONTEND

### Clonar el proyecto

### Cambiar de rama a la rama correcta
```bash
git checkout develop
```

### instalar la dependencia global con:
```bash
npm i -g @quasar/cli
```

### Instalar las dependencias del proyecto
```bash
yarn
# o
npm install
```

### Configurar el archivo y quitarle el .sample al archivo de comunicacion con el backend en la carpeta config:

```bash
# Parara produccion
config/prod.env.js

# Parara desarrollo
config/dev.env.js
```
#### Nota: Debe configurarse con la ruta en la que estara ubicado el backend donde los servicios protegidos por token.

### Para su funcionamiento en desarrollo usar el comando:

```bash
quasar dev
```

### Build para producción en modo SPA (Single Page Application), para llevarlo a produccion ejecutar el comando:
```bash
quasar build -m spa
```
#### Nota: generará una carpeta con el nombre spa dentro de dist, el cual debe moverse a un servidor con nginx, apache o en su defecto cpanel y funcionará.
