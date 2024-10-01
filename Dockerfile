# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /src

# Copia el package.json y el package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto 5173 para el servidor de desarrollo
EXPOSE 5173

# Comando para correr el servidor de desarrollo
CMD ["npm", "run", "dev"]
