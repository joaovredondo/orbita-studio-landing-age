# Roadmap Mestre: Ecossistema de Serviços Front-End

Este é o documento de referência central para o projeto Antigravity. Seguiremos rigorosamente esta ordem de execução.

## 🛠️ Stack Tecnológica Definida
- **Framework**: Next.js 14+ (App Router) - Para SEO e performance.
- **Linguagem**: TypeScript - Para segurança e escalabilidade.
- **Estilização**: Vanilla CSS / CSS Modules - Controle total sobre o design premium.
- **Backend/Database**: Supabase - Autenticação, Banco de Dados (PostgreSQL) e Realtime.
- **Animações**: Framer Motion - Micro-interações e transições fluidas.
- **Ícones**: Lucide React.
- **Deploy**: Vercel.

---

## 📅 Fases de Execução

### Fase 1: Fundação e Design System (ATUAL)
- [x] Configuração da Arquitetura DOE.
- [x] Estrutura de pastas e Roadmap Mestre.
- [x] **Configuração do Ambiente**: Inicializar projeto Next.js.
- [x] **Design System (Tokens)**:
    - Definição de Cores: Primária (Glow Blue), Fundo (Deep Space Black), Texto (Silver/White).
    - Tipografia: Inter ou Outfit (Google Fonts).
    - Componentes Base: `Button`, `Input`, `Card`, `Badge`.
- [ ] **Referências**: Organizar imagens em `/references`.

### Fase 2: Landing Page (A Vitrine) - [CONCLUÍDA + ADVANCED ANIMATIONS]
- [x] **Navbar**: Links + Botão `Entrar no Painel`.
- [x] **Hero Section** (avançado):
    - Partículas flutuantes animadas no background.
    - Grid CSS com efeito de profundidade.
    - Reveal de palavras com blur+slide (Framer Motion).
    - Code card glassmorphism com syntax highlighting.
    - 3 floating badges animados.
    - Parallax de conteúdo no scroll.
    - Indicador de scroll animado.
- [x] **Stats Section** (nova):
    - 4 contadores animados (50+ Projetos, 30+ Clientes, 5+ Anos, 98% Satisfação).
    - Easing suave ao entrar no viewport.
- [x] **Seção de Serviços** (avançado):
    - 6 cards com stagger reveal no scroll.
    - Hover: elevação Y + glow intensificado.
    - Feature tags em cada card.
- [x] **Process Timeline** (nova):
    - Linha vertical que se "desenha" conforme o scroll.
    - 4 etapas com layout alternado (esquerda/direita).
    - Cada step desliza do lado oposto ao entrar na tela.
    - Nodes com spring animation.
- [x] **Portfolio** (avançado):
    - 6 projetos com filtros por categoria animados (Framer layoutId).
    - AnimatePresence para entrada/saída de cards.
    - Overlay com botões de ação.
    - Tags de tecnologia em cada card.
- [x] **Seção Sobre** (avançado):
    - Split reveal: imagem da esquerda, conteúdo da direita.
    - Barras de progresso de skill animadas no scroll.
    - Checklist de diferenciais com stagger.
    - Floating card animado em CSS.
- [x] **Rodapé**: Links rápidos e redes sociais.

### Fase 3: Painel do Cliente (Experiência do Usuário)
- [ ] **Autenticação**: Página de Login/Cadastro (Glassmorphism).
- [ ] **Sidebar Cliente**:
    - Ícones: Dashboard, Meus Projetos, Novo Orçamento, Perfil.
- [ ] **Dashboard Cliente**:
    - Cards de resumo: Projetos Ativos, Orçamentos Pendentes.
    - Feed de atividades recentes.
- [ ] **Meus Projetos**:
    - Lista de projetos com **Barra de Progresso** visual.
    - Status: `Aguardando`, `Em Desenvolvimento`, `Revisão`, `Finalizado`.
- [ ] **Formulário de Orçamento**:
    - Botão: `Novo Pedido`.
    - Campos: Tipo de projeto, orçamento estimado, descrição, upload de referências.

### Fase 4: Painel Admin (Gestão de Negócios)
- [ ] **Sidebar Admin**:
    - Ícones: Visão Geral, Clientes, Projetos, Orçamentos, Configurações.
- [ ] **Gestão de Projetos**:
    - Tabela de projetos com filtros por status.
    - Ação: Botão `Atualizar Progresso` (Slider ou porcentagem).
    - Ação: Botão `Mudar Status`.
- [ ] **Gestão de Orçamentos**:
    - Visualização detalhada de pedidos recebidos.
    - Ação: Botão `Enviar Proposta` / `Recusar`.
- [ ] **Gestão de Clientes**: Lista de usuários e histórico de interações.

### Fase 5: Integração e Realtime
- [ ] Conexão total com Supabase.
- [ ] Sistema de notificações em tempo real no dashboard.
- [ ] Envio automático de e-mails para novos orçamentos e mudanças de status.

### Fase 6: Polimento e Deploy
- [ ] Otimização Lighthouse (Performance, Acessibilidade, SEO).
- [ ] Testes de usabilidade ponta-a-ponta.
- [ ] Deploy em produção via Vercel.

---

## 💎 Funcionalidades Críticas (Checklist de Qualidade)
- [ ] **Micro-animações**: Hover em botões, transições de página.
- [ ] **Dark Mode Nativo**: Foco em estética noturna premium.
- [ ] **Responsividade**: Mobile-first obrigatório.
- [ ] **Segurança**: Rotas protegidas por autenticação.

---
*Assinado: Antigravity - Seu Especialista Front-End*
