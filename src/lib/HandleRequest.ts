import axios from 'axios';
import { FileSystem } from './FileSystem';

type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

class HandleRequest {
    private data: any;
    private promiseChain: Promise<any> = Promise.resolve();

    static create() {
        return new HandleRequest();
    }

    private addPromise(callback: () => Promise<any>) {
        this.promiseChain = this.promiseChain.then(callback);
    }

    fetch(url: string, method: MethodType = 'GET') {
        const callback = async () => {
            try {
                const response = await axios({
                    url,
                    method,
                });
                this.data = response.data;
                return this;
            } catch (error) {
                console.error('Error en la petición:', error);
                throw error;
            }
        };

        this.addPromise(callback);
        return this;
    }

    save(path: string) {
        const callback = async () => {
            if (!this.data) {
                throw new Error(
                    'No hay datos para guardar. Ejecuta fetch primero.'
                );
            }

            await FileSystem.save(path, this.data);
            return this;
        };

        this.addPromise(callback);
        return this;
    }

    async execute() {
        return this.promiseChain;
    }
}

export { HandleRequest };
