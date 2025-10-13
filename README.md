# 🌱 Hortas Comunitárias + Univille

Sistema de gestão de associações e hortas comunitárias desenvolvido na disciplina de Vivências de Extensão V pelos graduandos dos cursos de Engenharia de Software e Sistemas de Informação da Univille.

Repositório dedicado do nosso grupo.

## 🌐 Membros do grupo

- Lucas Pacífico | [@lvcaspacifico](https://github.com/lvcaspacifico)
- João Alencar | [@j-alencar](https://github.com/j-alencar)
- Marcelo Fiedler | [@MarceloAFiedler](https://github.com/MarceloAFiedler)
- Felipe Mourão | [@thekogami](https://github.com/thekogami)
- Marcos Will | [@Marcoswill0101](https://github.com/Marcoswill0101)
- Nathan Bergmann | [@NathanBergmann](https://github.com/NathanBergmann)

## 🛣️ Roadmap do Projeto

Atualmente, estamos registrando progresso na [Issue #1 - [Roadmap]🔗](https://github.com/lvcaspacifico/hortas-comunitarias-univille/issues/1) e sub-issues relacionadas.


## 🚀 Stack Tecnológica

### Backend
- **PHP 8.2** com **Slim Framework 4**
- **MySQL 8.0** para banco de dados
- **JWT** para autenticação
- **Nginx** como servidor web
- **Redis** para cache e sessões

### Frontend
- **Vue.js 3** com Composition API
- **Vue Router 4** para roteamento
- **Vuex 4** para gerenciamento de estado
- **Bootstrap 5** para UI
- **Leaflet** para mapas

### Mobile
- **Vue Native** / **React Native**
- **Expo** para desenvolvimento
- **React Navigation** para navegação

### DevOps
- **Docker** e **Docker Compose**
- **Nginx** como proxy reverso
- **phpMyAdmin** para administração do banco

## 📁 Estrutura do Projeto

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

## 🔧 Configuração Rápida: Setup local

Não esqueça de deixar o Docker Desktop rodando, ele será necessário para executar os containers.

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

## 🔧 Configuração Backend

Disponível em `backend/README.md`

## 🔧 Configuração Frontend

Disponível em `frontend/README.md`

## 📋 Comandos Úteis

```bash
make help           # Ver todos os comandos disponíveis
make start          # Iniciar todos os containers
make stop           # Parar todos os containers
make logs           # Ver logs dos serviços
make install        # Instalar dependências
make clean          # Limpar ambiente
```

Para mais detalhes, consulte o [DEVELOPMENT.md](DEVELOPMENT.md) ou o arquivo `README.md` interno de cada pasta do projeto.
