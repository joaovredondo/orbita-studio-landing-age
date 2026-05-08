# README - Antigravity Project (DOE Architecture)

Bem-vindo ao projeto Antigravity. Este repositório utiliza a **Arquitetura DOE** (Directive, Orchestration, Execution).

## Como funciona?

1.  **Directives (`directives/`)**: Contém os SOPs (instruções em Markdown) que descrevem *o que* deve ser feito.
2.  **Execution (`execution/`)**: Contém os scripts Python determinísticos que realizam o trabalho pesado (APIs, processamento, etc.).
3.  **Orchestration**: É o papel do assistente de IA (Antigravity), que lê as diretivas e executa os scripts.

## Estrutura de Pastas

- `/directives`: Documentação de processos.
- `/execution`: Scripts de execução.
- `/references`: Imagens e documentos de referência visual/técnica.
- `/roadmap`: Planejamento e etapas do projeto.
- `/.tmp`: Arquivos temporários gerados durante a execução (ignorado pelo git).
- `AGENT.md`: Instruções base da arquitetura.
- `.env`: Configurações e chaves de API (não commitado).

## Primeiros Passos

1. Copie o arquivo `.env.example` para `.env` e preencha suas chaves.
2. Crie uma nova diretiva em `directives/` para uma nova tarefa.
3. Crie os scripts necessários em `execution/`.
