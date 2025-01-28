# Usa la imagen oficial de Node.js versión LTS (22.13.1)
FROM node:22.13.1

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente al contenedor
COPY . .

# Compila el proyecto (si usas TypeScript)
RUN npm run build

# Expone el puerto donde corre tu aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:dev"]