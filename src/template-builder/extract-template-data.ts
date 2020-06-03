import { TemplateData } from './template.types';

const clearExtract = (extractedText: string[]) => (!extractedText[1] ? null : extractedText[1].trim());

const getTitle = (template: string) => clearExtract(template.match(/TITLE:(.+?)[\r\n]/));

const getEmailAddress = (template: string) => clearExtract(template.match(/EMAIL:(.+?)[\r\n]/));

const getSubjectLine = (template: string) => clearExtract(template.match(/SUBJECT_LINE:(.+?)[\r\n]/));

const getBody = (template: string) => template.split('BODY:')[1].trim();

export const extractTemplateData = (template: string): TemplateData => {
    return {
        title: getTitle(template),
        email: getEmailAddress(template),
        subjectLine: getSubjectLine(template),
        body: getBody(template),
    };
};
