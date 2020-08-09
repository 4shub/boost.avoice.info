import {TemplateData, TemplateMetadata} from './template.types';

const clearExtract = (extractedText: string[]) => (!extractedText[1] ? null : extractedText[1].trim());

const getTitle = (template: string) => clearExtract(template.match(/TITLE:(.+?)[\r\n]/));

const getEmailAddress = (template: string) => clearExtract(template.match(/EMAIL:(.+?)[\r\n]/));

const getSubjectLine = (template: string) => clearExtract(template.match(/SUBJECT_LINE:(.+?)[\r\n]/));

const getBody = (template: string) => template.split('BODY:')[1].trim();

const getMetaHeadingText = (rawMetadata: string) => clearExtract(rawMetadata.match(/TITLE:(.+?)[\r\n]/));
const getMetaBodyText = (rawMetadata: string) => rawMetadata.split('SUMMARY:')[1].trim();
const getMetaSEODescription = (rawMetadata: string) => {
    try {
        return rawMetadata.split('META_DESCRIPTION:')[1].trim()
    } catch (e) {
        return '';
    }
};
const getMetaSEOImage = (rawMetadata: string) => {
    try {
        return rawMetadata.split('SEO_IMAGE:')[1].trim()
    } catch (e) {
        return '';
    }
};


export const extractTemplateData = (template: string): TemplateData => {
    return {
        title: getTitle(template),
        email: getEmailAddress(template),
        subjectLine: getSubjectLine(template),
        body: getBody(template),
    };
};

export const extractTemplateMetaData = (rawMetadata: string): TemplateMetadata => ({
    bodyText: getMetaBodyText(rawMetadata),
    headingText: getMetaHeadingText(rawMetadata),
    metaDescriptionText: getMetaSEODescription(rawMetadata),
    metaImageUrl: getMetaSEOImage(rawMetadata),
})