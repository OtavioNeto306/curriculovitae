export interface AIResponse {
    content: string;
    error?: string;
}

export interface GenerateResumePayload {
    apiKey: string;
    provider: 'openai' | 'grok' | 'gemini' | 'deepseek';
    data: any; // ResumeData
}
