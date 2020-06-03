import {TemplateDataGroup} from '../template-builder/template.types';

export type AppProps = {
    emailTemplates: TemplateDataGroup;
    currentPath: string;
    cities: string[];
};
