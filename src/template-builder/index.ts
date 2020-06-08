import fs from 'fs';
import path from 'path';
import { flatten } from 'lodash';
import { TemplateGroup, TemplateGroups, TemplateMetadata } from './template.types';
import {extractTemplateData, extractTemplateMetaData} from './extract-template-data';

const TEMPLATE_FOLDER_PATH = path.join(__dirname, '..', '..', 'templates');
const TEMPLATE_OUTPUT_PATH = path.join(__dirname, '..', '..', 'dist', 'template-data.json');

const getDirectoryContent = (location: string = ''): Promise<string[]> =>
    new Promise((resolve) => fs.readdir(path.join(TEMPLATE_FOLDER_PATH, location), (e, r) => resolve(r)));

const readFilePromise = (pathToFile: string): Promise<string> =>
    new Promise((resolve) => {
        fs.readFile(pathToFile, 'utf8', (e, rawFileData) => resolve(rawFileData));
    });

const processMetaData = async (folderPath: string, dirContent: string[]): Promise<TemplateMetadata> => {
    const metadataFileName = dirContent.find((fileName) => fileName === 'METADATA');

    if (!metadataFileName) {
        return null;
    }

    const pathToFile = path.join(TEMPLATE_FOLDER_PATH, folderPath, 'METADATA');

    const rawFileData = await readFilePromise(pathToFile);

    return extractTemplateMetaData(rawFileData);
};

const getFileData = (
    folderPath: string,
    slug: string,
    fileName: string,
    metadata: TemplateMetadata
): Promise<TemplateGroup> => {
    const pathToFile = path.join(TEMPLATE_FOLDER_PATH, folderPath, fileName);

    return readFilePromise(pathToFile).then((rawFileData: string) => ({
        data: { [fileName.replace('.txt', '')]: extractTemplateData(rawFileData) },
        slug,
        metadata,
    }));
};

const getAllTemplatesWithSlugs = async (location: string) => {
    const rootDirectoryContent = await getDirectoryContent(location);

    const templateGroupsArray = await Promise.all(
        rootDirectoryContent.map(async (folderName) => {
            const basePath = path.join(location, folderName);
            const dirContent = await getDirectoryContent(basePath);

            if (!dirContent || !dirContent.length) {
                return null;
            }

            const metadata = await processMetaData(basePath, dirContent);

            return Promise.all(
                dirContent
                    // we are only going to process text files for now.
                    // We only have shallow routes now aka no sub-directories allowed!
                    .filter((fileName) => fileName.includes('.txt'))
                    .map(async (fileName) => {
                        return getFileData(basePath, folderName, fileName, metadata);
                    })
            );
        })
    ).then((e) => e.filter((e) => !!e));

    return flatten(templateGroupsArray).reduce((obj, item) => {
        if (!obj[item.slug]) {
            obj[item.slug] = item;
        } else {
            obj[item.slug].data = {
                ...obj[item.slug].data,
                ...item.data,
            };
        }

        return obj;
    }, {});
};

const saveTemplateGroupData = (groupTemplateData: TemplateGroups) => {
    fs.writeFileSync(TEMPLATE_OUTPUT_PATH, JSON.stringify(groupTemplateData), 'utf8');
};

const buildTemplates = async () => {
    const [local, boost] = await Promise.all([getAllTemplatesWithSlugs('local'), getAllTemplatesWithSlugs('boost')]);

    saveTemplateGroupData({ local, boost });
};

buildTemplates();
