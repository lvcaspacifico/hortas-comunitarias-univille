# 🌱 Hortas Comunitárias + Univille

Sistema de gestão de hortas comunitárias desenvolvido na disciplina de Vivências de Extensão V pelos graduandos dos cursos de Engenharia de Software e Sistemas de Informação da Univille.

> [!CAUTION]
> Cabe a cada grupo atualizar esse e outros `README.md` relevantes a sua contribuição no projeto. O mesmo vale para as Issues. Não nos responsabilizamos por informações faltantes decorrentes do não preenchimento. A manutenção do repositório é da responsabilidade de todos.

## 🟩 Introdução: Backend MVP

Esse fork do [repositório original](https://github.com/thiagohome2/hortas-comunitarias-univille)🔗 constrói e entrega o MVP do backend da aplicação, disponibilizando todo o esquema de banco de dados, regras de negócio mínimas, e uma API REST.

A documentação do banco de dados está [disponível aqui](https://github.com/lvcaspacifico/hortas-comunitarias-univille/blob/main/docs/db/README.md)🔗
+ Contexto/valores específicos aceitos de alguns campos
+ Relacionamentos entre entidades

A documentação da API REST está [disponível aqui](https://github.com/lvcaspacifico/hortas-comunitarias-univille/blob/main/docs/api/README.md)🔗
+ Rndpoints disponíveis
+ Envio/retorno obrigatório de cada rota
+ Quais os dados retornados de acordo com cada cargo
+ Coleção de templates do Postman para testes

> ⚠️ Importante: O backend está em estágio de MVP, o que significa que existem possíveis ajustes e correções de bugs necessários. Construa seu client levando isso em consideração e referencie sempre o `README.md` da pasta backend.

Quanto ao frontend desktop e frontend mobile, atualmente estão em desenvolvimento. Consulte a [Issue #1 - [Roadmap]](https://github.com/lvcaspacifico/hortas-comunitarias-univille/issues/1)🔗 para mais informações do andamento do projeto.
    
#### 🟢 Backend MVP | Membros do grupo

- Lucas Pacífico | [@lvcaspacifico](https://github.com/lvcaspacifico)
- João Alencar | [@j-alencar](https://github.com/j-alencar)
- Marcelo Fiedler | [@MarceloAFiedler](https://github.com/MarceloAFiedler)
- Felipe Mourão | [@thekogami](https://github.com/thekogami)
- Marcos Will | [@Marcoswill0101](https://github.com/Marcoswill0101)

## 🟩 Introdução: Frontend 

#### 🟢 Frontend Desktop MVP | Membros do grupo

- ⛓️‍💥

## 🟩 Introdução: Integração com Gateway de Pagamentos

#### 🟢 Integração com Gateway de Pagamentos | Membros do grupo

- ⛓️‍💥

## 🟩 Introdução: Mobile

#### 🟢 Frontend Mobile MVP | Membros do grupo

- ⛓️‍💥

## 🟩 Stack Tecnológica

Tecnologias utilizadas:

### Backend
- **PHP 8.2** com **Slim Framework 4**
- **MySQL 8.0** para banco de dados
- **JWT** para autenticação
- **Nginx** como servidor web
- **Redis** para cache e sessões

### DevOps
- **Docker** e **Docker Compose**
- **Nginx** como proxy reverso
- **phpMyAdmin** para administração do banco

Tecnologias sugeridas pelo Thiago no repositório base. Precisa de confirmação após construir essas features:

### Frontend Desktop
- **Vue.js 3** com Composition API
- **Vue Router 4** para roteamento
- **Vuex 4** para gerenciamento de estado
- **Bootstrap 5** para UI
- **Leaflet** para mapas

### Frontend Mobile
- **Vue Native** / **React Native**
- **Expo** para desenvolvimento
- **React Navigation** para navegação

## 🟩 Estrutura do Projeto

```
hortas-comunitarias-univille/
├── backend/                 # API PHP com Slim Framework
├── frontend/               # Aplicação Vue.js
├── mobile/                 # App React Native ou Vue Native
├── docker/                 # Configurações Docker
├── docker-compose.yml      # Orquestração dos serviços
├── Makefile               # Comandos úteis
└── DEVELOPMENT.md         # Guia detalhado de desenvolvimento
```

## 🟩 Configuração Rápida: Setup local

Não esqueça de deixar o Docker Desktop rodando, ele será necessário para executar os containers.

> ⚠️ Importante: Esses comandos deixarão todos os containers da aplicação configurados e rodando em sua máquina. Para containers e configurações específicas de backend ou frontends, consulte o arquivo `README.md` interno de cada pasta do projeto.

```bash
# Clone o repositório
git clone <repo-url>
cd hortas-comunitarias-univille

# Configuração automática do ambiente
make setup

# Ou use o script diretamente
./setup.sh
```

🌐 URLs dos Serviços:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8181
- **phpMyAdmin**: http://localhost:8080
- **Portainer**: http://localhost:9000
- **MySQL**: localhost:3306

## 📋 Comandos Úteis

```bash
make help           # Ver todos os comandos disponíveis
make start          # Iniciar todos os containers
make stop           # Parar todos os containers
make logs           # Ver logs dos serviços
make install        # Instalar dependências
make clean          # Limpar ambiente
```

Para mais detalhes, consulte o [DEVELOPMENT.md](DEVELOPMENT.md).
