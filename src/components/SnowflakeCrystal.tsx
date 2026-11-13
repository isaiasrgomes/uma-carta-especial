import { useId } from "react";

type SnowflakeProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
  /** Desenha um hexágono luminoso no centro (selo / botão mágico). */
  withHexagon?: boolean;
};

/**
 * Floco de neve geométrico de seis pontas — o cristal que assina toda a
 * identidade visual do álbum.
 */
export function SnowflakeCrystal({
  size = 40,
  className,
  strokeWidth = 2.2,
  withHexagon = false,
}: SnowflakeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {withHexagon ? (
        <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round">
          <path
            d="M0 -10 L9 -5 L9 5 L0 10 L-9 5 L-9 -5 Z"
            fill="currentColor"
            fillOpacity={0.16}
          />
          <circle r="2.6" fill="currentColor" stroke="none" />
        </g>
      ) : (
        <circle r="3.2" fill="currentColor" />
      )}

      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <g
          key={angle}
          transform={`rotate(${angle})`}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* haste principal */}
          <path d="M0 -13 L0 -46" />
          {/* galhos externos */}
          <path d="M0 -23 L-10 -31 M0 -23 L10 -31" />
          <path d="M0 -33 L-6 -39 M0 -33 L6 -39" />
          {/* ponta lapidada */}
          <path
            d="M0 -42.5 L-3.4 -46.5 L0 -49.5 L3.4 -46.5 Z"
            fill="currentColor"
            fillOpacity={0.28}
          />
        </g>
      ))}
    </svg>
  );
}

/** Faísca de quatro pontas, usada em brilhos e ornamentos. */
export function Sparkle({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 0c.5 6.4 5.1 11 11.5 11.5C17.1 12 12.5 16.6 12 23c-.5-6.4-5.1-11-11.5-11.5C6.9 11 11.5 6.4 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Gema hexagonal facetada, com brilho interno. */
export function HexagonGem({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const id = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-gem`} x1="8" y1="4" x2="32" y2="36">
          <stop stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#bdf0ff" />
          <stop offset="1" stopColor="#4fb6dd" />
        </linearGradient>
        <linearGradient id={`${id}-facet`} x1="20" y1="6" x2="20" y2="34">
          <stop stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#2b94bf" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <path
        d="M20 2.5 36 11.5v17L20 37.5 4 28.5v-17Z"
        fill={`url(#${id}-gem)`}
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M20 2.5 26.5 11.5 20 16 13.5 11.5Z"
        fill={`url(#${id}-facet)`}
        opacity="0.95"
      />
      <path d="M20 16 36 11.5 36 28.5 20 37.5Z" fill="#ffffff" opacity="0.16" />
      <path d="M20 16 4 11.5 4 28.5 20 37.5Z" fill="#2b94bf" opacity="0.08" />
      <path
        d="M20 16v21.5M13.5 20.5 4 11.5M26.5 20.5 36 11.5"
        stroke="#ffffff"
        strokeWidth="0.9"
        opacity="0.55"
      />
    </svg>
  );
}
