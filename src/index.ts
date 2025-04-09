import { HandleRequest } from '@/lib/HandleRequest';

HandleRequest.create()
    .fetch('https://jsonplaceholder.typicode.com/users')
    .save('usuarios.json')
    .execute()
    .catch((error) => {
        console.error('Ha ocurrido un error:', error.message);
    });
