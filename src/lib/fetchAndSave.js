const fs = require("fs");
const https = require("https");
const http = require("http");
const { config } = require("../config");

/**
 * Recupera datos de un endpoint y los guarda en un archivo plano
 * @param {string} url - URL del endpoint
 * @param {string} outputFile - Ruta del archivo donde se guardarán los datos
 * @param {string} [format='json'] - Formato de salida ('json' o 'text')
 * @returns {Promise<void>}
 */
async function fetchAndSaveToFile(url, outputFile, format = "json") {
  return new Promise((resolve, reject) => {
    // Determinar si usar http o https según la URL
    const client = url.startsWith("https") ? https : http;

    console.log(`Recuperando datos desde: ${url}`);

    const request = client.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode >= 300) {
        return reject(
          new Error(
            `Error en la solicitud. Código de estado: ${response.statusCode}`
          )
        );
      }

      let data = "";

      // Manejar los datos a medida que llegan
      response.on("data", (chunk) => {
        data += chunk;
      });

      // Cuando se completa la recepción de datos
      response.on("end", () => {
        try {
          // Formatear los datos si es necesario
          let formattedData = data;
          if (format === "json" && typeof data === "string") {
            // Si está en formato JSON, intentamos formatear para mejor legibilidad
            try {
              const jsonData = JSON.parse(data);
              formattedData = JSON.stringify(jsonData, null, 2);
            } catch (e) {
              console.warn(
                "No se pudo formatear como JSON. Guardando como texto plano."
              );
            }
          }

          const outputFile = path.join(config.ROOT_PATH, "storage", outputFile);

          fs.writeFile(outputFile, formattedData, (err) => {
            if (err) {
              reject(new Error(`Error al guardar el archivo: ${err.message}`));
            } else {
              console.log(`Datos guardados exitosamente en: ${outputFile}`);
              resolve();
            }
          });
        } catch (error) {
          reject(new Error(`Error al procesar los datos: ${error.message}`));
        }
      });
    });

    // Manejar errores de la solicitud
    request.on("error", (error) => {
      reject(new Error(`Error en la solicitud: ${error.message}`));
    });

    // Finalizar la solicitud
    request.end();
  });
}

// Exportar la función para usarla en otros archivos
module.exports = { fetchAndSaveToFile };

// Si se ejecuta directamente este archivo
if (require.main === module) {
  // Obtener los argumentos de la línea de comandos
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error("Uso: node fetchAndSave.js <URL> <archivoSalida> [formato]");
    process.exit(1);
  }

  const [url, outputFile, format = "json"] = args;

  // Ejecutar la función principal
  fetchAndSaveToFile(url, outputFile, format).catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });
}
