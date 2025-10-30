# BoraComer

Aplicação web em React (Vite + TypeScript) com Tailwind e shadcn-ui. Inclui seção de Stories com comportamento semelhante ao Instagram e página de mapa com suporte a Mapbox.

## Destaques

- Stories com rolagem suave e snap: `snap-x` + `snap-mandatory` com `snap-start` nos cards.
- Desktop: 6 stories visíveis, avanço de 3 itens por clique; Mobile: 4 visíveis, avanço de 2 itens.
- Scrollbar horizontal oculto nos Stories via utilitário `scrollbar-hide`.
- UI baseada em Radix + shadcn-ui, ícones `lucide-react`, tailwind configurado.

## Requisitos

- Node.js `>= 18` (recomendado `20`).
- npm `>= 9`.

## Instalação

```sh
git clone https://github.com/brunopeeeh/boracomer.git
cd boracomer
npm install
```

## Scripts

- `npm run dev`: inicia o servidor de desenvolvimento (Vite).
- `npm run build`: gera build de produção.
- `npm run build:dev`: build em modo desenvolvimento.
- `npm run preview`: serve o build gerado localmente.
- `npm run lint`: executa ESLint em todo o projeto.

## Desenvolvimento

```sh
npm run dev
# abra http://localhost:8080
```

## Build e Preview

```sh
npm run build
npm run preview
# por padrão, http://localhost:8080 (se configurado no vite.config)
```

## Mapbox (opcional)

- A página `Map` suporta Mapbox. Você pode inserir o token pela UI (campo de token), que é mantido em estado local.
- Para uso em produção, configure a variável de ambiente `VITE_MAPBOX_TOKEN` e mantenha um fallback seguro.

### Configuração do token via `.env`

- Crie um arquivo `.env.local` na raiz do projeto com:

```
VITE_MAPBOX_TOKEN=pk.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

- O código lê `import.meta.env.VITE_MAPBOX_TOKEN`. Caso não exista, há um token público de fallback configurado para desenvolvimento.
- Não versione tokens reais. O `.gitignore` ignora arquivos `.env*`.
- Em produção, considere armazenar o token em variáveis de ambiente do servidor de build/deploy.

## Tecnologias

- `React`, `Vite`, `TypeScript`
- `Tailwind CSS`, `shadcn-ui`, `Radix UI`
- `lucide-react`, `react-router-dom`

## CI (GitHub Actions)

- O repositório inclui um workflow de CI que executa `npm install`, `npm run lint` e `npm run build` em cada push/PR.
- Arquivo: `.github/workflows/ci.yml`.

## Estrutura

- `src/components/StoriesSection.tsx`: seção de Stories com rolagem suave e snap.
- `src/pages/Map.tsx`: página de mapa com filtros e entrada de token.
- `src/components/ui/*`: componentes UI (shadcn + Radix).

## Licença

Este repositório é privado do autor; sem licença pública definida.
