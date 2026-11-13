import { SnowflakeCrystal, Sparkle } from "./SnowflakeCrystal";

/** Filigrana de cristal para os cantos de painéis e cartas. */
export function CornerFiligree({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 76V30L30 4H76"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M4 54L26 32M4 40L15 29M26 32L32 26"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M26 32l5-8 5 8-5 8z"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.6"
      />
      <circle cx="30" cy="30" r="1.8" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

/** Ornamento de geada que abraça a moldura das fotos. */
export function CrystalCorner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 74V30L30 6H74"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M6 56L24 38M6 42L14 34M30 32L38 24M28 30L34 24"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M60 6 52 20 68 12ZM6 60l14-8-4 16Z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M34 34l6-6 6 6-6 6Z"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.7"
      />
      <circle cx="34" cy="34" r="2" fill="currentColor" />
    </svg>
  );
}

/** Divisor ornamental com floco central. */
export function FrostDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-glacier-500/60 sm:w-16" />
      <Sparkle size={9} className="text-glacier-500/80" />
      <SnowflakeCrystal size={16} className="text-glacier-600" />
      <Sparkle size={9} className="text-glacier-500/80" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-glacier-500/60 sm:w-16" />
    </div>
  );
}
