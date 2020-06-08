export type TemplateData = {
    title: string;
    email: string;
    body: string;
    subjectLine: string;
};

export type TemplateDataGroup = Record<string, TemplateData>;

export type TemplateGroup = {
    slug: string;
    data: TemplateDataGroup;
};

export type TemplateGroups = {
    local: Record<string, TemplateGroup>;
    boost: Record<string, TemplateGroup>;
};

export type TemplateMetadata = {
    headingText: string;
    bodyText: string;
}