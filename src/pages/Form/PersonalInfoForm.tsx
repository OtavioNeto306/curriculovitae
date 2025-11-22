import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';

export function PersonalInfoForm() {
    const { resumeData, updatePersonalInfo } = useResumeStore();
    const { personalInfo } = resumeData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        updatePersonalInfo({ [name]: value });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Informações Pessoais</h3>
            <p className="mt-1 text-sm text-gray-500">
                Comece com seus dados básicos para contato.
            </p>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Nome Completo *
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            required
                            value={personalInfo.fullName}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email *
                    </label>
                    <div className="mt-1">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={personalInfo.email}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Telefone
                    </label>
                    <div className="mt-1">
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={personalInfo.phone || ''}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                        Idade
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="age"
                            id="age"
                            value={personalInfo.age || ''}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-4">
                    <label htmlFor="cityState" className="block text-sm font-medium text-gray-700">
                        Cidade / Estado
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="cityState"
                            id="cityState"
                            value={personalInfo.cityState || ''}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Endereço Completo
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={personalInfo.address || ''}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                        LinkedIn URL
                    </label>
                    <div className="mt-1">
                        <input
                            type="url"
                            name="linkedin"
                            id="linkedin"
                            value={personalInfo.linkedin || ''}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                        GitHub URL
                    </label>
                    <div className="mt-1">
                        <input
                            type="url"
                            name="github"
                            id="github"
                            value={personalInfo.github || ''}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-6">
                    <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
                        Resumo Profissional / Objetivo
                    </label>
                    <div className="mt-1">
                        <textarea
                            id="summary"
                            name="summary"
                            rows={4}
                            value={personalInfo.summary || ''}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            placeholder="Breve descrição sobre você. Se deixar em branco, a IA irá gerar um para você."
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        Opcional. A IA pode criar um resumo impactante baseada nas suas experiências.
                    </p>
                </div>
            </div>
        </div>
    );
}
