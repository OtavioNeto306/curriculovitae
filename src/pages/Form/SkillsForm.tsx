import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, X, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function SkillsForm() {
    const { resumeData, addSkill, removeSkill, addCourse, removeCourse } = useResumeStore();
    const { skills, courses } = resumeData;
    const [newSkill, setNewSkill] = useState('');
    const [newCourse, setNewCourse] = useState({ name: '', institution: '', year: '' });

    const handleAddSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (newSkill.trim()) {
            addSkill({ id: uuidv4(), name: newSkill.trim() });
            setNewSkill('');
        }
    };

    const handleAddCourse = () => {
        if (newCourse.name.trim() && newCourse.institution.trim()) {
            addCourse({
                id: uuidv4(),
                name: newCourse.name,
                institution: newCourse.institution,
                year: newCourse.year,
            });
            setNewCourse({ name: '', institution: '', year: '' });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Skills Section */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Habilidades</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Adicione suas principais competências técnicas e comportamentais.
                    </p>
                </div>

                <form onSubmit={handleAddSkill} className="flex gap-2">
                    <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Ex: React, Liderança, Inglês Avançado..."
                        className="flex-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    />
                    <button
                        type="submit"
                        disabled={!newSkill.trim()}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </form>

                <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <span
                            key={skill.id}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                            {skill.name}
                            <button
                                type="button"
                                onClick={() => removeSkill(skill.id)}
                                className="ml-2 inline-flex items-center p-0.5 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600 focus:outline-none"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    ))}
                    {skills.length === 0 && (
                        <p className="text-sm text-gray-400 italic">Nenhuma habilidade adicionada.</p>
                    )}
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Courses Section */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Cursos e Certificações</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Cursos complementares, workshops e certificações.
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md space-y-3 border border-gray-200">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <input
                            type="text"
                            placeholder="Nome do Curso"
                            value={newCourse.name}
                            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                        <input
                            type="text"
                            placeholder="Instituição"
                            value={newCourse.institution}
                            onChange={(e) => setNewCourse({ ...newCourse, institution: e.target.value })}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                        <input
                            type="text"
                            placeholder="Ano (Opcional)"
                            value={newCourse.year}
                            onChange={(e) => setNewCourse({ ...newCourse, year: e.target.value })}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border sm:col-span-2"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleAddCourse}
                        disabled={!newCourse.name || !newCourse.institution}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300"
                    >
                        <Plus className="h-4 w-4 mr-1" /> Adicionar Curso
                    </button>
                </div>

                <ul className="divide-y divide-gray-200">
                    {courses.map((course) => (
                        <li key={course.id} className="py-3 flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{course.name}</p>
                                <p className="text-sm text-gray-500">{course.institution} {course.year && `• ${course.year}`}</p>
                            </div>
                            <button
                                onClick={() => removeCourse(course.id)}
                                className="text-gray-400 hover:text-red-500"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
