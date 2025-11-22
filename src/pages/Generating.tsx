import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeStore } from '../store/useResumeStore';
import { generateResumeContent } from '../utils/ai/api';
import { Layout } from '../components/Layout';
import { Loader2, AlertTriangle, ArrowLeft } from 'lucide-react';

export function Generating() {
    const navigate = useNavigate();
    const { apiKey, modelProvider, resumeData, setGeneratedResume, setIsLoading } = useResumeStore();
    const [error, setError] = useState('');
    const [status, setStatus] = useState('Iniciando...');

    useEffect(() => {
        const generate = async () => {
            if (!apiKey) {
                setError('API Key não encontrada. Por favor, configure-a na página inicial.');
                return;
            }

            setIsLoading(true);
            setStatus('Conectando com a IA...');

            try {
                setStatus(`Gerando currículo com ${modelProvider}...`);

                const response = await generateResumeContent({
                    apiKey,
                    provider: modelProvider,
                    data: resumeData,
                });

                if (response.error) {
                    throw new Error(response.error);
                }

                setStatus('Processando resposta...');

                // Try to parse JSON from content (it might be wrapped in markdown code blocks)
                let jsonString = response.content;
                const jsonMatch = jsonString.match(/```json\n([\s\S]*?)\n```/) || jsonString.match(/```([\s\S]*?)```/);

                if (jsonMatch) {
                    jsonString = jsonMatch[1];
                }

                const parsedData = JSON.parse(jsonString);
                setGeneratedResume(parsedData);

                setStatus('Concluído!');
                setTimeout(() => {
                    navigate('/preview');
                }, 1000);

            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : 'Erro desconhecido ao gerar currículo.');
            } finally {
                setIsLoading(false);
            }
        };

        generate();
    }, [apiKey, modelProvider, resumeData, navigate, setGeneratedResume, setIsLoading]);

    if (error) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                    <div className="bg-red-50 p-6 rounded-full mb-6">
                        <AlertTriangle className="w-12 h-12 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Ocorreu um erro</h2>
                    <p className="text-gray-600 max-w-md mb-8">{error}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar para o início
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
                    <div className="relative bg-white p-6 rounded-full shadow-lg">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-2">Criando seu currículo</h2>
                <p className="text-gray-600 animate-pulse">{status}</p>
                <p className="text-sm text-gray-400 mt-8 max-w-md">
                    Isso pode levar alguns segundos. A IA está analisando suas informações e escrevendo um conteúdo profissional.
                </p>
            </div>
        </Layout>
    );
}
