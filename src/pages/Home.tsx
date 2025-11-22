import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeStore } from '../store/useResumeStore';
import { Layout } from '../components/Layout';
import { Key, ArrowRight, Bot } from 'lucide-react';

export function Home() {
    const navigate = useNavigate();
    const { apiKey, setApiKey, modelProvider, setModelProvider } = useResumeStore();
    const [inputKey, setInputKey] = useState(apiKey);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputKey.trim()) {
            setError('Por favor, insira uma API Key válida.');
            return;
        }
        setApiKey(inputKey);
        navigate('/form');
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto mt-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Crie seu currículo profissional com IA
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Escolha seu modelo de IA preferido e comece a gerar um currículo de destaque em minutos.
                    </p>
                </div>

                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Escolha o Modelo de IA
                                </label>
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                    {(['openai', 'grok', 'gemini', 'deepseek'] as const).map((provider) => (
                                        <button
                                            key={provider}
                                            type="button"
                                            onClick={() => setModelProvider(provider)}
                                            className={`
                        flex flex-col items-center justify-center p-4 border rounded-lg transition-all
                        ${modelProvider === provider
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500 ring-opacity-50'
                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                      `}
                                        >
                                            <Bot className={`w-6 h-6 mb-2 ${modelProvider === provider ? 'text-blue-500' : 'text-gray-400'}`} />
                                            <span className="capitalize font-medium">{provider}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                                    API Key
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Key className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        id="apiKey"
                                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border"
                                        placeholder="sk-..."
                                        value={inputKey}
                                        onChange={(e) => {
                                            setInputKey(e.target.value);
                                            setError('');
                                        }}
                                    />
                                </div>
                                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                                <p className="mt-2 text-xs text-gray-500">
                                    Sua chave é salva apenas no seu navegador (localStorage).
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                Continuar
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
