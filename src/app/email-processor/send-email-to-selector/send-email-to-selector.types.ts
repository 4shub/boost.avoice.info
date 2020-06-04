import { TemplateData } from '../../../template-builder/template.types';

export type SendEmailToSelectorProps = {
    emailList: [string, TemplateData][];
    selectedValue: string;
    onChange: (key: string) => void;
};
