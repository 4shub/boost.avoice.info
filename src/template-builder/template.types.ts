export type TemplateData = {
    title: string;
    email: string;
    body: string;
    subjectLine: string;
}

export type TemplateDataGroup = Record<string, TemplateData>;

export type TemplateGroup = {
    slug: string;
    data: TemplateDataGroup;
}

export type TemplateGroups = Record<string, TemplateGroup>;