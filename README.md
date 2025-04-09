# Script para Recuperar Datos desde un Endpoint

Este script permite recuperar información de un endpoint HTTP/HTTPS y guardarla en un archivo plano. Es útil para automatizar la descarga de datos de APIs y servicios web.

## Requisitos

- Node.js (versión 12 o superior)

## Estructura de archivos

- `src/fetchAndSave.js`: Contiene la función principal para recuperar y guardar datos
- `src/ejemplo.js`: Ejemplo de uso de la función

## Uso desde línea de comandos

Puedes ejecutar el script directamente desde la línea de comandos:

```bash
node src/fetchAndSave.js <URL> <archivoSalida> [formato]
```

Donde:

- `<URL>` es la dirección del endpoint (obligatorio)
- `<archivoSalida>` es la ruta donde se guardará el archivo (obligatorio)
- `[formato]` es opcional, puede ser 'json' (predeterminado) o 'text'

Ejemplo:

```bash
node src/fetchAndSave.js https://jsonplaceholder.typicode.com/posts/1 ./datos.json
```

## Uso desde otro script

También puedes importar y usar la función en tus propios scripts:

```javascript
const { fetchAndSaveToFile } = require("./src/fetchAndSave");

async function miScript() {
  try {
    await fetchAndSaveToFile(
      "https://jsonplaceholder.typicode.com/users",
      "./usuarios.json"
    );
    console.log("Datos recuperados exitosamente");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

miScript();
```

## Ejemplo incluido

Puedes ejecutar el archivo de ejemplo para ver cómo funciona:

```bash
node src/ejemplo.js
```

Este ejemplo recupera datos de tres endpoints diferentes de JSONPlaceholder y los guarda en archivos separados.

## Características

- Soporta tanto HTTP como HTTPS
- Manejo automático de errores
- Formateo de datos JSON para mejor legibilidad
- Puede guardar como JSON formateado o texto plano
