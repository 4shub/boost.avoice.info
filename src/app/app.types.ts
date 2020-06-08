import {TemplateDataGroup, TemplateMetadata} from '../template-builder/template.types';

export type AppProps = {
    emailTemplates: TemplateDataGroup;
    currentPath: string;
    cities: string[];
    metadata: TemplateMetadata;
    host: string;
};
