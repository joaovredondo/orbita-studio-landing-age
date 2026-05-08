# SOP: Exemplo de Processamento de Dados

## Objetivo
Processar um arquivo CSV de entrada e gerar um resumo estatístico.

## Entradas
- Arquivo CSV em `.tmp/input.csv`

## Ferramentas/Scripts
- `execution/process_data.py`

## Saídas
- Arquivo JSON em `.tmp/summary.json`

## Fluxo de Trabalho
1. Verificar se o arquivo `.tmp/input.csv` existe.
2. Executar o script `execution/process_data.py`.
3. Validar se o arquivo `.tmp/summary.json` foi geratedo corretamente.
