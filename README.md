# Conversor de Arquivos Ruiz — Frontend

Interface em React que permite colar o link de um vídeo do YouTube e
baixar o áudio convertido em MP3. Consome a API do repositório de backend.

🔗 Backend (API): https://github.com/MelissaRuiz03/backend-conversor-video

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`. Por padrão, o app chama a API em
`http://localhost:3000` — se o backend estiver em outro endereço, crie um
arquivo `.env` (veja `.env.example`) com `VITE_API_URL=https://sua-api`.

## Build de produção

```bash
npm run build
```

Gera os arquivos estáticos em `dist/`.

## Como rodar com Docker

```bash
docker build -t frontend-conversor --build-arg VITE_API_URL=http://localhost:3000 .
docker run -p 8080:80 frontend-conversor
```

## Decisões técnicas

- **`VITE_API_URL` é "build arg", não variável de ambiente de runtime.** O
  Vite grava essa URL dentro do JavaScript estático no momento do
  `npm run build` — depois de buildado, mudar a variável de ambiente do
  container não muda mais nada. Por isso ela precisa ser definida antes do
  build (como `--build-arg` no Docker, ou `.env` localmente), nunca depois.
- **shadcn/ui + Tailwind CSS** no lugar de CSS escrito à mão. Os
  componentes (`Button`, `Input`, `Card`, `Alert`, `Sidebar`) vêm de
  `src/components/ui/`, gerados pelo CLI do shadcn e depois customizados
  pra esse projeto — são código do próprio repositório, não uma
  dependência de pacote.
- **Fundo animado em Canvas 2D (`StarfieldBackground.jsx`), não WebGL.**
  Uma primeira versão usava WebGL (shader customizado), mas travava
  (`webglcontextlost`) em GPUs integradas mais simples com driver
  Mesa/Linux — um problema real de compatibilidade de hardware, não um
  bug de código. Canvas 2D roda na CPU, sem depender de driver gráfico,
  então funciona em qualquer máquina.
- **Imagem Docker `node:20-alpine` em build multi-stage.** Diferente do
  backend (que precisa de `node:20` por causa de binários nativos), o
  frontend só compila JavaScript — Alpine funciona sem problema aqui.

## Stack

React · Vite · Tailwind CSS · shadcn/ui (Radix) · Canvas 2D (fundo animado)
