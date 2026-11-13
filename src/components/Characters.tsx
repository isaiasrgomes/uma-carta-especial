/**
 * 🖼️ PERSONAGENS
 * Ilustrações em PNG (fundo transparente) usadas como decoração do site.
 * Os arquivos originais ficam em `public/photos/personagens/`;
 * as versões otimizadas em WebP ficam em `public/personagens/`.
 *
 * Para trocar uma imagem, basta substituir o arquivo em `public/personagens/`.
 * O tamanho na tela é controlado pela classe `w-[...]` passada em `className`.
 */

export type CharacterName =
  | "elsa"
  | "elsa-flocos"
  | "elsa-corpo"
  | "elsa-rosto"
  | "anna"
  | "olaf"
  | "olaf-gelo"
  | "bruni"
  | "sven"
  | "sven-brincando"
  | "grupo"
  | "grupo-sentado"
  | "grupo-largo";

type Character = {
  src: string;
  /** proporção original, usada para evitar "pulos" de layout */
  width: number;
  height: number;
};

const CHARACTERS: Record<CharacterName, Character> = {
  elsa: { src: "/personagens/elsa.webp", width: 900, height: 724 },
  "elsa-flocos": { src: "/personagens/elsa-flocos.webp", width: 776, height: 742 },
  "elsa-corpo": { src: "/personagens/elsa-corpo.webp", width: 521, height: 1200 },
  "elsa-rosto": { src: "/personagens/elsa-rosto.webp", width: 760, height: 707 },
  anna: { src: "/personagens/anna.webp", width: 759, height: 1400 },
  olaf: { src: "/personagens/olaf.webp", width: 520, height: 681 },
  "olaf-gelo": { src: "/personagens/olaf-gelo.webp", width: 496, height: 659 },
  bruni: { src: "/personagens/bruni.webp", width: 520, height: 505 },
  sven: { src: "/personagens/sven.webp", width: 640, height: 567 },
  "sven-brincando": { src: "/personagens/sven-brincando.webp", width: 700, height: 529 },
  grupo: { src: "/personagens/grupo.webp", width: 533, height: 676 },
  "grupo-sentado": { src: "/personagens/grupo-sentado.webp", width: 1000, height: 1258 },
  "grupo-largo": { src: "/personagens/grupo-largo.webp", width: 1600, height: 1058 },
};

type Props = {
  name: CharacterName;
  /** use `w-[...]` para dimensionar — a altura acompanha a proporção */
  className?: string;
};

export function Character({ name, className = "" }: Props) {
  const character = CHARACTERS[name];

  return (
    <img
      src={character.src}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      loading="lazy"
      width={character.width}
      height={character.height}
      className={`pointer-events-none h-auto select-none ${className}`}
    />
  );
}
