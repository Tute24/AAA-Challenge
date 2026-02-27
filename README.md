# AAA Challenge — Portal de Indicadores de Vendas

Repositório do desafio técnico para a vaga de Desenvolvedor Full Stack na **Abi-Ackel Advogados Associados**.

---

## Visão Geral da Solução

A solução consiste em um portal de indicadores de vendas diárias composto por três camadas:

- **API REST** (Node.js + Express + TypeScript) responsável por autenticação de usuários e fornecimento dos indicadores de vendas
- **Frontend** (Next.js + React + Tailwind CSS) com dashboard interativo exibindo KPIs, tabelas históricas e gráfico de lucro diário
- **Automação** (n8n via Docker) com um workflow que consulta periodicamente a API, avalia se o resultado do dia anterior foi de lucro ou perda, e aciona um alerta — implementado com log e descrito conceitualmente com e-mail

---

## Tecnologias Utilizadas

### Backend
| Tecnologia | Justificativa |
|---|---|
| Node.js + Express | Runtime e framework HTTP amplamente adotados no ecossistema JavaScript/TypeScript |
| TypeScript | Tipagem estática, melhor DX e alinhamento com boas práticas em projetos Node.js |
| Prisma ORM | Client type-safe, integração simples com PostgreSQL via `DATABASE_URL`, migrations declarativas e `prisma generate` que garante tipos sincronizados com o schema |
| PostgreSQL | Banco relacional de alto desempenho, familiaridade com o conjunto Prisma + Postgres |
| JWT + Cookies HttpOnly | Autenticação stateless com token armazenado em cookie HttpOnly, evitando exposição via JavaScript no cliente, além de ser apropriado para utilização com o middleware do Next.js no frontend, permitindo proteção de rotas no lado do servidor, e contribuindo para uma UX mais fluda sem flicker e flashing de conteúdo |
| Zod | Validação e parsing de schemas de entrada com tipagem inferida |
| Docker Compose | Orquestração local dos três serviços (db, api, n8n) com um único comando |

Além das justificativas acima, é importante frisar que escolhe as ferramentas com as quais tenho mais familiaridade e que me permitem entregar a solução de forma mais rápida e eficiente, sem abrir mão das boas práticas de desenvolvimento.

### Frontend
| Tecnologia | Justificativa |
|---|---|
| Next.js 15 (App Router) | Framework React com suporte a Server Components, roteamento de arquivos e middleware nativo. O app router do next facilita muito a organização de pastas e o seu middleware (proxy.ts) com cookies ajuda a bloquear rotas protegidas no lado do servidor. A utilização de server components (SSR), que permite a renderização de componentes no servidor, contribui para uma melhor performance e indexação (SEO). No caso desse projeto, como é um dashboard privado, a questão do SEO não teria tanta influência, mas a UX é beneficiada pois o conteúdo é renderizado de imediato sem loading states e content flashing |
| React 19 | Biblioteca de UI |
| Tailwind CSS v4 | Estilização mais prática, facilitando o desenvolvimento responsivo e eficiente |
| Recharts | Biblioteca de gráficos que possui integração com React e é muito útil para dashboard. Para o uso do recharts, precisei ir mais afundo na documentação e contei com a ajuda do Claude Agent para montar o componente do gráfico, que achei essencial para uma boa visualização do histórico de lucros. |
| React Hook Form | Gerenciamento de formulários com validação performática, e boa integração com Zod para validação de schemas |
| Axios | Cliente HTTP com suporte a `withCredentials` para envio automático de cookies |

### Automação
| Tecnologia | Justificativa |
|---|---|
| n8n | Plataforma de automação mencionada nos requisitos do PS, mas que garante bastante simplicidade e integração no consumo de APIs, integração com provedores de e-mail, facilitando a criação de workflows automatizados. A possibilidade de subir um service do n8n via Docker também foi essencial na sua implementação, garantindo a praticidade necessária para o desafio. |

---

## Arquitetura

### Backend

A API segue uma arquitetura em camadas organizada em dois domínios: `auth` e `daily-sales`.

```
src/
├── controllers/     # Recebem a requisição HTTP, validam entrada de dados via zod, delegam ao service, devolvem a resposta
├── services/        # Regras de negócio (cálculo de lucro, validação de usuário, avaliação de alerta)
├── repositories/    # Abstrações de acesso a dados (interfaces + implementações Prisma), garantindo desacoplamento do banco com a regra de negócio, já que o service só tem contato com os contratos da interface
├── routers/         # Mapeamento de rotas e aplicação de middlewares
├── middlewares/     # authMiddleware (validação JWT) e errorHandler global (tratamento centralizado e padronizado de erros, utilizando o AppError customizado)
├── dtos/            # Tipos de entrada dos services
├── schemas/         # Schemas Zod para validação de request body
└── utils/           # AppError, asyncHandler(garante tratamento de erros assíncronos pelo express, evitando try/catch repetitivo), jwtGenerator
```

**Domínio `auth`**
- `POST /auth/sign-up` — criação de usuário com senha hasheada via bcryptjs
- `POST /auth/sign-in` — autenticação com geração de JWT armazenado em cookie HttpOnly
- `GET /auth/validate` — valida o token no banco, utilizado pelo frontend para verificar sessão ativa

**Domínio `daily-sales`**
- `GET /daily-sales` — retorna o histórico completo de indicadores diários, protegido por `authMiddleware`. O lucro é calculado na camada de serviço (`grossRevenue - totalCosts`), mantendo a regra de negócio desacoplada do banco. Em uma aplicação com milhares de registros, esse endpoint seria estendido com query params de filtro por período para evitar overfetching
- `GET /daily-sales/profit-alert` — retorna os dados do dia anterior e o campo `alertSituation` (`"lucro"` ou `"perda"`). Consumido exclusivamente pelo workflow n8n, portanto sem autenticação

**Database**

Dois models Prisma:
- `User` — id, nome, email, senha (hash)
- `DailySale` — referenceDate, totalOrders, grossRevenue, totalCosts

A aplicação inclui um **seed** que popula o banco com 28 registros mockados simulando os indicadores diários de fevereiro de 2026, representando um negócio real de forma simplificada. O seed usa `upsert` em `referenceDate`, tornando-o idempotente — pode ser executado múltiplas vezes sem duplicar dados.

A escolha pelo PostgreSQL se deu pela familiaridade com bancos relacionais no contexto do Prisma que possuo. Embora os dois models não possuam relações entre si nesta versão, o PostgreSQL oferece robustez e está preparado para evoluções do schema. Em um cenário de alta escala com consultas complexas e muitas relações, um query builder como o **Knex.js** poderia ser preferível ao Prisma para evitar gargalos de latência, permitindo um controle melhor sobre queries — mas para a escala deste projeto, o Prisma entrega velocidade de desenvolvimento e type-safety sem custo de performance relevante.

### Princípios SOLID Aplicados

Mesmo em um projeto de escopo reduzido, a aplicação foi estruturada seguindo os princípios SOLID para garantir organização, facilidade de manutenção e potencial de escalabilidade:

- **SRP (Single Responsibility Principle)** — cada camada tem uma única responsabilidade: o controller apenas orquestra a requisição e resposta HTTP; o service concentra a regra de negócio; o repository isola toda a lógica de acesso a dados. Nenhuma camada conhece os detalhes internos da outra

- **OCP (Open/Closed Principle)** — a introdução de um novo endpoint ou regra de negócio não exige modificação nas camadas existentes, apenas a adição de novos arquivos no domínio correspondente

- **LSP (Liskov Substitution Principle)** — as implementações concretas (`PrismaAuthRepository`, `PrismaDailySalesRepository`) são substituíveis pelas interfaces abstratas (`AuthRepository`, `DailySalesRepository`) sem quebrar o comportamento esperado pelos services e isso também garante que o service desconheça os detalhes de implementação do banco, dependendo apenas dos contratos das interfaces

- **ISP (Interface Segregation Principle)** — as interfaces de repositório são específicas por domínio (`AuthRepository` e `DailySalesRepository`), sem forçar implementações a expor métodos desnecessários, com as implementações do Prisma de AuthRepository conhecendo apenas o model users e o PrismaDailySalesRepository conhecendo apenas o model dailySales


- **DIP (Dependency Inversion Principle)** — os services dependem das interfaces abstratas de repositório, não das implementações concretas do Prisma. Isso garante desacoplamento total: trocar o Prisma por outro ORM ou query builder exigiria apenas uma nova implementação das interfaces, sem tocar em nenhum service

> Em um projeto de maior escala, com múltiplos casos de uso compartilhando repositórios, eu poderia introduzir o **Factory Pattern** para centralizar a composição de dependências (instanciação dos repositórios e injeção nos services). Neste projeto, com apenas duas interfaces de repositório, o factory seria overkill — a composição direta nos controllers é suficiente e mais legível

### Frontend

O frontend utiliza o **App Router** do Next.js com separação clara entre Server Components e Client Components:

- **Server Components** (`dashboard/page.tsx`) — buscam os dados da API no servidor, passando o cookie de autenticação via header. Nenhum dado sensível é exposto ao cliente, e o fetch das informações no servidor garante uma melhor UX, sem flicker ou flashing de conteúdo, já que a renderização ocorre com os dados completos
- **Client Components** — `CardsSection` (filtro de data com `useState`), `ProfitChart` (Recharts requer browser APIs), formulários de autenticação (React Hook Form)
- **Next.js Middleware** (`proxy.ts`) — intercepta rotas `/dashboard/*` e redireciona para `/auth/sign-in` caso o cookie `token` esteja ausente, antes mesmo de renderizar qualquer componente. Essa 'parede' de proteção a cada request de navegação também evita content flashing e para um projeto pequeno não cria gargalos
- **AuthProvider** — camada adicional client-side que chama `GET /auth/validate` para garantir que o token ainda é válido no banco (além da verificação de presença feita pelo middleware). Aqui é onde o estado global de autenticação é gerenciado, permitindo uma UX mais fluida, com redirecionamentos automáticos e proteção de rotas client-side, e onde também a segurança dá aplicação 'desconfia' do front e busca a rota de validação de token no back, pra garantir que ele é válido

---

## Automação com n8n

O workflow **profit-alert** implementa o seguinte fluxo, executado a cada 5 minutos. Coloquei pra rodar a cada 5 minutos por motivos de demonstração, mas no mundo real em produção, ela poderia rodar uma vez a cada dia às 07h da manhã, por exemplo, mandando o alerta sobre o status do dia anterior para os gestores após a consolidação dos dados

```
Schedule Trigger (5 min)
    └── HTTP Request → GET /daily-sales/profit-alert
            └── IF alertSituation == "perda"
                    ├── [true]  → Code Node (log do alerta de perda, com os dados do dia anterior)
                    └── [false] → (sem ação)
```

**Em produção**, o node **Code** seria substituído por um node **Send Email (SMTP)** ou **Gmail**, configurado com as credenciais necessários para o envio do e-mail para destinatários específicos (como os gestores que falei acima), retratando a perda do dia anterios com os dados de vendas, total de pedidos, receita bruta, custos totais e o alerta de perda. Como o projeto é simples e não vai a produção, preferi simplificar com um node de log javascript, mas a lógica se mantém e a explicação conceitual está de acordo com o que seria implementado em um cenário real.

A mesma lógica se aplicaria a um alerta via **WhatsApp** utilizando a API do Twilio ou a integração nativa do n8n com WhatsApp Business, bastando substituir o node de envio.

---

## Agente de IA (Conceitual)

Um agente de IA integraria o portal como uma camada de inteligência conversacional sobre os indicadores de vendas. A arquitetura conceitual seria:

**Canal de entrada:** WhatsApp Business (via Twilio ou n8n WhatsApp node)

**Fluxo:**
1. O fluxo começa com um gestor, ou outro usuário que tenha acesso ao chat, enviando uma determinada mensagem para o WhatsApp Business, como por exemplo: "Qual o resultado de ontem?"
2. Esse chat do WPP é integrada com o twilio, que é uma plataforma de comunicação capaz de disparar um webhook (um POST com json {"message": "Pergunta do usuário"}). Assim, esse webhook é enviado para o n8n, através de uma rota HTTP
3. Essa rota http ela é gerada pelo n8n, e pode ser configurada como active listener, e a cada mensagem que o twilio manda pra esse endpoint, causa um trigger para começar de verdade o workflow dentro do n8n, através desse Webhook Node
4. Recebendo o json com a mensagem, o n8n, através de um node como o da OpenAI (que existe na plataforma), pode enviar um function call para o modelo da LLM escolhida, function essa que vai com o prompt do usuário no chat, e que é pré-configurada por quem monta o workflow, e que fala pra llm quais parâmetros ela tem que devolver, como por exemplo, a referenceDate
5. Assim, o modelo de LLM configurado pelo node do n8n com as tools que estão dentro do contexto possível de uma conversa entre o usuário com o agente (getDailySales, getProfitAlert, etc), retorna essa tool call (que o próprio modelo decide qual chamar de acordo com o function call - interpretando a mensagem do user - e as tools configuradas que estão disponíveis) com os parâmetros requisitados pela function call ao n8n, de forma estruturada, como por exemplo, um json com a propriedade name "getSDailySales" (nome da tool) o referenceDate de d-1 (referenciando a pergunta da etapa 1 do fluxo que o gestor fez)
6. Recebendo essa tool, o node do n8n pode usar uma condicional previamente configurada (if tool.name = 'getDailySales', do something), usar um HTTP node e chamar o endpoint da API `GET /daily-sales` com um query param do dia de ontem como referenceDate, para que a API, possa retornar os dados requisitados pelo usuário
7. Assim, recebendo os dados da API, o n8n retorna o resultado à LLM (basicamente um loop), chamando outro node da OpenAI, só que dessa vez, o contexto (system prompt) para essa etapa é de que a LLM vai estruturar o json recebido da API em uma resposta humanizada, como por exemplo: "O resultado de ontem foram 50 vendas, com um faturamento de R$5000, custos totais de R$3000 e lucro de R$2000". Esse contexto, como todas as ações da LLM, é configurado por quem está montando o workflow
8. Após a 'humanização' da resposta, ela é enviada de volta ao usuário via nova conexão n8n -> Twilio, que encaminha para o WhatsApp do user

**Obs**: É importante, para garantir integridade do agente, que o configurador do workflow defina claramente os contextos de cada etapa da conversa, e as ferramentas (tools) que a LLM pode usar, para evitar respostas erráticas ou fora do contexto. O agente deve ser configurado para seguir a estrutura definida, garantindo que as respostas sejam sempre relevantes e precisas com base nos dados reais da API, e que nunca responda perguntas aleatórias, como por exemplo, "Quem é o goleiro do Cruzeiro?"

---

## Instruções de Execução

### Pré-requisitos

- Node.js 20+
- Docker e Docker Compose

### Modo completo com Docker (API + DB + n8n)

**1. Configure as variáveis de ambiente da API**
```bash
cd api
cp .env.example .env
# Preencha: POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, SECRET_KEY
```

**2. Suba todos os serviços**
```bash
docker-compose up --build
```

Serviços disponíveis:
- API: `http://localhost:3333`
- n8n: `http://localhost:5678`

> O container da API executa automaticamente as migrations e o seed ao iniciar

**3. Configure o frontend apontando para a API containerizada**
```bash
cd ../frontend
cp .env.example .env
# NEXT_PUBLIC_API_URL=http://localhost:3333
# API_URL=http://localhost:3333
npm install
npm run dev
# Frontend disponível em http://localhost:3000
```

**4. Configure o workflow no n8n**
- Acessar `http://localhost:5678` e crie o owner account (pode usar qualquer email e qualquer senha aqui)
- No menu principal do n8n, clicar no "+" (canto superior esquerdo) e depois em workflow. Na página do workflow, clicar nos 3 pontinhos ("...") no canto superior direito e depois em import from file
- Selecionar o arquivo `api/n8n/workflows/profit-alert.json`
- Ativar o workflow clicando em publish, e ele irá rodar periodicamente a cada 5m

---

## Variáveis de Ambiente

### `api/.env`
```env
PORT=3333
NODE_ENV=development

DATABASE_URL=postgresql://<user>:<password>@db:5432/<db>
DIRECT_URL=postgresql://<user>:<password>@db:5432/<db>

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

SECRET_KEY=
```

### `frontend/.env`
```env
NEXT_PUBLIC_API_URL=http://localhost:3333
API_URL=http://localhost:3333
```
Vale frisar que aqui, a API_URL é utilizada no fetch de server components, enquanto o NEXT_PUBLIC_API_URL é utilizada em componentes client-side, para que o browser enxergue essa variável. Em desenvolvimento, ambas apontam pra minha API rodando na própria máquina, mas em produção uma poderia apontar para URL da API real em produção e a outra para o domain do frontend, caso fossem hospedados em domínios diferentes. Para esse projeto, como ambos estão rodando localmente, elas apontam para o mesmo endereço.
