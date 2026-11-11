# Refúgio Dourado: API de Gestão para Pousada

API REST em Node.js, Express e MySQL que centraliza a operação da **Pousada Refúgio Dourado**: hóspedes, quartos, reservas, consumo, financeiro, manutenção e limpeza. Projeto apresentado como Projeto Integrador de Extensão do curso de Engenharia de Software da UniJaguaribe (Aracati/CE).

O sistema completo, com interface em React e acesso ao banco via Prisma, está no repositório [pousada-erp](https://github.com/SamuelWallace2026/pousada-erp).

## Sobre o projeto

Uma pousada precisa acompanhar ao mesmo tempo quem está hospedado, quais quartos estão livres, o que cada hóspede consumiu, o que já foi pago e o que precisa de manutenção ou limpeza. Esta API reúne tudo isso em um único servidor: o front-end envia requisições HTTP e a API grava e consulta as informações no banco MySQL.

O projeto tem 11 recursos, cada um com operações completas de cadastro, consulta, atualização e exclusão (CRUD), organizados em rotas separadas por assunto.

## Recursos da API

Todas as rotas ficam sob `http://localhost:3333/api` e seguem o mesmo padrão: `GET /`, `GET /:id`, `POST /`, `PUT /:id` e `DELETE /:id`.

| Recurso | Rota | O que gerencia |
| --- | --- | --- |
| Hóspedes | `/api/hospedes` | Nome, CPF, e-mail, telefone e endereço |
| Quartos | `/api/quartos` | Número, capacidade, valor da diária, categoria e status (padrão: `LIVRE`) |
| Reservas | `/api/reservas` | Hóspede, quarto, atendente, datas de check-in e check-out, status (padrão: `CONFIRMADA`) e origem (padrão: `Balcão`) |
| Produtos | `/api/produtos` | Itens do cardápio: nome, preço, estoque e categoria |
| Consumo | `/api/consumo` | Pedidos vinculados a uma reserva, com quantidade, subtotal e status (padrão: `SOLICITADO`) |
| Transações | `/api/transacoes` | Receitas e despesas, valor e método de pagamento |
| Mensagens | `/api/mensagens` | Conversa com o hóspede, com controle de lida e resposta |
| Governança | `/api/tarefas-governanca` | Tarefas de limpeza por quarto, com urgência e status (padrão: `Sujo`) |
| Manutenção | `/api/chamados-manutencao` | Chamados por quarto, com prioridade (padrão: `Média`) e status (padrão: `Pendente`) |
| Cargos | `/api/cargos` | Cargos dos funcionários |
| Usuários | `/api/usuarios` | Funcionários e seu cargo; as consultas nunca retornam a senha |

Os identificadores são textos de até 36 caracteres (padrão UUID), enviados pelo cliente no corpo da requisição.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| Node.js | Ambiente de execução |
| Express 5 | Servidor e rotas da API |
| mysql2 (promises) | Conexão com o MySQL, com pool de conexões e consultas parametrizadas |
| cors | Liberação de acesso para o front-end |
| dotenv | Leitura das credenciais do banco a partir do arquivo `.env` |
| MySQL | Banco de dados relacional |

## Estrutura do projeto

```
src/
├── server.js            # Inicia o servidor e registra as rotas
├── config/
│   └── db.js            # Pool de conexão com o MySQL
└── routes/
    ├── hospedes.routes.js
    ├── quartos.routes.js
    ├── reservas.routes.js
    ├── produtos.routes.js
    ├── consumo.routes.js
    ├── transacoes.routes.js
    ├── mensagens.routes.js
    ├── governanca.routes.js
    ├── manutencao.routes.js
    ├── cargos.routes.js
    └── usuarios.routes.js
```

## Como executar

### Pré-requisitos

- Node.js instalado
- MySQL em execução (por padrão, `localhost:3306`)

### Passos

1. Instale as dependências:

```bash
npm install
```

2. Crie o banco `refugio_dourado_db` no MySQL e as tabelas do sistema (hospede, quarto, reserva, produto, consumo, transacao, mensagem, tarefa_governanca, chamado_manutencao, cargo e usuario).
3. Copie o arquivo `.env.example` para `.env` e preencha os dados do seu banco:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=refugio_dourado_db
```

4. Inicie a API:

```bash
node src/server.js
```

O terminal mostra `Conectado ao MySQL com sucesso!` e a API fica disponível em `http://localhost:3333`.

### Testando

```bash
curl http://localhost:3333/api/quartos
```

## Segurança

- As credenciais do banco ficam no arquivo `.env`, que não é versionado.
- A pasta `node_modules` também não é versionada.
- As consultas usam parâmetros (`?`), o que protege contra SQL Injection.

## Próximos passos

- Autenticação com login e token (JWT) e proteção das rotas
- Geração do hash da senha na própria API
- Validação dos dados recebidos
- Regra para impedir reservas com datas conflitantes no mesmo quarto

## Autor

**Samuel Wallace Liberato Queiroz**
Estudante de Engenharia de Software, UniJaguaribe, Aracati/CE
[github.com/SamuelWallace2026](https://github.com/SamuelWallace2026)
