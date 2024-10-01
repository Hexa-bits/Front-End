# Front-End React: El Switcher

## Cómo correr en docker 

### Construir la imagen Docker

    docker build -t switcher-frontend .

### Correr el contenedor

    docker run -d -p 5173:5173 switcher-frontend


## Cómo correr el Front-End en la terminal

Primero es necesario tener instalado npm

```bash
sudo apt install npm
```

Luego, en la carpeta del proyecto, correr el siguiente comando para instalar las dependencias

```bash
npm install
```

Seguido de esto, correr el siguiente comando para correr el servidor de desarrollo

```bash
npm run dev
```

## Testing

```bash
npm test
```
