import { MinimalTemplate } from './templates/Minimal';
import { ModernTemplate } from './templates/Modern';
import { CleanTemplate } from './templates/Clean';
import type { ResumeData } from '../../types';

export type TemplateType = 'minimal' | 'modern' | 'clean';

interface ResumeDocumentProps {
    data: ResumeData;
    template: TemplateType;
}

export const ResumeDocument = ({ data, template }: ResumeDocumentProps) => {
    switch (template) {
        case 'modern':
            return <ModernTemplate data={data} />;
        case 'clean':
            return <CleanTemplate data={data} />;
        case 'minimal':
        default:
            return <MinimalTemplate data={data} />;
    }
};
