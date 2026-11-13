import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { letterContent } from "../data/content";
import { Character } from "./Characters";
import { CornerFiligree } from "./Ornaments";
import { HexagonGem, SnowflakeCrystal, Sparkle } from "./SnowflakeCrystal";

type Props = {
  onStart: () => void;
};

export function BirthdayLetter({ onStart }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 110, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 95, damping: 20, mass: 0.95 }}
      className="relative w-full max-w-2xl will-change-transform"
    >
      {/* Brilho que nasce atrás do papel ao sair do envelope */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 rounded-[48px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95),rgba(129,212,250,0.4)_45%,transparent_72%)] blur-2xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Olaf espia por cima da carta */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.8, ease: "easeOut" }}
        className="pointer-events-none absolute -top-14 right-1 z-10 w-[72px] sm:-top-20 sm:right-6 sm:w-[96px]"
      >
        <Character name="olaf-gelo" className="w-full drop-shadow-[0_10px_20px_rgba(21,84,120,0.25)]" />
      </motion.div>

      <div className="relative overflow-hidden rounded-[30px] border border-white/80 bg-[linear-gradient(155deg,rgba(255,255,255,0.82),rgba(240,252,255,0.7)_42%,rgba(205,239,252,0.62))] px-5 py-10 shadow-[0_40px_120px_-38px_rgba(21,84,120,0.65),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl sm:px-12 sm:py-14">
        {/* textura de papel gelado */}
        <div
          aria-hidden="true"
          className="crystal-texture pointer-events-none absolute inset-0 opacity-[0.16]"
        />
        {/* veios diagonais de cristal */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40 [background:repeating-linear-gradient(115deg,transparent_0px,transparent_46px,rgba(255,255,255,0.5)_47px,transparent_48px)]"
        />
        {/* borda interna luminosa */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[7px] rounded-[24px] border border-white/60"
        />


        {/* filigranas nos cantos */}
        <CornerFiligree className="pointer-events-none absolute left-4 top-4 size-12 text-glacier-600/45 sm:size-16" />
        <CornerFiligree className="pointer-events-none absolute right-4 top-4 size-12 rotate-90 text-glacier-600/35 sm:size-16" />
        <CornerFiligree className="pointer-events-none absolute bottom-4 left-4 size-12 -rotate-90 text-glacier-600/35 sm:size-16" />
        <CornerFiligree className="pointer-events-none absolute bottom-4 right-4 size-12 rotate-180 text-glacier-600/45 sm:size-16" />

        <div className="relative">
          {/* Medalhão com selo de gelo */}
          <div className="relative mx-auto grid size-16 place-items-center sm:size-20">
            <div className="halo-breathe absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(129,212,250,0.45),transparent_70%)] blur-md" />
            <div className="relative grid size-full place-items-center rounded-full border border-white/90 bg-[linear-gradient(150deg,#ffffff,#e3f7ff_55%,#b7e3f6)] shadow-[inset_0_2px_10px_rgba(255,255,255,0.95),0_14px_30px_-10px_rgba(35,113,158,0.55)] ring-1 ring-glacier-300/70">
              <SnowflakeCrystal
                size={40}
                strokeWidth={1.9}
                withHexagon
                className="text-glacier-700"
              />
            </div>
            <Sparkle
              size={13}
              className="absolute -right-1 -top-1 text-white drop-shadow-[0_0_6px_rgba(129,212,250,1)]"
            />
            <Sparkle
              size={9}
              className="absolute -bottom-2 left-0 text-glacier-400"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
          >
            <p className="mt-6 text-center text-[10px] uppercase tracking-[0.42em] text-glacier-700 sm:text-[11px]">
              {letterContent.eyebrow}
            </p>

            <h1 className="mt-3 bg-[linear-gradient(180deg,#2f7fa6_0%,#185677_55%,#0b2740_100%)] bg-clip-text text-center font-display text-[2rem] leading-[1.12] font-semibold tracking-wide text-transparent drop-shadow-[0_1px_0_rgba(255,255,255,0.7)] sm:text-5xl">
              {letterContent.title}
            </h1>

            <div className="mx-auto mt-4 flex max-w-[220px] items-center justify-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-glacier-500/70" />
              <SnowflakeCrystal size={15} className="text-glacier-600" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-glacier-500/70" />
            </div>

            <p className="mt-6 font-display text-base text-sapphire-800 sm:text-lg">
              {letterContent.salutation}
            </p>

            <div className="mt-3 space-y-4 text-[13.5px] leading-relaxed text-sapphire-700/90 sm:text-[15px]">
              {letterContent.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <p className="mt-6 text-right font-display text-[13px] tracking-wide text-glacier-700 sm:text-sm">
              {letterContent.signature}
            </p>
          </motion.div>

          {/* ── GATILHO MÁGICO ─────────────────────────────────────────────
              Floco de neve + hexágono luminoso. Texto exato definido em
              letterContent.ctaLabel. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: "easeOut" }}
            className="mt-8"
          >
            <motion.button
              type="button"
              onClick={onStart}
              whileHover="hover"
              whileTap={{ scale: 0.975 }}
              className="group relative mx-auto flex w-full max-w-[420px] items-center gap-3 overflow-hidden rounded-[26px] border border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(224,247,250,0.62)_45%,rgba(160,220,244,0.42))] p-3 pr-4 text-left shadow-[0_20px_50px_-24px_rgba(21,84,120,0.7),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_28px_70px_-22px_rgba(21,120,164,0.75),inset_0_1px_0_rgba(255,255,255,1)] sm:gap-4 sm:p-3.5 sm:pr-5"
            >
              {/* brilho que varre o botão no hover */}
              <span
                aria-hidden="true"
                className="frost-sweep pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 opacity-0 transition-all duration-[900ms] ease-out group-hover:left-[120%] group-hover:opacity-90"
              />

              {/* conjunto de cristais */}
              <span className="relative grid size-14 shrink-0 place-items-center sm:size-[68px]">
                <span
                  aria-hidden="true"
                  className="halo-breathe absolute inset-1 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(129,212,250,0.55),transparent_72%)] blur-md"
                />
                <motion.span
                  variants={{ hover: { rotate: 60 } }}
                  transition={{ type: "spring", stiffness: 90, damping: 12 }}
                  className="absolute inset-0 grid place-items-center text-glacier-600"
                >
                  <SnowflakeCrystal size={60} strokeWidth={1.5} />
                </motion.span>

                {/* hexágono brilhante no centro */}
                <span className="relative grid size-6 place-items-center">
                  <motion.span
                    aria-hidden="true"
                    className="absolute -inset-2 rounded-full bg-cyan-100/80 blur-md"
                    animate={
                      reduceMotion
                        ? undefined
                        : { opacity: [0.55, 1, 0.55], scale: [0.9, 1.08, 0.9] }
                    }
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <HexagonGem size={26} className="relative drop-shadow-[0_0_8px_rgba(255,255,255,0.95)]" />
                </span>

                {/* cristais satélites que giram no hover */}
                <motion.span
                  variants={{ hover: { rotate: -120 } }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  className="absolute inset-0 text-glacier-500"
                >
                  <SnowflakeCrystal
                    size={16}
                    className="absolute -top-1 right-0 opacity-80"
                  />
                  <SnowflakeCrystal
                    size={12}
                    className="absolute -bottom-0.5 left-0 opacity-60"
                  />
                </motion.span>
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.3em] text-glacier-700">
                  {letterContent.ctaEyebrow}
                </span>
                <span className="mt-1 block font-display text-[13.5px] leading-snug font-semibold text-sapphire-900 sm:text-[16px]">
                  {letterContent.ctaLabel}
                </span>
              </span>

              <motion.span
                variants={{ hover: { x: 4, opacity: 1 } }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="grid size-8 shrink-0 place-items-center rounded-full border border-white/80 bg-white/60 text-glacier-700 opacity-80 shadow-sm"
              >
                <ArrowRight className="size-4" />
              </motion.span>
            </motion.button>

            <p className="mt-4 text-center text-[9px] uppercase tracking-[0.32em] text-glacier-700/70">
              Respire fundo · a magia está prestes a começar
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
