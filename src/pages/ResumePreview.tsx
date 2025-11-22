import { useState } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { Layout } from '../components/Layout';
import { ResumeDocument } from '../utils/pdf/ResumeDocument';
import type { TemplateType } from '../utils/pdf/ResumeDocument';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Download, LayoutTemplate, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ResumePreview() {
    const navigate = useNavigate();
    const { generatedResume, resumeData } = useResumeStore();
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('minimal');

    // Use generated data if available, otherwise fallback to form data
    // In a real scenario, we might want to merge them or allow editing the generated data
    // For now, we'll assume generatedResume has the same structure as ResumeData or we map it
    // If generatedResume is null (skipped AI), we use resumeData
    const displayData = generatedResume || resumeData;

    const templates: { id: TemplateType; name: string }[] = [
        { id: 'minimal', name: 'Minimalista' },
        { id: 'modern', name: 'Moderno' },
        { id: 'clean', name: 'Clean' },
    ];

    if (!displayData) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <p>Nenhum dado encontrado.</p>
                    <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
                        Voltar ao início
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-100px)]">
                {/* Sidebar Controls */}
                <div className="w-full lg:w-1/4 space-y-6 overflow-y-auto p-1">
                    <button
                        onClick={() => navigate('/form')}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar e Editar
                    </button>

                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                            <LayoutTemplate className="w-5 h-5 mr-2" />
                            Escolher Modelo
                        </h3>
                        <div className="space-y-3">
                            {templates.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => setSelectedTemplate(template.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${selectedTemplate === template.id
                                        ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500 ring-opacity-50'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {template.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                        <PDFDownloadLink
                            document={<ResumeDocument data={displayData} template={selectedTemplate} />}
                            fileName={`curriculo-${selectedTemplate}.pdf`}
                            className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm"
                        >
                            {({ loading }) => (
                                <>
                                    <Download className="w-5 h-5 mr-2" />
                                    {loading ? 'Gerando PDF...' : 'Baixar PDF'}
                                </>
                            )}
                        </PDFDownloadLink>
                    </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 bg-gray-100 rounded-lg shadow-inner overflow-hidden border border-gray-200">
                    <PDFViewer width="100%" height="100%" className="w-full h-full border-none">
                        <ResumeDocument data={displayData} template={selectedTemplate} />
                    </PDFViewer>
                </div>
            </div>
        </Layout>
    );
}
