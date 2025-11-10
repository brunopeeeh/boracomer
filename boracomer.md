# BoraComer — Análise de Produto e Experiência

## Tese de Produto

A Yooga é hoje um dos sistemas de gestão mais completos do Brasil. Mas o mercado inteiro já faz gestão. Ninguém, porém, resolveu o desejo — nem o momento da escolha.

Hoje, o consumidor descobre restaurantes no TikTok ou Instagram, mas precisa usar outras plataformas para decidir onde ir, ver o cardápio, ou pedir delivery. A oportunidade está em unificar descoberta e ação: um lugar onde o cliente descobre, escolhe e age — seja para ir pessoalmente ou pedir em casa.

### O que é o Bora Comer

Um social marketplace de restaurantes, onde o cliente:
- descobre lugares reais por vídeos e fotos autênticos (espelhados do TikTok ou Instagram);
- explora no mapa (como no Airbnb);
- e decide se quer ir até lá ou pedir direto dali (como no iFood).

O app transforma o ato de “descobrir onde comer” em uma jornada visual, fluida e integrada, super conectada com os hábitos digitais de hoje (a GenZ já busca mais no TikTok do que no Google).

### O Diferencial

Hoje, o consumidor descobre restaurantes para ir presencialmente em uma mistura de TikTok, Instagram e Google Maps — mas nenhum desses espaços foi pensado para gastronomia. Não existe um TikTok de restaurantes: um lugar onde o feed é feito só de comida real, experiências, ambientes e recomendações autênticas, com base em geolocalização.

Não existe um “iFood do presencial”: um lugar onde o cliente descubra novos locais vendo um vídeo que desperta vontade, e possa pegar um desconto/promoção para ir presencialmente ou pedir direto dali, sem precisar mudar de plataforma.

O Bora Comer nasce exatamente nesse ponto de intersecção: a fusão entre o desejo visual das redes sociais e a ação prática dos marketplaces. É o primeiro ambiente onde:
- o cliente descobre lugares reais por meio de vídeos e fotos puxados do Instagram ou TikTok dos restaurantes;
- decide onde ir com base em conteúdo autêntico;
- ganha descontos/promoções para ir presencialmente; e
- se quiser, pede direto dali com a fluidez do iFood.

### Como funciona

- Restaurantes conectam suas redes sociais (Instagram, TikTok) e o cardápio Yooga para compor seus perfis.
- Escolhem postagens reais para “fixar” no perfil público.
- Consumidores exploram um feed de vídeos/imagens + stories e um mapa com pins clicáveis. As opções aparecem de acordo com a localização.
- Ao clicar em um post, podem:
  - ver fotos, vídeos e avaliações reais;
  - pegar descontos/promoções exclusivas;
  - reservar mesa ou pedir delivery via o cardápio digital da Yooga.

### Proposta Única de Valor

Bora Comer é o primeiro marketplace social do food service — um lugar onde descobrir restaurantes é tão fácil quanto rolar o feed do TikTok, e ir ou pedir com descontos acontece em um clique.

**Resumo Executivo**
- Plataforma focada em descoberta de estabelecimentos locais e ativação de ofertas através de cupons.
- Experiência consistente entre mobile e desktop, com navegação de fácil acesso.
- Mapa interativo como eixo central de descoberta, apoiado por filtros de distância e localização do usuário.
- Gestão de cupons com estados “Disponível” e “Utilizado”, comunicação clara e persistência local.

**Objetivo e Proposta de Valor**
- Facilitar que pessoas encontrem lugares para comer próximos, com destaque para promoções e vantagens.
- Reduzir atrito entre descoberta e conversão via cupons simples de copiar e usar.
- Oferecer confiança com UI responsiva, mensagens claras e estados previsíveis.

**Público-Alvo**
- Usuários que desejam encontrar ofertas próximas rapidamente (mobilidade, conveniência).
- Pequenos estabelecimentos que se beneficiam da visibilidade e das promoções.

**Principais Funcionalidades**
- Navegação e Layout
  - Mobile: barra inferior com atalhos para Home, Descobrir, Mapa, Cupons e Perfil.
  - Desktop: barra lateral à esquerda com as mesmas seções, incluindo “Meus Cupons”.
  - Estrutura organizada, com cabeçalhos e ações contextuais por página.
- Mapa Interativo
  - Mostra estabelecimentos em pontos agrupados (clusters) e pins detalhados em zoom alto.
  - Filtro por raio (500 m, 1 km, 5 km, 10 km) para focar na área de interesse.
  - Botão de localização para centralizar no usuário, com feedback visual e mensagens.
  - Ação por pin: exibe informações rápidas do estabelecimento (nome, tipo de atendimento, distância) e permite notificação.
  - Contêiner robusto: mesmo durante o carregamento dos dados, o mapa renderiza, evitando telas em branco.
  - Tratamento de erro: mensagens amigáveis em caso de falha do mapa (ex.: necessidade de configurar token ou problemas de rede).
- Meus Cupons
  - Abas “Disponíveis” e “Utilizados” com contadores.
  - Ação “Usar” muda o estado de “Disponível” para “Utilizado” e bloqueia novas cópias.
  - Persistência local: os estados dos cupons ficam salvos no dispositivo do usuário.
  - Cópia de código com confirmação por notificação (“Código copiado”).
  - Visual de cupons usados em escala de cinza, com detalhes de uso (data/hora e local genérico).
  - Conteúdo inicial inclui exemplos de cupons já utilizados para enriquecer a aba “Utilizados”.
- Descobrir
  - Lista de recomendações com informações de distância, tempo, categoria e tags de atração (ex.: “Mais pedido”, “Cupom disponível”).
  - Imagens e descrições curtas para estimular exploração.
- Perfil
  - Estatísticas resumidas (pedidos, avaliações, favoritos) e últimos pedidos.
  - Espaço para evolução futura (conquistas, histórico, preferências).
- Categorias
  - Seção de navegação rápida por categorias extraídas dos dados, com ícones/emoji.
  - Comportamento de rolagem com setas auxiliares (UX refinada para listas horizontais).

**Fluxos de Usuário**
- Descoberta pelo Mapa
  - Usuário abre o mapa, ajusta o raio, opcionalmente compartilha localização.
  - Interage com pins/agrupamentos e obtém detalhes rápidos do estabelecimento.
- Ativação de Cupom
  - Na aba “Disponíveis”, o usuário copia o código (confirmação imediata por notificação).
  - Marca como “Utilizado” quando aplicou; o cupom migra para “Utilizados” e não pode mais ser copiado.
- Configuração do Mapa (quando necessário)
  - Acesso rápido ao botão “Token” no cabeçalho do mapa para configurar permissão de visualização.

**Conteúdo e Dados**
- Estabelecimentos são carregados a partir de um arquivo público hospedado junto ao app (lojas.json).
- Campos esperados por estabelecimento: nome da empresa, modelo de negócio, tipo de atendimento, latitude e longitude.
- Dados ficam disponíveis para diferentes seções (mapa, categorias) e são reutilizados de forma performática.

**Persistência e Estado**
- Cupons: estados são mantidos localmente, garantindo continuidade da experiência entre sessões.
- Estabelecimentos: carregamento é cacheado por um período, reduzindo requisições e variabilidade visual.

**Mensagens e Notificações**
- Sucesso ao copiar cupons.
- Sucesso/erro ao obter localização.
- Erros de visualização do mapa (token/conexão), orientando o usuário para resolver de forma autônoma.

**Experiência por Dispositivo**
- Mobile
  - Navegação inferior acessível com polegar, foco em ações rápidas (Map, Cupons).
  - Layout compactado, scroll e componentes otimizados.
- Desktop
  - Barra lateral fixa, maior área útil do mapa e da lista de conteúdos.
  - Consistência sem criar discrepâncias de navegação.

**Acessibilidade e UX**
- Uso de ícones e textos de apoio em botões e labels.
- Remoção de sombras excessivas em labels onde havia sobreposição visual.
- Botões com estados visuais de carregamento/disabled, evitando ações inesperadas.

**Desempenho e Resiliência**
- Mapa renderiza mesmo com dados em carregamento, evitando a sensação de falha.
- Agrupamentos de pontos para lidar com densidade elevada sem poluir a interface.
- Fallbacks visuais para imagens, mitigando latência e erros de carregamento.

**Riscos e Limitações**
- Dependência de configuração de visualização do mapa (token), podendo causar falhas se ausente/inválido.
- Bloqueios de rede (ex.: firewall) impactam carregamento do mapa.
- Qualidade e atualidade do arquivo de estabelecimentos (lojas.json) influenciam a precisão da descoberta.
- Permissão de geolocalização: sem consentimento, a experiência perde personalização.

**Métricas Recomendadas**
- Engajamento no Mapa: tempo na tela, interações com pins, ajustes de raio.
- Conversão de Cupons: taxa de cópia, marcações como “Utilizado”, tempo entre ver e usar.
- Latência de Carregamento: tempo para primeira renderização do mapa e aparecimento de pins.
- Erros Críticos: falhas na visualização do mapa e obter localização.

**Roadmap Sugerido**
- Cupons
  - “Desfazer uso”, histórico de uso por estabelecimento.
  - Vencimento real e ordenação por validade/benefício.
  - Aplicar cupom diretamente no fluxo de pedido.
- Mapa & Descoberta
  - Detalhe de estabelecimento (card expandido) com fotos, horário, menus e avaliações.
  - Busca por nome/categoria e filtros avançados (preço, atendimento, distância).
  - Preferências e favoritos integrados ao mapa e à home.
- Perfil
  - Login, sincronização de estado em múltiplos dispositivos.
  - Metas e conquistas com benefícios (gamificação leve).
- Conteúdo & Dados
  - Atualização automática do catálogo de estabelecimentos e auditoria de qualidade.
  - Instrumentação para coleta de métricas e relatórios ao time de produto.
- Experiência
  - Onboarding com dicas contextualizadas (mapa, cupons).
  - Acessibilidade reforçada (contraste, navegação por teclado, textos alternativos).
  - Internacionalização para novos mercados.

**Checklist de QA (alta relevância)**
- Mapa carrega com e sem dados de estabelecimentos.
- Mensagens claras para falhas de visualização do mapa e localização.
- Cupons: copiar, usar, persistir estado e refletir corretamente nas abas.
- Responsividade: navegação consistente entre mobile e desktop.
- Filtros de raio aplicam e atualizam pins de forma previsível.
- Arquivo de estabelecimentos válido e atualizado.

---

Este documento mapeia o estado atual do produto e os principais pontos de evolução para maximizar descoberta, conversão via cupons e satisfação do usuário. A recomendação é priorizar o roadmap com base em impacto (conversão de cupons e detalhamento de estabelecimentos) e viabilidade (instrumentação e dados).