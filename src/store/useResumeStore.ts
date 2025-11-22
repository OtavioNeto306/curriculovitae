import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, ResumeData } from '../types';

const initialResumeData: ResumeData = {
    personalInfo: {
        fullName: '',
        email: '',
    },
    experiences: [],
    education: [],
    skills: [],
    courses: [],
};

export const useResumeStore = create<AppState>()(
    persist(
        (set) => ({
            apiKey: '',
            modelProvider: 'openai',
            resumeData: initialResumeData,
            generatedResume: null,
            isLoading: false,

            setApiKey: (key) => set({ apiKey: key }),
            setModelProvider: (provider) => set({ modelProvider: provider }),

            updatePersonalInfo: (info) => set((state) => ({
                resumeData: {
                    ...state.resumeData,
                    personalInfo: { ...state.resumeData.personalInfo, ...info },
                },
            })),

            addExperience: (experience) => set((state) => ({
                resumeData: {
                    ...state.resumeData,
                    experiences: [...state.resumeData.experiences, experience],
                },
            })),

            updateExperience: (id, experience) => set((state) => ({
                resumeData: {
                    ...state.resumeData,
                    experiences: state.resumeData.experiences.map((exp) =>
                        exp.id === id ? { ...exp, ...experience } : exp
                    ),
                },
            })),

            removeExperience: (id) => set((state) => ({
                resumeData: {
                    ...state.resumeData,
                    experiences: state.resumeData.experiences.filter((exp) => exp.id !== id),
                },
            })),

            addEducation: (education) => set((state) => ({
                resumeData: {
                    ...state.resumeData,
                    education: [...state.resumeData.education, education],
                },
            })),

            updateEducation: (id, education) => set((state) => ({
                resumeData: {
                    ...state.resumeData,
                    education: state.resumeData.education.map((edu) =>
                        edu.id === id ? { ...edu, ...education } : edu
                    ),
                },
            })),

            removeEducation: (id) => set((state) => ({
                resumeData: {
                    ...state.resumeData,
                    education: state.resumeData.education.filter((edu) => edu.id !== id),
                },
            })),

            addSkill: (skill) => set((state) => ({
                resumeData: {
                    ...state.resumeData,
                    skills: [...state.resumeData.skills, skill],
                },
            })),

            removeSkill: (id) => set((state) => ({
                resumeData: {
                    ...state.resumeData,
                    skills: state.resumeData.skills.filter((s) => s.id !== id),
                },
            })),

            addCourse: (course) => set((state) => ({
                resumeData: {
                    ...state.resumeData,
                    courses: [...state.resumeData.courses, course],
                },
            })),

            removeCourse: (id) => set((state) => ({
                resumeData: {
                    ...state.resumeData,
                    courses: state.resumeData.courses.filter((c) => c.id !== id),
                },
            })),

            setGeneratedResume: (resume) => set({ generatedResume: resume }),
            setIsLoading: (isLoading) => set({ isLoading }),
        }),
        {
            name: 'resume-storage',
        }
    )
);
