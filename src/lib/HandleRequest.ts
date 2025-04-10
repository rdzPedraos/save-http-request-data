import axios, { AxiosRequestConfig } from 'axios';
import { FileSystem } from './FileSystem';

class HandleRequest {
    private data: any;
    private promiseChain: Promise<any> = Promise.resolve();

    static create() {
        return new HandleRequest();
    }

    private addPromise(callback: () => Promise<any>) {
        this.promiseChain = this.promiseChain.then(callback);
    }

    /**
     * Fetch data from a URL or an object with AxiosRequestConfig properties
     * @param props - URL or AxiosRequestConfig
     */
    fetch(props: AxiosRequestConfig | string) {
        if (typeof props === 'string') {
            props = { url: props };
        }

        const callback = async () => {
            try {
                const response = await axios(props);

                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }

                this.data = response.data;
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
        };

        this.addPromise(callback);
        return this;
    }

    async execute() {
        return this.promiseChain;
    }
}

export { HandleRequest };
