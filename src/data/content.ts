/* ══════════════════════════════════════════════════════════════════════════
   CONTEÚDO EDITÁVEL — troque aqui os textos e as fotos do álbum.
   Tudo o que está entre colchetes é um espaço reservado ([Nome], [Seu nome]…).
   ══════════════════════════════════════════════════════════════════════════ */

export type LetterContent = {
  eyebrow: string;
  title: string;
  salutation: string;
  paragraphs: string[];
  signature: string;
  ctaEyebrow: string;
  ctaLabel: string;
};

export const letterContent: LetterContent = {
  eyebrow: "Uma carta de Arendelle",
  title: "Feliz Aniversário",
  // 💬 SUBSTITUA: nome de quem recebe a carta
  salutation: "Querida Isadora,",
  // 💬 SUBSTITUA: as mensagens abaixo pelos seus textos de aniversário
  paragraphs: [
    "Existe um lugar onde o inverno não é frio — é doce, luminoso e guarda memórias incríveis. Hoje, esse lugar existe em você.",
    "Então, aqueça o seu coração e prepare-se para esta humilde representação de carinho neste dia tão especial!  "
    
  ],
  signature: "Com todo o meu amor, Isaias",
  ctaEyebrow: "O portal está aberto",
  // O texto abaixo é pedido pela especificação e deve permanecer exato
  ctaLabel: "Iniciar a aventura congelante",
};

export type CoverPage = {
  type: "cover";
  id: string;
  chapter: string;
  title: string;
  subtitle: string;
  name: string;
  note: string;
};

export type MemoryPage = {
  type: "memory";
  id: string;
  chapter: string;
  title: string;
  date: string;
  /** 🖼️ SUBSTITUA: caminho da foto em public/photos (ou URL/ base64) */
  photo: string;
  photoAlt: string;
  caption: string;
  /** 💬 SUBSTITUA: mensagem especial da lembrança */
  message: string;
  signature: string;
};

export type FinalePage = {
  type: "finale";
  id: string;
  chapter: string;
  title: string;
  message: string;
  signature: string;
};

export type AlbumPage = CoverPage | MemoryPage | FinalePage;

/* ══════════════════════════════════════════════════════════════════════════
   EXTRA — o presente escondido no fim do álbum (um vídeo).
   Quando `videoSrc` estiver vazio, o extra mostra apenas o placeholder.
   ══════════════════════════════════════════════════════════════════════════ */

export type ExtraContent = {
  /** 💬 SUBSTITUA: chamada do botão que abre o extra, na página final */
  ctaLabel: string;
  ctaEyebrow: string;
  /** 💬 SUBSTITUA: título do painel do vídeo */
  title: string;
  /** 💬 SUBSTITUA: descrição exibida acima do vídeo */
  description: string;
  /**
   * 🎬 SUBSTITUA: caminho do vídeo (ex.: "/video/extra.mp4", coloque o arquivo
   * em public/video). Deixe "" para exibir somente o placeholder.
   */
  videoSrc: string;
  /** 🖼️ SUBSTITUA: imagem de capa opcional do vídeo (ex.: "/photos/capa-video.jpg") */
  poster: string;
  placeholderTitle: string;
  placeholderNote: string;
};

export const extraContent: ExtraContent = {
  ctaEyebrow: "uma coisa muito séria",
  ctaLabel: "Abrir o extra",
  title: "",
  description:
    "",
  videoSrc: "/video/extra.mp4",
  poster: "",
  placeholderTitle: "Vídeo a caminho",
  placeholderNote:
    "Coloque o arquivo em public/video/extra.mp4 e preencha videoSrc em src/data/content.ts para o vídeo aparecer aqui.",
};

export const pages: AlbumPage[] = [
  {
    type: "cover",
    id: "capa",
    chapter: "",
    title: "Memórias Congeladas",
    subtitle:
      "Um álbum encantado para celebrar a pessoa mais mágica de Arendelle.",
    // 💬 SUBSTITUA: nome de quem faz aniversário
    name: "",
    note: "Cada página guarda um floco que nunca vai derreter.",
  },
  {
    type: "memory",
    id: "memoria-1",
    chapter: "Memória I",
    title: "Onde tudo começou",
    date: "Dorinha bebê",
    photo:
      "/photos/memoria-01.jpg",
    photoAlt: "",
    caption: "",
    message:
      "Essa é a história de uma garotinha que, ainda não sabia, mas teria um futuro brilhante assim como o cristal gélido do mais alto ponto de Arendelle. Essa é a nossa princesinha no início de sua vida, fazendoo seu biquinho fofinho que encantaria a todos que presenciaram tal feito.",
    signature: "",
  },
  {
    type: "memory",
    id: "memoria-2",
    chapter: "Memória II",
    title: "Sorrisos que aquecem",
    // 💬 SUBSTITUA: data ou ocasião da foto
    date: "Dorinha bebê",
    // 🖼️ SUBSTITUA: segunda foto de recordação
    photo:
      "/photos/memoria-02.jpg",
    photoAlt: "",
    // 💬 SUBSTITUA: legenda curta exibida sobre a moldura
    caption: "",
    // 💬 SUBSTITUA: mensagem especial desta foto
    message:
      "A nossa princesinha foi crescendo e continuou sendo sapeca, sempre agitada e um amorzinho. Esse seu sorrisinho meigo e escondido carregava a essencia de uma menina que viria a contagiar a vida de todas as pessoas ao seu redor.",
    signature: "",
  },
  /* ══════════════════════════════════════════════════════════════════════
     MEMÓRIAS EXTRAS — acrescente, remova ou reordene páginas à vontade.
     A navegação e o contador se ajustam sozinhos à quantidade de páginas.
     ══════════════════════════════════════════════════════════════════════ */
  {
    type: "memory",
    id: "memoria-3",
    chapter: "Memória III",
    title: "O dia",
    date: "14 de Dez. 2025",
    photo:
      "/photos/memoria-03.jpg",
    photoAlt: "",
    caption: "",
    message:
      "Com um salto enorme no tempo, a princesinha conheceria o seu principe - que não é perfeito, mas faz o possivel para ser. Esse dia foi muito importante na vida desse principe, pois ele não tinha duvida alguma de que aquela princesa seria o grande amor da sua vida.",
    signature: "",
  },
  {
    type: "memory",
    id: "memoria-4",
    chapter: "Memória IV",
    title: "As loucuras da princesa",
    date: "dorinha doidinha",
    photo:
      "/photos/memoria-04.jpg",
    photoAlt: "",
    caption: "",
    message:
      "A princesinha tem uma característica que faz ela ser única: ela não deixa de ser feliz por conta de ninguém. Quando ela se solta, é a pessoa mais maluca do mundo, e, mesmo assim continua sendo incrível [O princípe ama demais o jeitinho lelé da cuca da princesa].",
    signature: "",
  },
  {
    type: "memory",
    id: "memoria-5",
    chapter: "Memória V",
    title: "Feitos um pro outro",
    date: "O par perfeito",
    photo:
      "/photos/memoria-05.jpg",
    photoAlt: "",
    caption: "",
    message:
      "Em seu pouco tempo juntos, os dois já viveram aventuras extravagantes que aumentaram a sua sinergia e o seu amor recíproco. O principe não fica um dia sem amar a princesa, pois seu mundo é melhor com ela. Parece um sonho, mas ambos sabem e sentem que é real.",
    signature: "",
  },
  {
    type: "memory",
    id: "memoria-6",
    chapter: "Memória VI",
    title: "Tempestade de brilho",
    date: "7 de set. de 2026",
    photo:
      "/photos/memoria-06.jpg",
    photoAlt: "",
    caption: "",
    message:
      "Por onde passa, a princesinha encanta a todos com o seu lindo vestido brilhante, sua coroa encantada e o seu cajado luminoso. As crianças comparam-na à rainha Elsa, mas mal sabem elas que a Elsa aprendeu tudo o que sabe com a nossa princesinha.",
    signature: "",
  },
  {
    type: "memory",
    id: "memoria-7",
    chapter: "Memória Futura I",
    title: "O Poder do inverno",
    date: "A Rainha",
    photo:
      "/photos/memoria-07.jpg",
    photoAlt: "",
    caption: "",
    message:
      "E finalmente a nossa princesinha está muito perto de realizar o seu sonho! Sua vestimenta real agora é outra. Sua farda negra exala o poder que a nossa rainha carrega dentro de si. Esse é o futuro da nossa rainha...",
    signature: "",
  },
  {
    type: "memory",
    id: "memoria-8",
    chapter: "Memória Futura II",
    title: "Família",
    date: "Sua sorte talvez Tenha o número 3",
    photo:
      "/photos/memoria-08.jpg",
    photoAlt: "",
    caption: "",
    message:
      "...mas não quer dizer que será o ápice da vida da rainha. Talvez, uma próxima princesinha venha a completar a vida do casal real. Quem sabe um principezinho? Veremos nos próximos capitulos dessa história que nunca findará!",
    signature: "",
  },
  {
    type: "finale",
    id: "celebracao",
    chapter: "",
    // 💬 SUBSTITUA: nome de quem faz aniversário
    title: "Parabéns, Isadora!",
    // 💬 SUBSTITUA: mensagem de encerramento
    message:
      "Que Deus continue a encher a sua vida de bençãos e realizações! Nunca deixe sua essência desaparecer, pois nunca haverá outra pessoa igual ou no mínimo parecida com você no mundo. Eu te amo hoje, amanhã e sempre continuarei te amando! A seguir, vem uma coisa muito séria para você ver.",
      
    signature: "Com amor, Isaias",
  },
];
