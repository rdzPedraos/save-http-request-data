# Script para Recuperar Datos desde un Endpoint

Este script permite recuperar información de un endpoint HTTP/HTTPS y guardarla en un archivo plano en la carpeta `storage/`. Es útil para automatizar la descarga de datos de APIs y servicios web.

<img width="1919" height="1536" alt="image" src="https://github.com/user-attachments/assets/0fc66f5c-b197-4217-8bd6-14d3054013cb" />

## Requisitos

-   Node.js (versión 14 o superior)
-   npm o yarn

## Estructura de archivos

-   `src/index.ts`: Punto de entrada principal que ejecuta la solicitud HTTP
-   `src/lib/HandleRequest.ts`: Clase principal para gestionar las solicitudes HTTP
-   `src/lib/FileSystem.ts`: Manejo de operaciones de archivos
-   `storage/`: Carpeta donde se almacenan los archivos descargados

## Instalación

```bash
npm install
```

## Uso

Puedes ejecutar el script usando npm:

```bash
npm start
```

Este comando ejecutará `src/index.ts` usando TSX, que descargará datos desde una API y los guardará en la carpeta `storage/`.

## Configuración

Para modificar la URL del endpoint o el nombre del archivo de salida, edita el archivo `src/index.ts`:

```typescript
import { HandleRequest } from '@/lib/HandleRequest';

HandleRequest.create()
    .fetch('https://tu-api.com/datos')
    .save('nombre-archivo.json')
    .execute()
    .catch((error) => {
        console.error('Ha ocurrido un error:', error.message);
    });
```
