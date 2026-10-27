# Tolê Pará — adequação ao Pro (R$ 360)

Revisão local baseada na tabela enviada pelo cliente. Não houve publicação ou envio ao remoto.

## Estado preservado
Antes desta edição, index.html já tinha alterações e index (1).html era um arquivo novo. Ambos foram preservados em C:\Users\julio\AppData\Local\Temp\tole-pro-scroll-20261027-132831. index (1).html não foi editado. Base Git: f319156. Sem AGENTS.md encontrado.

## Correspondência com o plano
| Item Pro | Entrega / limite |
| --- | --- |
| Estrutura avançada e personalizada | Apresentação da açaiteria, três passos de autosserviço, vitrine, visita e contato com identidade Tolê Pará. |
| Design responsivo | Painéis animados com área de leitura entre cabeçalho e rodapé e rolagem interna quando necessário. |
| WhatsApp personalizado | Chamadas no cabeçalho e contato, mensagem inicial e configuração compartilhada. Número de TESTE autorizado: 5591999999999. |
| Elementos imersivos | Animação principal de scroll preservada em celular, tablet e computador: produto, parallax, transição verde, tipografia e indicador de progresso. Exceção: preferência de movimento reduzido do visitante. |
| Galeria personalizada conforme escopo | Vitrine modal acessível com a imagem aprovada já disponível. Sem fotos inventadas; expansão depende de fotos reais fornecidas pelo negócio. |
| Localização e horários conforme escopo | Mapa existente e chamada para planejar a visita. Endereço e horários aguardam dados reais. |
| SEO on-page avançado | Descrições específicas, hierarquia de títulos, metadados sociais, textos alternativos e JSON-LD do negócio com dados existentes. Canonical e sitemap final dependem do domínio real. Não há promessa de posicionamento. |
| Estratégia de conversão | Caminho apresentação → autosserviço → visita/contato, WhatsApp no cabeçalho, vitrine com chamada para visita e Instagram. Sem supor pedidos online. |
| Suporte prioritário na entrega | Proposta de condições abaixo, sujeita a aceite; não é funcionalidade exibida ao consumidor. |

## Proposta de suporte prioritário — a confirmar no aceite
- Canal proposto: WhatsApp do prestador, cujo contato será informado na contratação. O número de teste do site não é o canal de suporte.
- Primeira resposta proposta: até 1 dia útil, em dias úteis, considerando o horário de Brasília. Resposta não significa solução imediata.
- Período proposto: 7 dias corridos a partir da entrega aceita.
- Cobertura proposta: dúvidas de uso e correções de falhas nos recursos entregues. Novas páginas, integrações e alterações de escopo precisam de orçamento próprio.
Essas são condições propostas para tornar “prioritário” verificável, ainda sem aceite comercial. O preço R$ 360 foi informado pelo cliente; periodicidade, hospedagem e domínio não foram definidos.

## Canais e recursos delimitados
Links HTTPS para WhatsApp, Instagram e mapa; página estática com HTML/CSS/JS, sem bibliotecas adicionais. Não inclui API de mensagens, bot, catálogo de vendas, checkout, gestão de redes, analytics, hospedagem ou domínio contratados automaticamente.

## Pendências de produção
- Confirmar WhatsApp real: o número atual 91999999999 foi fornecido apenas para teste e recebeu o prefixo 55 do Brasil. Recebimento precisa ser verificado na conta do negócio e em dispositivos reais.
- Informar URL HTTPS definitiva para canonical, og:url, URLs absolutas de compartilhamento e JSON-LD e entradas do sitemap. sitemap.xml é esqueleto XML válido sem URLs; não submeter antes de preencher. robots.txt permite rastreamento.
- Informar endereço completo e horários. Confirmar titularidade e destino do mapa e Instagram herdados.
- Fornecer fotos reais caso se deseje ampliar a vitrine.
- Aceitar ou ajustar as condições de suporte prioritário e condições comerciais restantes.

## Validação
Scripts de verificação em verification/. Executar a partir da raiz. static.py verifica arquivos, links locais, HTTPS, dimensões, alt, h1, IDs, JSON-LD, XML e sintaxe JS (Pillow só foi usado durante a conversão das imagens; o site não depende dele). O teste browser.cjs usa o Chrome local em modo headless e servidor temporário, encerrados ao concluir. Resultados em verification/results.json quando executado com sucesso.

Os originais das imagens permanecem intactos. As versões exibidas foram convertidas para WebP. A imagem da vitrine corresponde exatamente à imagem de produto já presente, sem atribuir novos sabores, preços ou disponibilidade.

### Resultados desta revisão
- Chrome headless: 18 medições (três painéis em 360×800, 390×844, 768×1024, 1024×768, 1440×900 e 844×390). Animação principal mantida; sem overflow horizontal, imagens quebradas ou invasão das áreas fixas pelos painéis. Telas com conteúdo maior permitem rolagem interna.
- Nenhuma exceção JavaScript observada. Foco transferido ao destino da navegação. Galeria com foco interno e fechamento via Escape.
- Movimento reduzido: layout legível com todos os painéis acessíveis e nenhuma animação ativa. A preferência é aplicada ao carregar e ao mudar durante o uso.
- Inspeção visual de captura em 390×844 e ajuste de espaço entre logo e navegação.
- Imagens exibidas: 786.981 → 78.598 bytes (90% menores). Originais intactos.
- Limites: fonte externa indisponível foi simulada no teste, com fallback local; não foi validado recebimento no WhatsApp nem uso em aparelhos físicos ou leitor de tela. A conferência de links valida estrutura e destinos locais; titularidade dos serviços externos precisa ser confirmada.
