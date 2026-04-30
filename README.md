# Método Yano

Monorepo com `metodo-yano-web` (Next.js) e `metodo-yano-api` (NestJS).

## Como iniciar o projeto

> **Importante:** o erro `ENOENT ... package.json` significa que o `npm` não encontrou o arquivo `package.json` no diretório atual.

### 1) Verifique se você está na pasta certa

No terminal (Git Bash / PowerShell):

```bash
pwd
ls
```

Você precisa enxergar um `package.json` na pasta em que vai rodar `npm i`.

### 2) Instale dependências por app

Se cada app tiver seu próprio `package.json`, rode:

```bash
cd metodo-yano-api
npm i

cd ../metodo-yano-web
npm i
```

### 3) Suba API e Web em terminais separados

**Terminal 1 (API):**

```bash
cd metodo-yano-api
npm run start:dev
```

API esperada em: `http://localhost:3001/api`

**Terminal 2 (Web):**

```bash
cd metodo-yano-web
npm run dev
```

Web esperada em: `http://localhost:3000`

## Erro que você teve (`ENOENT package.json`)

Esse erro acontece por um destes motivos:

1. Você está na pasta errada.
2. O `package.json` não foi versionado/copiado para sua máquina.
3. Você abriu apenas parte do repositório (checkout incompleto).

## Checklist rápido para corrigir

Rode estes comandos no seu projeto:

```bash
# 1) procurar package.json no repositório
find . -name "package.json"

# 2) conferir branch atual
git branch --show-current

# 3) atualizar o código
git pull
```

Se o comando `find . -name "package.json"` **não retornar nada**, sua cópia do repositório está incompleta e você precisa:

- clonar novamente o projeto inteiro, ou
- pedir os arquivos de configuração (`package.json`, lockfile, etc.) para quem mantém o repositório.

## Observação para este repositório

No estado atual deste repositório, não existe nenhum arquivo `package.json` versionado. Sem ele, o `npm i` não pode funcionar.
