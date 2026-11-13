# Álbum Digital de Feliz Aniversário · Frozen

Experiência interativa inspirada no reino de gelo de Frozen, feita com **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion** e **Lucide React**.

## Como rodar

```bash
npm install
npm run dev      # ambiente de desenvolvimento
npm run build    # checagem de tipos + build de produção
npm run preview  # prévia do build
```

## Experiência

1. **Ato I — A Carta:** envelope azul em 3D com selo de cristal pulsante. Ao clicar, a aba gira em `rotateX`, o selo se rompe em estilhaços e a carta sobe com brilho mágico.
2. **Ato II — Avalanche Mágica:** uma cortina de gelo, flocos geométricos e brilhos varrem a tela e revelam o álbum.
3. **Ato III — O Álbum:** 14 páginas (capa, 12 memórias e celebração) com transições translúcidas, molduras de geada, mensagens em vidro fosco, navegação por cristais e progresso em flocos de neve. Uma trilha ambiente suave começa junto com o álbum e pode ser silenciada no cabeçalho.

## Onde personalizar

Todo o conteúdo editável está em **`src/data/content.ts`**, com comentários `💬 SUBSTITUA` e `🖼️ SUBSTITUA`:

- textos da carta de abertura e do botão mágico;
- nome de quem recebe, mensagens, assinaturas e datas;
- fotos das páginas — os arquivos ficam em **`public/photos/memoria-01.jpg` … `memoria-12.jpg`**, referenciados como `/photos/memoria-XX.jpg` (troque os arquivos mantendo os nomes ou aponte para qualquer URL pública);
- páginas do álbum: capa, doze memórias e celebração.

Para adicionar mais memórias, basta inserir outro objeto do tipo `"memory"` no array `pages` — a navegação e os indicadores se ajustam automaticamente.

## Extra em vídeo

A página final tem o botão **"Abrir o extra"**, que abre um painel de vidro com um vídeo (o áudio da trilha pausa enquanto ele está aberto e volta ao fechar). Enquanto não houver arquivo, o painel mostra um placeholder elegante.

1. Copie seu vídeo para **`public/video/`** (ex.: `extra.mp4`, H.264/AAC).
2. Em `src/data/content.ts`, no objeto `extraContent`, preencha `videoSrc: "/video/extra.mp4"` — e opcionalmente `poster` com uma imagem de capa.
3. Ajuste ali também os textos do botão, do título, da descrição e do placeholder (comentários `💬 SUBSTITUA` / `🎬 SUBSTITUA`).

## Trilha sonora

O arquivo **`public/audio/trilha-inverno.wav`** é uma faixa ambiente de 32 s em loop, sintetizada para este projeto (pads suaves e sinos de gelo). Para usar sua própria música, substitua o arquivo mantendo o nome ou ajuste o `src` do elemento `<audio>` em `src/App.tsx`. O volume faz fade-in ao iniciar a aventura, há botão de mudo no cabeçalho do álbum e o áudio para ao reiniciar.

## Personagens

As ilustrações de Frozen ficam em **`public/photos/personagens/`** (originais em PNG com fundo transparente) e são usadas pelo componente `src/components/Characters.tsx` em versões otimizadas **WebP** dentro de `public/personagens/`. Para trocar uma imagem, substitua o arquivo em `public/personagens/` mantendo o nome (`elsa`, `anna`, `olaf`, `bruni`, `sven`).

Onde cada um aparece: Elsa e Olaf na entrada, Olaf espiando no alto da carta, Bruni e Sven nos cantos da capa e o reino inteiro no rodapé da última página. O tamanho é controlado pela classe `w-[...]` de cada uso — todas as figuras são decorativas (`aria-hidden`) e não bloqueiam cliques.

Nomes disponíveis em `Characters.tsx` (basta usar `<Character name="..." className="w-[140px]" />`):

| nome | imagem |
| --- | --- |
| `elsa` | Elsa com redemoinhos de neve |
| `elsa-flocos` | Elsa em pé conjurando flocos |
| `elsa-corpo` | Elsa de corpo inteiro, vertical |
| `elsa-rosto` | retrato de Elsa (busto) |
| `anna` | Anna de corpo inteiro |
| `olaf` | Olaf em pé |
| `olaf-gelo` | Olaf inclinado entre flocos |
| `bruni` | Bruni, a salamandra |
| `sven` | Kristoff e Sven |
| `sven-brincando` | Sven deitado |
| `grupo` | Kristoff, Anna, Olaf e Sven em pé |
| `grupo-sentado` | o grupo reunido, versão horizontal |
| `grupo-largo` | o reino inteiro (Elsa, Anna, Kristoff, Sven e Olaf) |

## Estrutura

```
src/
├── App.tsx                        # orquestra carta → avalanche → álbum
├── data/content.ts                # textos e fotos (edite aqui)
├── index.css                      # tema, fontes, neve e geada
└── components/
    ├── EnvelopeIntro.tsx          # envelope 3D + selo + abertura
    ├── BirthdayLetter.tsx         # carta aberta + botão "Iniciar a aventura congelante"
    ├── AvalancheTransition.tsx    # transição cinematográfica
    ├── PhotoAlbum.tsx             # álbum, páginas e navegação
    ├── FrozenFrame.tsx            # moldura de gelo das fotos
    ├── Characters.tsx             # Elsa, Anna, Olaf, Bruni e Sven (PNG/WebP)
    ├── SnowfallBackground.tsx     # neve em parallax, aurora e estrelas
    ├── SoundToggle.tsx            # botão de som do cabeçalho
    ├── VideoExtra.tsx             # extra em vídeo (painel + placeholder)
    ├── SnowflakeCrystal.tsx       # SVGs de floco, faísca e gema hexagonal
    └── Ornaments.tsx              # filigranas e divisores
public/
├── photos/                        # fotos locais do álbum (originais dos personagens em photos/personagens)
├── personagens/                   # versões WebP usadas no site
├── audio/                         # trilha ambiente em loop
└── video/                         # vídeo do extra (LEIA-ME.txt)
```

O álbum é totalmente responsivo, aceita navegação por toque (deslizar), setas do teclado e respeita `prefers-reduced-motion`.
