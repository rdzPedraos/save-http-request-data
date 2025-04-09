import fs from 'fs';
import pathLib from 'path';
import { config } from '@/config';

class FileSystem {
    static getRootPath() {
        return config.ROOT_PATH;
    }

    static async save(path: string, data: any) {
        return new Promise((resolve, reject) => {
            path = pathLib.join(this.getRootPath(), 'storage', path);
            const formattedData = JSON.stringify(data, null, 2);

            fs.writeFile(path, formattedData, (err) => {
                if (err) {
                    console.error('Error al guardar el archivo:', err);
                    reject(err);
                }

                console.log('Archivo guardado exitosamente:', path);
                resolve(path);
            });
        });
    }
}

export { FileSystem };
