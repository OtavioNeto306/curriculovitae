import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

const STEPS = [
    { id: 'personal', title: 'Pessoal', component: PersonalInfoForm },
    { id: 'experience', title: 'Experiência', component: ExperienceForm },
    { id: 'education', title: 'Formação', component: EducationForm },
    { id: 'skills', title: 'Habilidades', component: SkillsForm },
];

export function FormPage() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);

    const CurrentComponent = STEPS[currentStep].component;

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            // Final step - Navigate to preview or generation
            navigate('/generating');
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto">
                {/* Progress Steps */}
                <nav aria-label="Progress" className="mb-10">
                    <ol role="list" className="flex items-center">
                        {STEPS.map((step, stepIdx) => (
                            <li key={step.title} className={`${stepIdx !== STEPS.length - 1 ? 'pr-8 sm:pr-20' : ''} relative`}>
                                {stepIdx < currentStep ? (
                                    <>
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="h-0.5 w-full bg-blue-600" />
                                        </div>
                                        <a
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); setCurrentStep(stepIdx); }}
                                            className="relative w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-900"
                                        >
                                            <Check className="w-5 h-5 text-white" aria-hidden="true" />
                                            <span className="sr-only">{step.title}</span>
                                        </a>
                                    </>
                                ) : stepIdx === currentStep ? (
                                    <>
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="h-0.5 w-full bg-gray-200" />
                                        </div>
                                        <a
                                            href="#"
                                            className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-blue-600 rounded-full"
                                            aria-current="step"
                                        >
                                            <span className="h-2.5 w-2.5 bg-blue-600 rounded-full" aria-hidden="true" />
                                            <span className="sr-only">{step.title}</span>
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="h-0.5 w-full bg-gray-200" />
                                        </div>
                                        <a
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); setCurrentStep(stepIdx); }}
                                            className="group relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400"
                                        >
                                            <span
                                                className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                                                aria-hidden="true"
                                            />
                                            <span className="sr-only">{step.title}</span>
                                        </a>
                                    </>
                                )}
                                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500 w-20 text-center">
                                    {step.title}
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>

                {/* Form Content */}
                <div className="bg-white shadow-lg rounded-lg px-8 py-6 mb-8 min-h-[400px]">
                    <CurrentComponent />
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Voltar
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {currentStep === STEPS.length - 1 ? 'Finalizar' : 'Próximo'}
                        <ChevronRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </Layout>
    );
}
