import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkle, SnowflakeCrystal } from "./SnowflakeCrystal";
import { CrystalCorner } from "./Ornaments";

type Props = {
  src: string;
  alt: string;
  /** Legenda curta exibida sobre a foto (opcional). */
  caption?: string;
  className?: string;
};

export function FrozenFrame({ src, alt, caption, className = "" }: Props) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.12 }}
      className={`group relative ${className}`}
    >
      {/* halo de geada */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-[38px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.9),rgba(129,212,250,0.32)_55%,transparent_76%)] blur-xl"
      />

      <div className="relative rounded-[30px] border border-white/90 bg-[linear-gradient(140deg,rgba(255,255,255,0.98),rgba(196,234,250,0.72)_46%,rgba(255,255,255,0.9))] p-[9px] shadow-[0_34px_80px_-32px_rgba(17,72,104,0.7),inset_0_1px_0_rgba(255,255,255,1)] sm:p-[11px]">
        {/* moldura interna lapidada */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[21px] border border-white/80 bg-glacier-300">
          {/* fundo de segurança — visível enquanto a foto carrega ou se falhar */}
          <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(150deg,#e4f8ff,#a9ddf2_55%,#79c2df)]">
            <div className="flex flex-col items-center gap-3 text-white/70">
              <SnowflakeCrystal
                size={108}
                strokeWidth={1.3}
                withHexagon
                className="drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
              />
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/80">
                Memória congelada
              </span>
            </div>
          </div>

          {status !== "error" && (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              onLoad={() => setStatus("loaded")}
              onError={() => setStatus("error")}
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-out group-hover:scale-[1.03] ${
                status === "loaded"
                  ? "scale-100 opacity-100"
                  : "scale-105 opacity-0"
              }`}
            />
          )}

          {/* geada nas bordas */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_56px_rgba(255,255,255,0.55),inset_0_0_12px_rgba(224,247,250,0.9)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),transparent_16%,transparent_66%,rgba(202,239,251,0.72))]"
          />
          {/* canto facetado de gelo */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
          >
            <path d="M0 0 H26 L0 26 Z" fill="rgba(255,255,255,0.5)" />
            <path d="M100 0 H74 L100 26 Z" fill="rgba(255,255,255,0.38)" />
            <path d="M0 100 V74 L26 100 Z" fill="rgba(224,247,250,0.5)" />
            <path d="M100 100 V74 L74 100 Z" fill="rgba(224,247,250,0.42)" />
            <path
              d="M0 26 L26 0 M74 0 L100 26 M0 74 L26 100 M74 100 L100 74"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="0.5"
            />
          </svg>

          {/* brilho que percorre o vidro */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)]"
            animate={{ x: ["0%", "460%"] }}
            transition={{
              duration: 2.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 4.5,
            }}
          />

          {caption && (
            <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-full border border-white/40 bg-sapphire-900/30 px-3 py-1.5 backdrop-blur-md">
              <SnowflakeCrystal
                size={12}
                className="shrink-0 text-white drop-shadow"
              />
              <span className="truncate text-[9px] font-medium uppercase tracking-[0.22em] text-white/95 sm:text-[10px]">
                {caption}
              </span>
            </div>
          )}
        </div>

        {/* ornamentos de cristal nos cantos */}
        <CrystalCorner className="pointer-events-none absolute -left-3 -top-3 size-12 text-glacier-600/70 sm:size-16" />
        <CrystalCorner className="pointer-events-none absolute -right-3 -top-3 size-12 rotate-90 text-glacier-600/50 sm:size-16" />
        <CrystalCorner className="pointer-events-none absolute -bottom-3 -left-3 size-12 -rotate-90 text-glacier-600/50 sm:size-16" />
        <CrystalCorner className="pointer-events-none absolute -bottom-3 -right-3 size-12 rotate-180 text-glacier-600/70 sm:size-16" />

        {/* medalhão no topo da moldura */}
        <div className="absolute -top-4 left-1/2 grid size-9 -translate-x-1/2 place-items-center rounded-full border border-white/90 bg-[linear-gradient(150deg,#ffffff,#dff6fe_55%,#8fcfe9)] shadow-[0_6px_16px_-4px_rgba(17,72,104,0.55),inset_0_1px_3px_rgba(255,255,255,1)]">
          <SnowflakeCrystal size={18} strokeWidth={2} withHexagon className="text-glacier-700" />
        </div>
      </div>

      {/* faíscas ao redor */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 top-8 text-white drop-shadow-[0_0_8px_rgba(129,212,250,0.95)]"
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.15, 0.85] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkle size={14} />
      </motion.span>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -left-3 bottom-12 text-glacier-500/80"
        animate={{ opacity: [0.25, 0.85, 0.25], y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Sparkle size={10} />
      </motion.span>
    </motion.div>
  );
}
