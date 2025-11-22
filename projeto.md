✅ 1. Arquitetura Geral do Projeto

Tecnologia:

Vite + React + TypeScript

TailwindCSS (opcional, mas recomendado)

localStorage para salvar estado do currículo temporariamente

PDF generation: pdf-lib ou react-pdf

Chamada aos modelos de IA: fetch normal com API key informada pelo usuário

State management: Zustand ou Context API (simples)

Pastas recomendadas:

src/
  components/
  pages/
    Home/
    Form/
    ResumePreview/
    ResumeModels/
    GeneratePDF/
  hooks/
  utils/
    ai/
    pdf/
  store/
  types/

✅ 2. Fluxo do Sistema

Tela 1 – Inserir API Key

Usuário escolhe qual modelo quer usar (Grok / Gemini / OpenAI / DeepSeek)

Insere a API Key

Sistema salva em localStorage

Botão "Continuar"

Tela 2 – Formulário de Coleta de Dados
Perguntas divididas por seção:

Informações pessoais (mínimo obrigatório: nome)

Endereço (opcional)

Idade (opcional)

Contato (email obrigatório / telefone opcional)

Resumo profissional (opcional – mas IA pode criar)

Experiências profissionais (obrigatório pelo menos 1)

Cargo

Empresa

Descrição

Data início (alerta se não colocar)

Data fim (alerta se não colocar)

Formação acadêmica

Habilidades

Cursos

⚠️ Se faltar datas na experiência:

“Recomendamos informar data de início e fim para deixar seu currículo mais forte. Deseja continuar assim mesmo?”

Tela 3 – Geração com IA

Usuário clica em "Gerar currículo com IA"

A IA recebe todos os dados numa estrutura clara

IA monta:

Resumo profissional

Experiências reescritas em linguagem profissional

Habilidades organizadas

Cursos resumidos

Tela 4 – Prévia do Currículo

Mostra visualmente o currículo

Opção: “Trocar modelo”

Modelos disponíveis:

Modelo 1 – Minimalista (preto e branco)

Modelo 2 – Moderno (barras laterais)

Modelo 3 – Clean com destaque no nome

Tela 5 – Gerar PDF

Botão: “Baixar PDF”

PDF gerado localmente

Nada é enviado para servidor

✅ 3. Estrutura das perguntas (EXATA para implementar no form)
📌 A. Informações pessoais

Nome completo (obrigatório)

Idade (opcional)

Endereço (opcional)

Cidade / Estado (opcional)

Email (obrigatório)

Telefone (opcional)

LinkedIn (opcional)

GitHub (opcional)

📌 B. Objetivo / Resumo profissional

“Deseja escrever seu próprio resumo ou deixar a IA gerar?”

Campo texto (opcional)

Se vazio → IA cria a partir das experiências

📌 C. Experiências profissionais

Para cada experiência:

Cargo

Empresa

Descrição

Data de início → se vazio alertar

Data de término → se vazio alertar

Botão: + adicionar outra experiência

📌 D. Formação

Instituição

Curso

Ano início (opcional)

Ano término (opcional)

Descrição (opcional)

📌 E. Habilidades

Campo texto separado por vírgulas

IA pode reorganizar por categoria

📌 F. Cursos e certificações

Nome do curso

Instituição

Ano (opcional)

✅ 4. Prompt interno que o sistema enviará para a IA

Você vai usar esse prompt para montar o currículo com qualquer modelo LLM:

Você é um assistente especializado em criação de currículos profissionais.

Com base nos dados abaixo, reescreva e melhore o currículo do usuário de forma objetiva, clara e profissional. 

Regras:
- Reescreva tudo em linguagem formal e atrativa para recrutadores
- Padronize datas e descrições
- Gere um resumo profissional forte, se não houver
- Melhore descrições das experiências mantendo fidelidade
- Estruture tudo em tópicos organizados

Dados do usuário:
{{json_do_formulario}}

Retorne apenas o currículo estruturado em seções:
- Cabeçalho
- Resumo profissional
- Experiência profissional
- Formação acadêmica
- Habilidades
- Cursos adicionais

✅ 5. Estrutura lógica de estado (Zustand ou Context)
resumeStore = {
  apiKey: '',
  modelProvider: 'openai' | 'grok' | 'gemini' | 'deepseek',
  personalInfo: {},
  experiences: [],
  education: [],
  skills: [],
  courses: [],
  generatedResume: {} // resposta da IA
}


Salvar tudo no:

localStorage.setItem("resume-data", JSON.stringify(store))

✅ 6. Geração de PDF

Opções boas:

1. react-pdf

Componentes React → PDF automático

Fácil criar layouts diferentes

Pasta sugerida:

src/pdf/templates/
  Minimal.tsx
  Modern.tsx
  Clean.tsx

2. pdf-lib

Maior liberdade

Melhor para PDF totalmente customizado

Permite montar múltiplos modelos facilmente

✅ 7. Modelos de currículo (estrutura para você criar)
Modelo 1 – Minimalista

Cabeçalho centralizado

Texto preto

Linhas finas

Muito profissional

Modelo 2 – Moderno

Barra lateral com:

Nome

Contatos

Habilidades

Conteúdo principal do lado direito

Modelo 3 – Clean com destaque

Nome enorme

Resumo destacado

Experiência dividida por blocos com sombra leve

✅ 8. Fluxograma Visual (para programar)

Passo a passo:

Início
  ↓
Inserir API Key → salvar localStorage
  ↓
Formulário de dados pessoais
  ↓
Experiências → alerta se não colocar datas
  ↓
Formação / Cursos / Skills
  ↓
Gerar currículo com IA
  ↓
Prévia do currículo
  ↓
Escolher modelo
  ↓
Gerar PDF
  ↓
Baixar

✅ 9. Recursos futuros (já pensando no upgrade)

Login via Supabase

Salvar currículos na nuvem

Histórico de currículos

IA para sugerir vagas compatíveis

Múltiplos idiomas (PT/EN/ES)

Modo offline (Tauri)