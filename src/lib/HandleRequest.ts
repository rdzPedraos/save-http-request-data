import axios, { AxiosRequestConfig } from 'axios';
import { FileSystem } from './FileSystem';

type HandleDataType = (data: any, oldData: any) => any;

class HandleRequest {
    private data: any = {};
    private handleData: HandleDataType;
    private promiseChain: Promise<any> = Promise.resolve();

    static create() {
        return new HandleRequest();
    }

    private addPromise(callback: () => Promise<any>) {
        this.promiseChain = this.promiseChain.then(callback);
    }

    setHandleData(handleData: HandleDataType) {
        this.handleData = handleData;
        return this;
    }

    getData() {
        return this.data;
    }

    /**
     * Fetch data from a URL or an object with AxiosRequestConfig properties
     * @param props - URL or AxiosRequestConfig
     */
    fetch(props: AxiosRequestConfig | string) {
        const callback = async () => {
            props = typeof props === 'string' ? { url: props } : props;

            try {
                const { status, data, statusText } = await axios(props);
                console.log('Petición finalizada', status, statusText);

                if (status < 200 || status >= 300) {
                    throw new Error(statusText);
                }

                this.data = this.handleData(data, this.getData());
            } catch (error) {
                console.error('Error en la petición:', error);
                throw error;
            }
        };

        this.addPromise(callback);
        return this;
    }

    save(path: string | ((data: any) => string)) {
        const callback = async () => {
            if (!this.data) {
                throw new Error(
                    'No hay datos para guardar. Ejecuta fetch primero.'
                );
            }

            path = typeof path === 'function' ? path(this.data) : path;
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
