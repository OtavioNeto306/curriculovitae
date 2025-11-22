import type { GenerateResumePayload, AIResponse } from './types';
import { RESUME_PROMPT } from './prompts';

export async function generateResumeContent(payload: GenerateResumePayload): Promise<AIResponse> {
    const { apiKey, provider, data } = payload;
    const prompt = RESUME_PROMPT.replace('{{json_do_formulario}}', JSON.stringify(data, null, 2));

    try {
        if (provider === 'openai' || provider === 'grok' || provider === 'deepseek') {
            // OpenAI-compatible endpoints
            let baseUrl = 'https://api.openai.com/v1/chat/completions';
            let model = 'gpt-4o';

            if (provider === 'grok') {
                baseUrl = 'https://api.x.ai/v1/chat/completions';
                model = 'grok-beta';
            } else if (provider === 'deepseek') {
                baseUrl = 'https://api.deepseek.com/chat/completions';
                model = 'deepseek-chat';
            }

            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: 'system', content: 'You are a helpful professional resume assistant. Output JSON only.' },
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.7,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `API Request failed with status ${response.status}`);
            }

            const result = await response.json();
            const content = result.choices[0].message.content;
            return { content };

        } else if (provider === 'gemini') {
            // Google Gemini API
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `API Request failed with status ${response.status}`);
            }

            const result = await response.json();
            const content = result.candidates[0].content.parts[0].text;
            return { content };
        }

        throw new Error('Provider not supported');
    } catch (error) {
        console.error('AI Generation Error:', error);
        return { content: '', error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
}
