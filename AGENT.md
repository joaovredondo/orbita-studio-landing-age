# Agent Instructions (DOE Architecture)

> Este arquivo define a arquitetura de 3 camadas para maximizar a confiabilidade e separação de preocupações.

## A Arquitetura de 3 Camadas

**Camada 1: Diretiva (O que fazer)**
- Localizada em `directives/`.
- SOPs (Standard Operating Procedures) em Markdown.
- Define objetivos, entradas, ferramentas/scripts, saídas e casos de borda.

**Camada 2: Orquestração (Tomada de decisão)**
- O Agente IA. Responsável pelo roteamento inteligente.
- Lê diretivas, chama ferramentas de execução na ordem correta, trata erros e atualiza diretivas.

**Camada 3: Execução (Execução do trabalho)**
- Localizada em `execution/`.
- Scripts Python determinísticos.
- Lida com chamadas de API, processamento de dados e operações de arquivo.

## Princípios Operacionais

1. **Verifique as ferramentas primeiro**: Antes de criar um script, veja se já existe em `execution/`.
2. **Auto-correção (Self-annealing)**: Quando algo quebra, corrija o script, teste e atualize a diretiva com o aprendizado.
3. **Atualize as diretivas**: Elas são documentos vivos.

## Organização de Arquivos

- `.tmp/` - Arquivos intermediários (nunca commitados).
- `execution/` - Scripts Python (ferramentas determinísticas).
- `directives/` - SOPs em Markdown.
- `.env` - Variáveis de ambiente.
