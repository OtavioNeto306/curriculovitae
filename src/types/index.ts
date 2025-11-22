export type ModelProvider = 'openai' | 'grok' | 'gemini' | 'deepseek';

export interface PersonalInfo {
    fullName: string;
    age?: string;
    address?: string;
    cityState?: string;
    email: string;
    phone?: string;
    linkedin?: string;
    github?: string;
    summary?: string; // Objetivo / Resumo profissional
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    description: string;
    startDate: string;
    endDate: string;
    isCurrent?: boolean;
}

export interface Education {
    id: string;
    institution: string;
    course: string;
    startDate?: string;
    endDate?: string;
    description?: string;
}

export interface Skill {
    id: string;
    name: string;
    category?: string;
}

export interface Course {
    id: string;
    name: string;
    institution: string;
    year?: string;
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    experiences: Experience[];
    education: Education[];
    skills: Skill[];
    courses: Course[];
}

export interface AppState {
    apiKey: string;
    modelProvider: ModelProvider;
    resumeData: ResumeData;
    generatedResume: any | null; // Estrutura do currículo gerado pela IA
    isLoading: boolean;

    // Actions
    setApiKey: (key: string) => void;
    setModelProvider: (provider: ModelProvider) => void;
    updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
    addExperience: (experience: Experience) => void;
    updateExperience: (id: string, experience: Partial<Experience>) => void;
    removeExperience: (id: string) => void;
    addEducation: (education: Education) => void;
    updateEducation: (id: string, education: Partial<Education>) => void;
    removeEducation: (id: string) => void;
    addSkill: (skill: Skill) => void;
    removeSkill: (id: string) => void;
    addCourse: (course: Course) => void;
    removeCourse: (id: string) => void;
    setGeneratedResume: (resume: any) => void;
    setIsLoading: (isLoading: boolean) => void;
}
