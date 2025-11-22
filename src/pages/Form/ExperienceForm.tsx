
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function ExperienceForm() {
    const { resumeData, addExperience, removeExperience, updateExperience } = useResumeStore();
    const { experiences } = resumeData;

    const handleAdd = () => {
        addExperience({
            id: uuidv4(),
            role: '',
            company: '',
            description: '',
            startDate: '',
            endDate: '',
            isCurrent: false,
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Experiência Profissional</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Adicione suas experiências mais relevantes.
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

            {experiences.length === 0 && (
                <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-500">Nenhuma experiência adicionada ainda.</p>
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="mt-2 text-blue-600 hover:text-blue-500 font-medium"
                    >
                        Adicionar primeira experiência
                    </button>
                </div>
            )}

            {experiences.map((exp, index) => (
                <div key={exp.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm relative">
                    <button
                        onClick={() => removeExperience(exp.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                        title="Remover experiência"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>

                    <h4 className="text-md font-medium text-gray-900 mb-4">Experiência {index + 1}</h4>

                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Cargo *</label>
                            <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                                className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Empresa *</label>
                            <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Data Início</label>
                            <input
                                type="text"
                                placeholder="MM/AAAA"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                                className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            />
                            {!exp.startDate && (
                                <div className="mt-1 flex items-center text-xs text-amber-600">
                                    <AlertCircle className="h-3 w-3 mr-1" />
                                    Recomendado informar
                                </div>
                            )}
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Data Fim</label>
                            <input
                                type="text"
                                placeholder="MM/AAAA ou Atualmente"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                                disabled={exp.isCurrent}
                                className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border disabled:bg-gray-100 disabled:text-gray-500"
                            />
                            <div className="mt-2 flex items-center">
                                <input
                                    id={`current-${exp.id}`}
                                    type="checkbox"
                                    checked={exp.isCurrent}
                                    onChange={(e) => updateExperience(exp.id, { isCurrent: e.target.checked, endDate: e.target.checked ? 'Atualmente' : '' })}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor={`current-${exp.id}`} className="ml-2 block text-sm text-gray-900">
                                    Trabalho aqui atualmente
                                </label>
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label className="block text-sm font-medium text-gray-700">Descrição das atividades</label>
                            <textarea
                                rows={4}
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                                className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                placeholder="Descreva suas principais responsabilidades e conquistas..."
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
