import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import type { PanInfo, Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Play,
  Quote,
  RotateCcw,
} from "lucide-react";
import {
  extraContent,
  pages,
  type AlbumPage,
  type CoverPage,
  type FinalePage,
  type MemoryPage,
} from "../data/content";
import { Character } from "./Characters";
import { FrozenFrame } from "./FrozenFrame";
import { SoundToggle } from "./SoundToggle";
import { VideoExtra } from "./VideoExtra";
import { FrostDivider, CornerFiligree } from "./Ornaments";
import { SnowflakeCrystal, Sparkle } from "./SnowflakeCrystal";

/* ══════════════════════════════════════════════════════════════════════════
   ÁLBUM — as páginas e seus textos vivem em src/data/content.ts
   ══════════════════════════════════════════════════════════════════════════ */

/* Só transform/opacity aqui: animar `filter: blur()` numa página inteira
   com backdrop-blur obriga a GPU a re-renderizar a cada frame. */
const pageVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 64 : -64,
    scale: 0.985,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 210,
      damping: 28,
      mass: 0.7,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -46 : 46,
    scale: 0.99,
    transition: { duration: 0.22, ease: "easeIn" },
  }),
};

function PageFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[30px] border border-white/80 bg-[linear-gradient(158deg,rgba(255,255,255,0.84),rgba(240,252,255,0.66)_45%,rgba(203,238,252,0.56))] shadow-[0_30px_70px_-40px_rgba(18,74,105,0.6),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl ${className}`}
    >
      <div
        aria-hidden="true"
        className="crystal-texture pointer-events-none absolute inset-0 opacity-[0.12]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[8px] rounded-[23px] border border-white/55"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-24 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.7),transparent_70%)]"
      />

      <CornerFiligree className="pointer-events-none absolute left-4 top-4 size-11 text-glacier-600/40 sm:size-14" />
      <CornerFiligree className="pointer-events-none absolute right-4 top-4 size-11 rotate-90 text-glacier-600/30 sm:size-14" />
      <CornerFiligree className="pointer-events-none absolute bottom-4 left-4 size-11 -rotate-90 text-glacier-600/30 sm:size-14" />
      <CornerFiligree className="pointer-events-none absolute bottom-4 right-4 size-11 rotate-180 text-glacier-600/40 sm:size-14" />

      <div className="relative">{children}</div>
    </div>
  );
}

/* ── Capa interna ──────────────────────────────────────────────────────── */

function CoverPageView({ page }: { page: CoverPage }) {
  const reduceMotion = useReducedMotion();

  return (
    <PageFrame>
      <div className="relative overflow-hidden px-5 py-12 text-center sm:px-14 sm:py-16">
        <SnowflakeCrystal
          size={560}
          strokeWidth={0.8}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-glacier-500/[0.08]"
        />
        {/* Elsa como marca d'água gelada na capa */}
        {/* Bruni espia no canto esquerdo */}
        <Character
          name="bruni"
          className="pointer-events-none absolute left-3 bottom-4 w-[58px] sm:left-5 sm:bottom-6 sm:w-[76px]"
        />
        {/* Sven acompanha a capa no canto oposto */}
        <Character
          name="sven"
          className="pointer-events-none absolute -right-2 bottom-2 w-[124px] sm:-right-3 sm:bottom-3 sm:w-[168px]"
        />

        {/* Emblema central giratório */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="relative mx-auto mb-7 size-36 sm:mb-9 sm:size-44"
        >
          <div className="halo-breathe absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(129,212,250,0.5),transparent_70%)] blur-xl" />

          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-glacier-500/50"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-glacier-500">
              <SnowflakeCrystal size={16} />
            </span>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-glacier-600/70">
              <SnowflakeCrystal size={12} />
            </span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-glacier-500">
              <SnowflakeCrystal size={14} />
            </span>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 text-glacier-600/70">
              <SnowflakeCrystal size={11} />
            </span>
          </motion.div>

          <motion.div
            className="absolute inset-4 rounded-full border border-white/80"
            animate={reduceMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute left-0 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]" />
            <span className="absolute right-0 top-1/2 size-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-glacier-300 shadow-[0_0_10px_rgba(129,212,250,1)]" />
          </motion.div>

          <div className="absolute inset-6 grid place-items-center rounded-full border border-white/90 bg-[radial-gradient(circle_at_35%_28%,#ffffff,rgba(224,247,250,0.95)_45%,rgba(179,229,252,0.8))] shadow-[inset_0_2px_14px_rgba(255,255,255,1),0_20px_45px_-18px_rgba(21,84,120,0.65)]">
            <SnowflakeCrystal
              size={88}
              strokeWidth={1.7}
              withHexagon
              className="text-glacier-700 drop-shadow-[0_0_24px_rgba(129,212,250,0.9)]"
            />
          </div>

          <Sparkle
            size={16}
            className="absolute -right-1 top-2 text-white drop-shadow-[0_0_10px_rgba(129,212,250,1)]"
          />
          <Sparkle
            size={10}
            className="absolute -left-2 bottom-4 text-glacier-400"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="relative text-[9px] uppercase tracking-[0.45em] text-glacier-700 sm:text-[10px]"
        >
          {page.chapter}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.7, ease: "easeOut" }}
          className="relative mt-3 bg-[linear-gradient(180deg,#2f7fa6_0%,#185677_55%,#0b2740_100%)] bg-clip-text font-display text-[2rem] leading-[1.12] font-semibold tracking-wide text-transparent sm:text-5xl"
        >
          {page.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative mx-auto mt-4 max-w-sm text-[12.5px] leading-relaxed text-sapphire-600/85 sm:text-sm"
        >
          {page.subtitle}
        </motion.p>

        <FrostDivider className="relative my-6" />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative font-display text-base text-sapphire-800 sm:text-lg"
        >
          {page.name}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative mx-auto mt-2 max-w-xs text-[11.5px] italic leading-relaxed text-sapphire-500/80 sm:text-xs"
        >
          {page.note}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="relative mt-8 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/40 px-4 py-2 text-[9px] uppercase tracking-[0.32em] text-glacier-700 shadow-sm backdrop-blur-md sm:text-[10px]"
        >
          Vire a página
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { x: [0, 3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronsRight className="size-3.5" />
          </motion.span>
        </motion.div>
      </div>
    </PageFrame>
  );
}

/* ── Página de memória ─────────────────────────────────────────────────── */

function MemoryPageView({ page }: { page: MemoryPage }) {
  return (
    <PageFrame>
      <div className="px-4 py-7 sm:px-9 sm:py-10">
        <div className="mx-auto max-w-2xl">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 px-1">
            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-glacier-700 sm:text-[10px]">
                {page.chapter}
              </p>
              <h2 className="mt-1 font-display text-[1.35rem] leading-tight font-semibold text-sapphire-900 sm:text-3xl">
                {page.title}
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/55 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-sapphire-600 shadow-sm backdrop-blur-md sm:text-[10px]">
              <SnowflakeCrystal size={11} className="text-glacier-600" />
              {page.date}
            </span>
          </div>

          <FrozenFrame
            src={page.photo}
            alt={page.photoAlt}
            caption={page.caption}
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
            className="relative mt-6 overflow-hidden rounded-[22px] border border-white/80 bg-white/45 p-5 shadow-[0_20px_50px_-30px_rgba(17,72,104,0.6),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md sm:p-7"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),transparent_70%)] blur-md"
            />
            <Quote
              className="size-7 text-glacier-400/80"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="relative mt-2 text-[13.5px] italic leading-relaxed text-sapphire-700/90 sm:text-[15px]">
              {page.message}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-glacier-400/70 to-transparent" />
              <SnowflakeCrystal size={13} className="text-glacier-500/80" />
            </div>
            <p className="mt-3 text-right font-display text-[12.5px] text-glacier-700 sm:text-sm">
              {page.signature}
            </p>
          </motion.div>
        </div>
      </div>
    </PageFrame>
  );
}

/* ── Página de celebração ──────────────────────────────────────────────── */

function FinalePageView({
  page,
  onRestart,
  onOpenExtra,
}: {
  page: FinalePage;
  onRestart: () => void;
  onOpenExtra: () => void;
}) {
  const reduceMotion = useReducedMotion();

  const sparkles = [
    { left: "12%", top: "22%", size: 12, delay: 0 },
    { left: "85%", top: "18%", size: 9, delay: 0.8 },
    { left: "20%", top: "72%", size: 8, delay: 1.6 },
    { left: "78%", top: "68%", size: 13, delay: 0.4 },
    { left: "50%", top: "12%", size: 7, delay: 2 },
  ];

  return (
    <PageFrame>
      <div className="relative overflow-hidden px-5 pt-12 pb-28 text-center sm:px-12 sm:pt-16 sm:pb-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,rgba(255,255,255,0.95),rgba(224,247,250,0.4)_45%,transparent_72%)]"
        />

        <SnowflakeCrystal
          size={600}
          strokeWidth={0.7}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-glacier-500/[0.09]"
        />

        {sparkles.map((sparkle, index) => (
          <motion.span
            key={index}
            aria-hidden="true"
            className="pointer-events-none absolute text-white drop-shadow-[0_0_10px_rgba(129,212,250,1)]"
            style={{ left: sparkle.left, top: sparkle.top }}
            animate={
              reduceMotion
                ? undefined
                : { opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8], y: [0, -8, 0] }
            }
            transition={{
              duration: 4 + index * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: sparkle.delay,
            }}
          >
            <Sparkle size={sparkle.size} />
          </motion.span>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 75, damping: 14 }}
          className="relative mx-auto mb-6 grid size-32 place-items-center sm:size-40"
        >
          <div className="halo-breathe absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.98),rgba(129,212,250,0.55),transparent_72%)] blur-xl" />
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-glacier-400/60"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          />
          <SnowflakeCrystal
            size={104}
            strokeWidth={1.6}
            withHexagon
            className="relative text-glacier-700 drop-shadow-[0_0_30px_rgba(129,212,250,0.95)]"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="relative text-[9px] uppercase tracking-[0.45em] text-glacier-700 sm:text-[10px]"
        >
          {page.chapter}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.7, ease: "easeOut" }}
          className="relative mt-2 bg-[linear-gradient(180deg,#2f7fa6_0%,#185677_55%,#0b2740_100%)] bg-clip-text font-display text-[1.9rem] leading-[1.15] font-semibold tracking-wide text-transparent sm:text-5xl"
        >
          {page.title}
        </motion.h2>

        <FrostDivider className="relative my-6" />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.6 }}
          className="relative mx-auto max-w-lg text-[13px] leading-relaxed text-sapphire-700/90 sm:text-[14.5px]"
        >
          {page.message}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="relative mt-5 font-display text-sm text-glacier-700 sm:text-base"
        >
          {page.signature}
        </motion.p>

        {/* Presente extra: abre o vídeo no fim do álbum */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.6 }}
          className="relative mt-8 flex flex-col items-center"
        >
          <motion.button
            type="button"
            onClick={onOpenExtra}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-glacier-300/70 bg-[linear-gradient(135deg,#2f7fa6,#1b6b93_52%,#124a68)] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white shadow-[0_18px_44px_-18px_rgba(12,62,88,0.9),inset_0_1px_0_rgba(255,255,255,0.35)] transition-shadow hover:shadow-[0_24px_56px_-18px_rgba(21,120,164,0.95)]"
          >
            <span
              aria-hidden="true"
              className="frost-sweep pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-90"
            />
            <Play className="relative size-3.5 fill-current text-white/90" />
            <span className="relative">{extraContent.ctaLabel}</span>
          </motion.button>
          <p className="mt-2.5 text-[8px] uppercase tracking-[0.32em] text-glacier-700/70 sm:text-[9px]">
            {extraContent.ctaEyebrow}
          </p>
        </motion.div>

        <motion.button
          type="button"
          onClick={onRestart}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.66, duration: 0.6 }}
          className="group relative mt-4 inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(224,247,250,0.75)_55%,rgba(160,220,244,0.6))] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-sapphire-800 shadow-[0_16px_40px_-20px_rgba(21,84,120,0.7),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-md transition-shadow hover:shadow-[0_22px_55px_-20px_rgba(21,120,164,0.8)]"
        >
          <span
            aria-hidden="true"
            className="frost-sweep pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-90"
          />
          <RotateCcw className="relative size-3.5 text-glacier-700 transition-transform duration-500 group-hover:-rotate-180" />
          <span className="relative">Reviver a magia</span>
        </motion.button>

        <p className="relative mt-4 text-[8.5px] uppercase tracking-[0.32em] text-glacier-700/60 sm:text-[9px]">
          De volta à primeira nevasca
        </p>

        {/* O reino inteiro fecha a festa no rodapé da página */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.9, ease: "easeOut" }}
          className="relative mx-auto -mb-12 mt-7 w-full max-w-[330px] sm:-mb-16 sm:mt-9 sm:max-w-[560px]"
        >
          <Character
            name="grupo-largo"
            className="w-full drop-shadow-[0_18px_28px_rgba(21,84,120,0.18)]"
          />
        </motion.div>
      </div>
    </PageFrame>
  );
}

/* ── Navegação ─────────────────────────────────────────────────────────── */

function NavButton({
  dir,
  label,
  onClick,
  disabled,
}: {
  dir: "prev" | "next";
  label: string;
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="group relative flex items-center gap-2 overflow-hidden rounded-2xl border border-white/80 bg-white/45 px-3 py-3 text-sapphire-700 shadow-[0_14px_34px_-20px_rgba(21,84,120,0.7),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/70 hover:shadow-[0_18px_40px_-18px_rgba(21,120,164,0.65)] disabled:pointer-events-none disabled:opacity-35 sm:px-4"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/90"
      />
      <Icon
        className={`size-4 shrink-0 transition-transform duration-300 ${
          dir === "prev"
            ? "group-hover:-translate-x-0.5"
            : "group-hover:translate-x-0.5"
        }`}
      />
      <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] sm:inline">
        {label}
      </span>
    </button>
  );
}

/* ── Álbum completo ────────────────────────────────────────────────────── */

export function PhotoAlbum({
  onRestart,
  soundOn,
  onToggleSound,
  onExtraOpenChange,
}: {
  onRestart: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
  /** Avisa o App para dar espaço ao áudio do vídeo enquanto o extra está aberto. */
  onExtraOpenChange?: (open: boolean) => void;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [extraOpen, setExtraOpen] = useState(false);
  const page = pages[index];

  const setExtra = useCallback(
    (open: boolean) => {
      setExtraOpen(open);
      onExtraOpenChange?.(open);
    },
    [onExtraOpenChange],
  );

  const go = useCallback((delta: number) => {
    setIndex((current) => {
      const next = Math.min(pages.length - 1, Math.max(0, current + delta));
      if (next !== current) setDirection(delta);
      return next;
    });
  }, []);

  const goTo = useCallback((target: number) => {
    setIndex((current) => {
      if (target === current) return current;
      setDirection(target > current ? 1 : -1);
      return target;
    });
  }, []);

  useEffect(() => {
    if (extraOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [extraOpen, go]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -70) go(1);
    else if (info.offset.x > 70) go(-1);
  };

  const renderPage = (albumPage: AlbumPage) => {
    switch (albumPage.type) {
      case "cover":
        return <CoverPageView page={albumPage} />;
      case "memory":
        return <MemoryPageView page={albumPage} />;
      case "finale":
        return (
          <FinalePageView
            page={albumPage}
            onRestart={onRestart}
            onOpenExtra={() => setExtra(true)}
          />
        );
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative min-h-svh px-3.5 py-7 sm:px-6 sm:py-12"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col">
        {/* Cabeçalho do álbum */}
        <header className="mb-5 flex items-center justify-between gap-3 px-1 sm:mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="grid size-10 place-items-center rounded-2xl border border-white/80 bg-white/50 shadow-[0_10px_24px_-14px_rgba(21,84,120,0.8),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-md sm:size-12"
              whileHover={{ rotate: 30 }}
              transition={{ type: "spring", stiffness: 150, damping: 12 }}
            >
              <SnowflakeCrystal
                size={21}
                withHexagon
                className="text-glacier-700 sm:size-[24px]"
              />
            </motion.div>
            <div>
              <p className="text-[8px] uppercase tracking-[0.42em] text-glacier-700 sm:text-[9px]">
                Arendelle
              </p>
              <h2 className="font-display text-sm leading-tight font-semibold text-sapphire-900 sm:text-lg">
                Álbum de Memórias
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-white/80 bg-white/45 px-3 py-1.5 shadow-[0_8px_20px_-14px_rgba(21,84,120,0.8)] backdrop-blur-md sm:inline-flex sm:px-4 sm:py-2">
              <Sparkle size={10} className="text-glacier-600" />
              <span className="text-[8px] font-semibold uppercase tracking-[0.24em] text-sapphire-600 sm:text-[9px]">
                Feliz Aniversário
              </span>
            </div>
            <SoundToggle on={soundOn} onToggle={onToggleSound} />
          </div>
        </header>

        {/* Página atual */}
        <div className="relative" style={{ perspective: 1600 }}>
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={page.id}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              dragSnapToOrigin
              onDragEnd={handleDragEnd}
              className="relative touch-pan-y rounded-[30px] will-change-transform"
            >
              {renderPage(page)}

              {/* véu de geada na troca de página */}
              <span className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-[30px]">
                <motion.span
                  aria-hidden="true"
                  className="frost-sweep absolute inset-y-0 -left-2/3 w-2/3 -skew-x-6"
                  initial={{ x: "0%", opacity: 0 }}
                  animate={{ x: "270%", opacity: [0, 0.9, 0] }}
                  transition={{ duration: 1.15, ease: "easeInOut" }}
                />
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navegação */}
        <nav
          aria-label="Navegação do álbum"
          className="mt-5 flex items-center justify-between gap-2 sm:mt-6"
        >
          <NavButton
            dir="prev"
            label="Página anterior"
            onClick={() => go(-1)}
            disabled={index === 0}
          />

          <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5 px-1">
            <div className="flex flex-wrap items-center justify-center gap-0.5 sm:gap-1">
              {pages.map((albumPage, pageIndex) => {
                const active = pageIndex === index;
                return (
                  <button
                    key={albumPage.id}
                    type="button"
                    onClick={() => goTo(pageIndex)}
                    aria-label={`Ir para a página ${pageIndex + 1}`}
                    aria-current={active ? "step" : undefined}
                    className="group relative grid size-7 place-items-center rounded-full transition-colors sm:size-9"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-1 rounded-full transition-all duration-400 ${
                        active
                          ? "scale-100 bg-white/75 opacity-100 ring-1 ring-glacier-400/70 shadow-[0_0_18px_rgba(129,212,250,0.9)]"
                          : "scale-75 bg-white/40 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                    <SnowflakeCrystal
                      size={active ? 18 : 13}
                      strokeWidth={active ? 2.2 : 1.8}
                      withHexagon={active}
                      className={`relative transition-all duration-300 ${
                        active
                          ? "scale-110 text-glacier-700 drop-shadow-[0_0_8px_rgba(129,212,250,0.9)]"
                          : pageIndex < index
                            ? "text-glacier-600/70"
                            : "text-glacier-500/35 group-hover:text-glacier-600/60"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-[8px] uppercase tracking-[0.32em] text-glacier-700/75 sm:text-[9px]">
              Página{" "}
              <span className="font-semibold text-sapphire-800">
                {String(index + 1).padStart(2, "0")}
              </span>{" "}
              / {String(pages.length).padStart(2, "0")}
            </span>
          </div>

          <NavButton
            dir="next"
            label="Próxima página"
            onClick={() => go(1)}
            disabled={index === pages.length - 1}
          />
        </nav>

        <p className="mt-4 text-center text-[8px] uppercase tracking-[0.3em] text-glacier-700/55 sm:text-[9px]">
          Deslize ou use as setas ← →
        </p>
      </div>

      <VideoExtra open={extraOpen} onClose={() => setExtra(false)} />
    </motion.section>
  );
}
