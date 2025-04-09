import { HandleRequest } from '@/lib/HandleRequest';

// Ejemplo de uso con una API pública
async function ejemploDeUso(): Promise<void> {
    try {
        // Ejemplo 1: Obtener datos de una API de ejemplo (JSONPlaceholder)
        await HandleRequest.create()
            .fetch('https://jsonplaceholder.typicode.com/posts/1')
            .save('datos_post.json')
            .execute();

        await HandleRequest.create()
            .fetch('https://jsonplaceholder.typicode.com/users')
            .save('datos_usuarios.json')
            .execute();

        await HandleRequest.create()
            .fetch('https://jsonplaceholder.typicode.com/todos/1')
            .save('datos_texto.txt')
            .execute();

        console.log('Todos los ejemplos se han ejecutado correctamente.');
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error en los ejemplos:', error.message);
        } else {
            console.error('Error desconocido en los ejemplos:', String(error));
        }
    }
}

// Ejecutar el ejemplo
ejemploDeUso();
