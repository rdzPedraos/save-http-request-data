import fs from 'fs';
import pathLib from 'path';
import { config } from '@/config';

class FileSystem {
    static getRootPath() {
        return config.ROOT_PATH;
    }

    static async save(path: string, data: any) {
        return new Promise((resolve, reject) => {
            const fullPath = pathLib.join(this.getRootPath(), 'storage', path);
            const formattedData = JSON.stringify(data, null, 2);

            fs.writeFile(fullPath, formattedData, (err) => {
                if (err) {
                    console.error('Error al guardar el archivo:', err);
                    reject(err);
                }

                console.log(`Archivo guardado exitosamente: storage/${path}`);
                resolve(path);
            });
        });
    }
}

export { FileSystem };
