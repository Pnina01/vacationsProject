import fs from 'fs'
import appConfig from '../2-utils/app-config';


async function exists(filePath: string): Promise<boolean> {
    return new Promise((res, rej) => res(fs.existsSync(filePath)));  
}

async function getFilePath(fullPath: string): Promise<string> {
    const exist = await exists(fullPath);
    if (!exist) {  
     return `${appConfig.imagesFolder}`;
    };

    return fullPath;
}

export default { getFilePath };