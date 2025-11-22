
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function EducationForm() {
    const { resumeData, addEducation, removeEducation, updateEducation } = useResumeStore();
    const { education } = resumeData;

    const handleAdd = () => {
        addEducation({
            id: uuidv4(),
            institution: '',
            course: '',
            startDate: '',
            endDate: '',
            description: '',
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Formação Acadêmica</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Liste sua formação educacional.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={handleAdd}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar
                </button>
            </div>

            {education.length === 0 && (
                <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-500">Nenhuma formação adicionada ainda.</p>
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="mt-2 text-blue-600 hover:text-blue-500 font-medium"
                    >
                        Adicionar formação
                    </button>
                </div>
            )}

            {education.map((edu, index) => (
                <div key={edu.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm relative">
                    <button
                        onClick={() => removeEducation(edu.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                        title="Remover formação"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>

                    <h4 className="text-md font-medium text-gray-900 mb-4">Formação {index + 1}</h4>

                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Instituição *</label>
                            <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                                className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Curso / Grau *</label>
                            <input
                                type="text"
                                value={edu.course}
                                onChange={(e) => updateEducation(edu.id, { course: e.target.value })}
                                className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Ano Início</label>
                            <input
                                type="text"
                                placeholder="AAAA"
                                value={edu.startDate}
                                onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                                className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Ano Término</label>
                            <input
                                type="text"
                                placeholder="AAAA"
                                value={edu.endDate}
                                onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                                className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
