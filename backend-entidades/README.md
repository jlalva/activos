# Backend

### Requisitos
- postgres v12 o superior
- Nodejs v16.15.0 o superior

### Clonar el proyecto

### Cambiar de rama a la rama correcta
```bash
git checkout develop
```

### Instalar las dependencias del proyecto
```bash
yarn
# o
npm install
```

### Configurar los archivos y quitarle el .sample
```bash
# Dentro de src/common/config configurar

# Aqui se configuran las variables del sistema
src/common/config/app.js.sample 

# Aqui se configura la conexion a la base de datos
src/common/config/db.js.sample
```

### Creacion de la base de datos y llenado de datos de prueba
##### Una ves creada la base de datos vacia, proceder con el siguiente comando
```bash
# Ejecutar el siguiente comando que BORRARA la anterior base de datos y creara las tablas y los datos de prueba

npm run db
```

### Levantar el proyecto
```bash
# Ejecutar el comando

npm run start:dev
```