import { fetchAndSaveToFile } from "#/lib/fetchAndSave.js";

// Ejemplo de uso con una API pública
async function ejemploDeUso() {
  try {
    // Ejemplo 1: Obtener datos de una API de ejemplo (JSONPlaceholder)
    await fetchAndSaveToFile(
      "https://jsonplaceholder.typicode.com/posts/1",
      "datos_post.json"
    );

    // Ejemplo 2: Obtener datos de usuarios
    await fetchAndSaveToFile(
      "https://jsonplaceholder.typicode.com/users",
      "datos_usuarios.json"
    );

    // Ejemplo 3: Obtener datos y guardarlos como texto plano
    await fetchAndSaveToFile(
      "https://jsonplaceholder.typicode.com/todos/1",
      "datos_texto.txt",
      "text"
    );

    console.log("Todos los ejemplos se han ejecutado correctamente.");
  } catch (error) {
    console.error("Error en los ejemplos:", error.message);
  }
}

// Ejecutar el ejemplo
ejemploDeUso();
